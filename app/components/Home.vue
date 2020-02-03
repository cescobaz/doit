<template>
  <Page>
    <ActionBar title="doit">
      <ActionItem
        ios.systemIcon="4"
        android.systemIcon=""
        ios.position="right"
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
import TodoTXT from "../todotxt";
export default {
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
    message() {
      return "Blank {N}-Vue app";
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
  horizontal-align: center;
  vertical-align: center;
}

.task {
  font-size: 20;
  padding: 10;
}
</style>
