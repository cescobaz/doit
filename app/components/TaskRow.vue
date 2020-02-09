<template>
  <StackLayout orientation="horizontal" class="p-20">
    <Label :text="task.priority" class="priority" />
    <StackLayout orientation="vertical">
      <Label :text="creationDateLocale" class="creation-date" />
      <Label :text="task.description" textWrap="true" class="description" />
      <FlexboxLayout
        justifyContent="flex-end"
        flexWrap="wrap"
        class="projectsAndContexts"
      >
        <Label :text="projects" textWrap="true" class="projects" />
        <Label :text="contexts" textWrap="true" class="contexts" />
      </FlexboxLayout>
    </StackLayout>
  </StackLayout>
</template>

<script>
import todotxt from "../core/todotxt";
import { DateTime } from "luxon";

export default {
  props: ["task"],
  data() {
    return {};
  },
  computed: {
    creationDateLocale() {
      if (!this.task.creationDate) {
        return "|";
      }
      return DateTime.fromJSDate(this.task.creationDate).toFormat(
        todotxt.serializationDateFormat
      );
    },
    contexts() {
      if (!this.task.contexts) {
        return "";
      }
      return this.task.contexts.join(" ");
    },
    projects() {
      if (!this.task.projects) {
        return "";
      }
      return this.task.projects.join(" ");
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
.description {
  font-size: 20;
  background-color: gray;
}
.priority {
  background-color: red;
}
.creation-date {
  background-color: yellow;
  text-align: right;
  width: 100%;
}
.projects,
.contexts {
  background-color: black;
  font-size: 16;
  height: 30;
  color: white;
}
.projectsAndContexts {
  width: 100%;
}
</style>
