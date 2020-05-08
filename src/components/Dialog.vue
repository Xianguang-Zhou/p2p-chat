<template>
  <div class="col-xs-12">
    <div class="row line">
      <form class="form-inline" onsubmit="return false">
        <div class="form-group">
          <label for="peerIdInput">Peer ID:</label>&nbsp;
          <input
            id="peerIdInput"
            type="text"
            class="form-control"
            v-model="selfPeerId"
            readonly
          />
        </div>&nbsp;
        <button id="copySelfPeerId" v-if="selfPeerId" class="btn btn-default">Copy</button>
      </form>
    </div>
    <div class="row line">
      <form class="form-inline" onsubmit="return false">
        <div class="form-group">
          <label for="friendPeerIdInput">Friend peer ID:</label>&nbsp;
          <input id="friendPeerIdInput" v-model="friendPeerId" class="form-control" />
        </div>&nbsp;
        <input
          type="button"
          value="Connect"
          v-on:click="connectPeer"
          v-if="selfPeerId"
          class="btn btn-default"
        />
      </form>
    </div>
    <div class="row line">
      <label style="margin:0">Status:&nbsp;</label>
      <span>{{ status }}</span>
    </div>
    <div class="row line">
      <label style="margin:0">Call status:&nbsp;</label>
      <span>{{ callStatus }}&nbsp;</span>
      <input
        type="button"
        value="Toggle call"
        v-on:click="toggleCall"
        class="btn btn-default"
      />
      <button
        type="button"
        class="btn btn-default pull-right"
        data-toggle="button"
        aria-pressed="false"
        autocomplete="off"
        v-on:click="toggleScrollingLock"
      >Scroll Lock</button>
    </div>
    <div class="row line">
      <div id="messagesContainer" class="col-xs-12">
        <p v-for="(msg, index) in messageList" :key="index" class="message">
          <span class="messageName">{{ msg.name }}</span>:&nbsp;
          <template v-if="msg.type === 'img'">
            <br />
            <img v-bind:src="msg.content" v-on:load="onImageLoad" class="messageImage" />
          </template>
          <template v-else>
            <span class="messageText">{{ msg.content }}</span>
          </template>
        </p>
      </div>
    </div>
    <div class="row line">
      <input type="button" value="Image" v-on:click="selectImages" class="btn btn-default" />
    </div>
    <div class="row line">
      <textarea
        cols="45"
        rows="4"
        v-model="message"
        v-on:keyup.ctrl.enter.exact.stop="sendMessage"
        class="form-control col-xs-12"
      ></textarea>
    </div>
    <div class="row line">
      <input type="button" value="Send" v-on:click="sendMessage" class="btn btn-default" />
    </div>
    <input type="file" id="imageInput" multiple v-on:change="sendImages" />
    <audio
      v-bind:src="audioSource"
      autoplay
      style="display:none"
    >Your browser can not support "audio" tags.</audio>
  </div>
</template>

<script lang="ts">
import $ from "jquery";
import { Vue, Component, Watch } from "vue-property-decorator";
import Peer from "peerjs";
import ClipboardJS from "clipboard";

class Message {
  constructor(
    public readonly type: string,
    public readonly name: string,
    public readonly content: string
  ) {}
}

type Packet = {
  type: string;
  content: string | ArrayBuffer | null;
  fileType: string | null | undefined;
};

@Component
export default class Dialog extends Vue {
  friendPeerId = "";
  selfPeerId = "";
  status = "getting peer ID...";
  message = "";
  readonly messageList: Message[] = [];

  private readonly clipboard: ClipboardJS | null = null;

  private readonly peer!: Peer;
  private conn!: Peer.DataConnection;

  private isScrollingLocked = false;

  private getUserMedia: any | null;
  private mediaConnection: Peer.MediaConnection | null = null;
  private _audioContext: AudioContext | null = null;
  audioSource: MediaStreamAudioSourceNode | null = null;
  callStatus = "disconnected";

  constructor() {
    super();
    const self = this;
    this.clipboard = new ClipboardJS("#copySelfPeerId", {
      text: trigger => {
        return self.getSelfPeerId();
      }
    });
    const nav = navigator as { [key: string]: any };
    this.getUserMedia =
      nav.getUserMedia || nav.webkitGetUserMedia || nav.mozGetUserMedia;
    this.peer = new Peer();
    this.peer.on("open", this.onPeerOpen);
    this.peer.on("connection", this.onPeerConnection);
    this.peer.on("call", this.onPeerCall);
  }

  getSelfPeerId() {
    return this.selfPeerId;
  }

  onPeerOpen(id: string) {
    this.selfPeerId = id;
    this.status = "online";
  }

  onPeerConnection(conn: Peer.DataConnection) {
    this.conn = conn;
    conn.on("open", this.onConnOpen);
    conn.on("close", this.onConnClose);
    conn.on("data", this.onConnData);
  }

