<template>
  <GridLayout columns="auto, *" class="row p-0 m-0" @tap="onTap">
    <AbsoluteLayout
      col="0"
      :backgroundColor="priorityColor"
      width="4"
      height="100%"
    />
    <StackLayout col="1">
      <Label :text="dates" class="details" />
      <Label
        :text="task.description"
        class="description"
        :class="descriptionClassName"
      />
      <Label :text="tags" class="details" />
    </StackLayout>
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
      let dates = "";
      const creationDate = dateToLocaleString(this.task.creationDate);
      const completionDate = dateToLocaleString(this.task.completionDate);
      if (this.task.creationDate) {
        dates = creationDate + " ";
      }
      if (this.task.completionDate) {
        dates += "-> " + completionDate;
      }
      return dates;
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
    },
    tags() {
      return [this.projects, this.contexts]
        .filter(value => Boolean(value))
        .join(" ");
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
  font-size: 20;
  width: 100%;
  margin: 0;
  padding: 0;
}
.strike {
  text-decoration: line-through;
}

.details {
  font-size: 12;
  text-align: left;
  width: 100%;
  height: 40px;
}
</style>
