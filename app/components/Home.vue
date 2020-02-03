<template>
  <Page>
    <ActionBar title="doit" />
    <ListView for="task in tasks">
      <v-template>
        <Label :text="task.description" />
      </v-template>
    </ListView>
  </Page>
</template>

<script>
import TodoTXT from "../todotxt";
export default {
  computed: {
    tasks() {
      return [{ description: "prova" }];
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
</style>
