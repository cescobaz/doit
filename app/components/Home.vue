<template>
  <Page>
    <ActionBar title="doit">
      <ActionItem
        ios.systemIcon="4"
        android.systemIcon=""
        ios.position="right"
        @tap="chooseDocument"
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

export default {
  data: {
    chooseFileToken: null
  },
  computed: {
    tasks() {
      const document = this.$store.state.document;
      if (!document) {
        return [];
      }
      return document.tasks;
    }
  },
  methods: {
    chooseDocument() {
      // TODO add initial url?
      this.$store.dispatch("chooseDocument");
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
