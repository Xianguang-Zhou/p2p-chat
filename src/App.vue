<template>
  <div id="app" class="container-fluid">
    <div class="row">
      <Dialog/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Dialog from './components/Dialog.vue';

@Component({
  components: {
    Dialog,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container-fluid {
    padding-bottom: 12px;
}
</style>
