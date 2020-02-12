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
      for="task in tasks"
      swipeActions="true"
      @itemSwipeProgressStarted="onSwipeStarted"
      @itemSwipeProgressChanged="onSwipeChanged"
    >
      <v-template>
        <TaskRow :task="task" />
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
import Task from "./Task";
import { chooseDocument } from "../core/file-ios";
import TaskRow from "./TaskRow";

export default {
  data() {
    return {
      chooseDocumentToken: null
    };
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    }
  },
  methods: {
    updateSwipeAction(eventData) {
      const { data, swipeView } = eventData;
      const { x } = data;
      console.log("x", data);
    },
    onSwipeStarted(eventData) {
      console.log(`Swipe started`);
      const {
        data: { swipeLimits },
        swipeView
      } = eventData;
      const leftItem = swipeView.getViewById("done-view");
      const rightItem = swipeView.getViewById("delete-view");
      swipeLimits.left = leftItem.getMeasuredWidth();
      swipeLimits.right = rightItem.getMeasuredWidth();
      swipeLimits.threshold = leftItem.getMeasuredWidth() / 2;
      this.updateSwipeAction(eventData);
    },
    onSwipeChanged(eventData) {
      console.log("onSwipeChanged");
      this.updateSwipeAction(eventData);
    },
    onDonePressed(eventData) {
      const task = eventData.object.bindingContext;
      this.$store.dispatch("toggleDoneTask", task);
      this.$refs.listView.notifySwipeToExecuteFinished();
    },
    onDeletePressed({ object }) {
      console.log("right action tapped");
      // remove item
      //       this.itemList.splice(this.itemList.indexOf(object.bindingContext), 1);
      this.$refs.listView.notifySwipeToExecuteFinished();
    },
    chooseDocument() {
      if (this.chooseDocumentToken) {
        return this.chooseDocumentToken(() => {
          this.chooseDocumentToken = null;
          this.chooseDocument();
        });
      }
      this.chooseDocumentToken = chooseDocument(document => {
        if (!document) {
          return;
        }
        this.$store.commit("setDocument", document);
      });
    },
    createTask() {
      this.$showModal(Task);
    }
  },
  components: {
    TaskRow
  }
};
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
  background-color: gray;
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
