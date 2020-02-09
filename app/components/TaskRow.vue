<template>
  <DockLayout stretchLastChild="false" class="p-20">
    <Label :text="task.priority" dock="left" class="priority" />
    <Label :text="creationDateLocale" dock="top" class="creation-date" />
    <Label text"_____" dock="bottom" class="projects" />
    <Label :text="task.description" class="description" />
  </DockLayout>
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
        return "";
      }
      return DateTime.fromJSDate(this.task.creationDate).toFormat(
        todotxt.serializationDateFormat
      );
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
}
.projects {
  background-color: black;
  font-size: 16;
}
</style>
