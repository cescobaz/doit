<template>
  <StackLayout orientation="horizontal" class="row full-w-h">
    <AbsoluteLayout :backgroundColor="priorityColor" width="4" height="100%" />
    <StackLayout orientation="vertical" class="full-w-h">
      <Label :text="dates" class="creation-date" />
      <Label
        :text="task.description"
        textWrap="false"
        class="description"
        :class="descriptionClassName"
      />
      <FlexboxLayout
        justifyContent="flex-end"
        flexWrap="wrap"
        class="projectsAndContexts full-w-h"
      >
        <Label text="@placeholder" class="tags-placeholder" />
        <Label
          v-if="projects && projects.length"
          :text="projects"
          class="projects"
        />
        <Label
          v-if="contexts && contexts.length"
          :text="contexts"
          class="contexts"
        />
      </FlexboxLayout>
    </StackLayout>
  </StackLayout>
</template>

<script>
import todotxt from "../core/todotxt";
import { DateTime } from "luxon";
import { colorForPriority } from "../core/todotxt-presenter";

function dateToLocaleString(date) {
  if (!date) {
    return "";
  }
  return DateTime.fromJSDate(date).toFormat(todotxt.serializationDateFormat);
}

export default {
  props: ["task"],
  data() {
    return {};
  },
  computed: {
    descriptionClassName() {
      return this.task && this.task.done ? "strike" : null;
    },
    priorityColor() {
      return colorForPriority(this.task.priority);
    },
    dates() {
      return `${dateToLocaleString(
        this.task.completionDate
      )} - ${dateToLocaleString(this.task.creationDate)}`;
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
  background-color: #d4d4d4;
}
.description {
  font-size: 20;
}
.strike {
  text-decoration: line-through;
}
.priority {
  font-size: 20;
}
.creation-date {
  text-align: right;
  width: 100%;
}
.tags-placeholder {
  color: white;
  background-color: white;
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
