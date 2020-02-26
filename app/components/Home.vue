<template>
  <Page>
    <ActionBar title="doit">
      <ActionItem
        ios.systemIcon="10"
        android.systemIcon=""
        ios.position="left"
        @tap="chooseDocument"
      />
      <ActionItem
        ios.systemIcon="4"
        android.systemIcon=""
        ios.position="right"
        @tap="createTask"
      />
    </ActionBar>
    <RadListView
      ref="listView"
      swipeActions="true"
      @itemSwipeProgressStarted="onSwipeStarted"
      @scrollStarted="onScrollStarted"
      @scrollEnded="onScrollEnded"
      for="(task, index) in tasks"
    >
      <v-template>
        <TaskRow
          :task="task"
          :last="index == tasks.length - 1"
          :tap="onTap"
          :index="index"
        />
      </v-template>
      <v-template name="itemswipe">
        <GridLayout columns="*,*, *, *" class="swipe">
          <StackLayout
            id="done-view"
            col="0"
            class="done"
            @tap="onDonePressed"
            orientation="horizontal"
          >
            <Label
              id="done-label"
              text="done"
              style="text-size: 20"
              verticalAlignment="center"
              horizontalAlignment="center"
            />
          </StackLayout>
          <StackLayout
            id="delete-view"
            col="3"
            class="delete"
            @tap="onDeletePressed"
            orientation="horizontal"
          >
            <Label
              text="delete"
              style="text-size: 20"
              verticalAlignment="center"
              horizontalAlignment="center"
            />
          </StackLayout>
        </GridLayout>
      </v-template>
    </RadListView>
  </Page>
</template>

<script>
import Task from './Task'
import { chooseDocument } from '../core/file-ios'
import TaskRow from './TaskRow'

export default {
  data () {
    return {
      chooseDocumentToken: null,
      swiping: false
    }
  },
  computed: {
    tasks () {
      return this.$store.state.tasks
    }
  },
  methods: {
    onSwipeStarted (eventData) {
      this.$data.swiping = true
      const {
        data: { swipeLimits },
        swipeView,
        index
      } = eventData
      const doneLabel = swipeView.getViewById('done-label')
      doneLabel.text = this.tasks[index].done ? 'todo' : 'done'
      const leftItem = swipeView.getViewById('done-view')
      const rightItem = swipeView.getViewById('delete-view')
      swipeLimits.left = leftItem.getMeasuredWidth()
      swipeLimits.right = rightItem.getMeasuredWidth()
      swipeLimits.threshold = 1
    },
    onDonePressed (eventData) {
      const task = eventData.object.bindingContext
      this.$refs.listView.notifySwipeToExecuteFinished()
      this.$data.swiping = false
      this.$store.dispatch('toggleDoneTask', task, false)
    },
    onDeletePressed (eventData) {
      const task = eventData.object.bindingContext
      this.$refs.listView.notifySwipeToExecuteFinished()
      this.$data.swiping = false
      this.$store.dispatch('deleteTask', task)
    },
    onScrollStarted () {
      this.$data.scrolling = true
    },
    onScrollEnded () {
      this.$data.scrolling = false
    },
    onTap ({ index }) {
      if (this.$data.scrolling) {
        return
      }
      if (this.$data.swiping) {
        this.$refs.listView.notifySwipeToExecuteFinished()
        this.$data.swiping = false
        return
      }
      const task = this.tasks[index]
      this.editTask(task)
    },
    chooseDocument () {
      if (this.chooseDocumentToken) {
        return this.chooseDocumentToken(() => {
          this.chooseDocumentToken = null
          this.chooseDocument()
        })
      }
      this.chooseDocumentToken = chooseDocument(document => {
        if (!document) {
          return
        }
        this.$store.commit('setDocument', document)
      })
    },
    createTask () {
      this.$showModal(Task)
    },
    editTask (task) {
      this.$showModal(Task, { props: { task } })
    }
  },
  components: {
    TaskRow
  }
}
</script>

<style scoped lang="scss">
@import "~@nativescript/theme/scss/variables/blue";

// Custom styles
.fas {
  @include colorize($color: accent);
}
.swipe {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  @include colorize($background-color: background);
}
.delete {
  padding: 0;
  margin: 0;
  background-color: red;
  color: white;
}
.done {
  padding: 0;
  margin: 0;
  background-color: blue;
  color: white;
}
</style>
