<template>
  <StackLayout orientation="horizontal" class="full-w-h">
    <AbsoluteLayout :backgroundColor="priorityColor" width="4" height="100%" />
    <StackLayout orientation="vertical" class="full-w-h">
      <Label :text="creationDateLocale" class="creation-date" />
      <Label :text="task.description" textWrap="true" class="description" />
      <FlexboxLayout
        justifyContent="flex-end"
        flexWrap="wrap"
        class="projectsAndContexts full-w-h"
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
import { colorForPriority } from "../core/todotxt-presenter";

export default {
  props: ["task"],
  data() {
    return {};
  },
  computed: {
    priorityColor() {
      return colorForPriority(this.task.priority);
    },
    creationDateLocale() {
      if (!this.task.creationDate) {
        return "-";
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
.full-w-h {
  padding: 0;
  margin: 0;
}
.row {
  padding: 0;
  margin: 0;
}
.description {
  font-size: 20;
}
.priority {
  font-size: 20;
}
.creation-date {
  text-align: right;
  width: 100%;
}
.projects,
.contexts {
  background-color: gray;
  font-size: 16;
  height: 30;
  color: white;
}
.projectsAndContexts {
  width: 100%;
}
</style>
