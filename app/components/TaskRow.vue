<template>
  <GridLayout columns="auto, *" class="row p-0 m-0" @tap="onTap">
    <AbsoluteLayout
      col="0"
      :backgroundColor="priorityColor"
      width="4"
      height="100%"
    />
    <GridLayout col="1" rows="*,2*,*">
      <Label row="0" :text="dates" class="creation-date" />
      <Label
        row="1"
        :text="task.description"
        class="description"
        :class="descriptionClassName"
      />
      <StackLayout
        backgroundColor="#EE9900"
        row="2"
        orientation="horizontal"
        class="p-0 m-0 pull-right"
      >
        <Label text="@placeholder" class="tags-placeholder" />
        <Label
          v-if="projects && projects.length"
          :text="projects"
          class="tags"
        />
        <Label
          v-if="contexts && contexts.length"
          :text="contexts"
          class="tags"
        />
      </StackLayout>
    </GridLayout>
  </GridLayout>
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
  props: ["task", "tap", "index"],
  data() {
    return {};
  },
  methods: {
    onTap() {
      if (this.tap) {
        this.tap({ task: this.task, index: this.index });
      }
    }
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
  @include colorize($background-color: background);
}

.ios ListView,
.ios RadListView,
.ios .list-item,
.ios .rlv-item {
  background-color: #f1f1eb;
}

.description {
  width: 100%;
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

.tags {
  background-color: gray;
  font-size: 16;
  color: white;
}
.projectsAndContexts {
  width: 100%;
}
</style>
