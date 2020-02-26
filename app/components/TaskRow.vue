<template>
  <StackLayout orientation="horizontal" class="row" @tap="onTap">
    <AbsoluteLayout
      :backgroundColor="priorityColor"
      width="8"
      height="100%"
      class="p-0 m-0"
    />
    <StackLayout class="p-0 m-0">
      <Label :text="dates" class="footnote details p-t-5 p-x-5" />
      <Label
        :text="task.description"
        class="body description p-x-5"
        :class="descriptionClassName"
      />
      <Label :text="tags" class="footnote details p-b-5 p-x-5" />
      <StackLayout
        height="1"
        :class="{ separator: !last, background: last }"
        class="p-0 m-0"
      />
    </StackLayout>
  </StackLayout>
</template>

<script>
import todotxt from '../core/todotxt'
import { DateTime } from 'luxon'
import { colorForPriority } from '../core/todotxt-presenter'

function dateToLocaleString (date) {
  if (!date) {
    return ''
  }
  return DateTime.fromJSDate(date).toFormat(todotxt.serializationDateFormat)
}

export default {
  props: ['task', 'tap', 'index', 'last'],
  data () {
    return {}
  },
  methods: {
    onTap () {
      if (this.tap) {
        this.tap({ task: this.task, index: this.index })
      }
    }
  },
  computed: {
    descriptionClassName () {
      return this.task && this.task.done ? 'strike' : null
    },
    priorityColor () {
      return colorForPriority(this.task.priority)
    },
    dates () {
      let dates = ''
      const creationDate = dateToLocaleString(this.task.creationDate)
      const completionDate = dateToLocaleString(this.task.completionDate)
      if (this.task.creationDate) {
        dates = creationDate + ' '
      }
      if (this.task.completionDate) {
        dates += '-> ' + completionDate
      }
      return dates
    },
    contexts () {
      if (!this.task.contexts) {
        return ''
      }
      return this.task.contexts.join(' ')
    },
    projects () {
      if (!this.task.projects) {
        return ''
      }
      return this.task.projects.join(' ')
    },
    tags () {
      return [this.projects, this.contexts]
        .filter(value => Boolean(value))
        .join(' ')
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@nativescript/theme/scss/variables/blue";

.row {
  @include colorize($background-color: background);
  padding: 0;
  margin: 0;
  width: 100%;
  /*height: 60;*/
}
.separator {
  @include colorize($background-color: secondary);
}
.background {
  @include colorize($background-color: background);
}
.description {
  @include colorize($color: primary);
  width: 100%;
  margin: 0;
  padding: 0;
}
.strike {
  text-decoration: line-through;
  @include colorize($color: secondary);
}
.details {
  @include colorize($color: secondary);
  text-align: left;
  width: 100%;
  height: 40px;
  margin: 0;
  padding: 0;
  font-size: const($font-size);
}
</style>
