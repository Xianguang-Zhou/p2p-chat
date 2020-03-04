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
        <button id="copySelfPeerId" v-if="selfPeerId" class="btn btn-default">copy</button>
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
          value="connect"
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
      <input type="button" value="image" v-on:click="selectImages" class="btn btn-default" />
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
      <input type="button" value="send" v-on:click="sendMessage" class="btn btn-default" />
    </div>
    <input type="file" id="imageInput" multiple v-on:change="sendImages" />
  </div>
</template>

<script lang="ts">
import $ from "jquery";
import { Vue, Component } from "vue-property-decorator";
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

  private readonly clipboard = new ClipboardJS("#copySelfPeerId", {
    text: trigger => {
      return this.selfPeerId;
    }
  });

  private readonly peer!: Peer;
  private conn!: Peer.DataConnection;

  constructor() {
    super();
    this.peer = new Peer();
    this.peer.on("open", this.onPeerOpen);
    this.peer.on("connection", this.onPeerConnection);
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
    const src = (event.target as HTMLImageElement).src;
    if (src.startsWith("blob:")) {
      window.URL.revokeObjectURL(src);
    }
  }

  selectImages() {
    $("#imageInput").click();
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
