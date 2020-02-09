<template>
  <Page>
    <ActionBar title="doit">
      <ActionItem
        ios.systemIcon="10"
        android.systemIcon=""
        ios.position="left"
        @tap="chooseDocument"
      />
      <ActionItem
        ios.systemIcon="4"
        android.systemIcon=""
        ios.position="right"
        @tap="createTask"
      />
    </ActionBar>
    <ListView for="task in tasks" separatorColor="transparent">
      <v-template> <TaskRow :task="task" /> </v-template>
    </ListView>
  </Page>
</template>

<script>
import Task from "./Task";
import { chooseDocument } from "../core/file-ios";
import TaskRow from "./TaskRow";

export default {
  data() {
    return {
      chooseDocumentToken: null
    };
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    }
  },
  methods: {
    chooseDocument() {
      if (this.chooseDocumentToken) {
        return this.chooseDocumentToken(() => {
          this.chooseDocumentToken = null;
          this.chooseDocument();
        });
      }
      this.chooseDocumentToken = chooseDocument(document => {
        if (!document) {
          return;
        }
        this.$store.commit("setDocument", document);
      });
    },
    createTask() {
      this.$showModal(Task);
    }
  },
  components: {
    TaskRow
  }
};
</script>

<style scoped lang="scss">
@import "~@nativescript/theme/scss/variables/blue";

// Custom styles
.fas {
  @include colorize($color: accent);
}
</style>
