<template>
  <Page>
    <ActionBar title="doit">
      <ActionItem
        ios.systemIcon="4"
        android.systemIcon=""
        ios.position="right"
        @tap="selectFile"
      />
    </ActionBar>
    <ListView for="task in tasks">
      <v-template>
        <Label class="task" :text="task.description" />
      </v-template>
    </ListView>
  </Page>
</template>

<script>
import TodoTXT from "../core/todotxt";
import { chooseFile, releaseToken } from "../core/file-ios";

export default {
  data: {
    chooseFileToken: null
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    }
  },
  methods: {
    selectFile() {
      function openFile(document) {
        console.log("la fine, il document", document, this);
        document.openWithCompletionHandler(success => {
          console.log("openWithCompletionHandler", success);
          this.$store.commit("setTasks", document.tasks);
        });
      }
      if (this.chooseFileToken) {
        return this.chooseFileToken(() => {
          console.log("release finished");
          this.chooseFileToken = chooseFile(openFile.bind(this));
        });
      }
      this.chooseFileToken = chooseFile(openFile.bind(this));
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@nativescript/theme/scss/variables/blue";

// Custom styles
.fas {
  @include colorize($color: accent);
}

.info {
  font-size: 20;
  vertical-align: center;
}

.task {
  font-size: 20;
  padding: 10;
}
</style>