  onConnOpen() {
    this.friendPeerId = this.conn.peer;
    this.status = "connected";
  }

  onConnClose() {
    this.status = "disconnected";
  }

  onConnData(data: Packet) {
    if (data.type === "img") {
      const imageBlob = new Blob([data.content as ArrayBuffer], {
        type: data.fileType as string
      });
      const imageUrl = URL.createObjectURL(imageBlob);
      this.messageList.push(new Message("img", "friend", imageUrl));
    } else {
      this.messageList.push(
        new Message("text", "friend", data.content as string)
      );
    }
  }

  connectPeer() {
    this.status = "connecting...";
    this.onPeerConnection(this.peer.connect(this.friendPeerId));
  }

  sendMessage() {
    this.messageList.push(new Message("text", "me", this.message));
    this.conn.send({ type: "text", content: this.message });
    this.message = "";
  }

  sendImages(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files == null) return;
    const conn = this.conn;
    for (let index = 0; index < inputElement.files.length; ++index) {
      const imageFile = inputElement.files[index];
      const imageUrl = URL.createObjectURL(imageFile);
      this.messageList.push(new Message("img", "me", imageUrl));
      const reader = new FileReader();
      reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
        if (readerEvent.target == null) return;
        conn.send({
          type: "img",
          content: readerEvent.target.result,
          fileType: imageFile.type
        });
      };
      reader.readAsArrayBuffer(imageFile);
    }
  }

  onImageLoad(event: Event) {
    this.scrollBottom();
    const src = (event.target as HTMLImageElement).src;
    if (src.startsWith("blob:")) {
      window.URL.revokeObjectURL(src);
    }
  }

  selectImages() {
    $("#imageInput").click();
  }

  private get audioContext(): AudioContext {
    if (this._audioContext == null) {
      this._audioContext = new AudioContext();
    }
    return this._audioContext;
  }

  toggleCall() {
    if (this.audioSource != null) {
      this.mediaConnection?.close();
      this.audioSource = null;
      this.callStatus = "disconnected";
    } else {
      this.getUserMedia(
        { video: false, audio: true },
        (stream: MediaStream) => {
          this.callStatus = "connecting...";
          this.mediaConnection = this.peer.call(this.friendPeerId, stream);
          this.mediaConnection.on("error", console.error);
          this.mediaConnection.on("close", () => {
            this.audioSource = null;
            this.callStatus = "disconnected";
          });
          this.mediaConnection.on("stream", remoteStream => {
            this.audioSource = this.audioContext.createMediaStreamSource(
              remoteStream
            );
            this.callStatus = "connected";
          });
        },
        (err: DOMException) => {
          console.log("Failed to get local stream.", err);
          window.alert("Failed to get local stream.");
        }
      );
    }
  }

  onPeerCall(mediaConnection: Peer.MediaConnection) {
    if (mediaConnection.peer != this.friendPeerId) {
      mediaConnection.close();
      return;
    }
    if (!window.confirm("Answer the call?")) {
      mediaConnection.close();
      return;
    }
    this.mediaConnection?.close();
    if (this.audioSource != null) {
      this.audioSource = null;
    }
    this.callStatus = "disconnected";
    this.getUserMedia(
      { video: false, audio: true },
      (stream: MediaStream) => {
        this.mediaConnection = mediaConnection;
        this.callStatus = "answering...";
        this.mediaConnection.answer(stream);
        this.mediaConnection.on("error", console.error);
        this.mediaConnection.on("close", () => {
          this.audioSource = null;
          this.callStatus = "disconnected";
        });
        this.mediaConnection.on("stream", remoteStream => {
          this.audioSource = this.audioContext.createMediaStreamSource(
            remoteStream
          );
          this.callStatus = "connected";
        });
      },
      (err: DOMException) => {
        mediaConnection.close();
        console.log("Failed to get local stream.", err);
        window.alert("Failed to get local stream.");
      }
    );
  }

  scrollBottom() {
    if (!this.isScrollingLocked) {
      $("#messagesContainer").scrollTop(
        $("#messagesContainer")[0].scrollHeight
      );
    }
  }

  toggleScrollingLock() {
    this.isScrollingLocked = !this.isScrollingLocked;
  }

  @Watch("messageList")
  onMessageListChanged(val: Message[], oldVal: Message[]) {
    const lastMessageType = val[val.length - 1].type;
    if (lastMessageType === "text") {
      setTimeout(this.scrollBottom, 0);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type="file"] {
  display: none;
}

div.line {
  padding: 8px 8px 0 8px;
}

#messagesContainer {
  height: 200px;
  border-style: inset;
  overflow: scroll;
  padding: 8px;
}

.message {
  margin-top: 0;
}

.messageName {
  color: blue;
}

.messageText {
  padding-right: 8px;
}

.messageImage {
  padding-right: 8px;
}
</style>
