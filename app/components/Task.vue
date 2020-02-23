<template>
  <Frame @shownModally="onShownModally">
    <Page ref="page" @loaded="onLoaded">
      <ActionBar title="Task">
        <ActionItem
          ios.systemIcon="1"
          android.systemIcon=""
          ios.position="left"
          @tap="cancel"
        />
        <ActionItem
          ref="saveActionItem"
          ios.systemIcon="3"
          android.systemIcon=""
          ios.position="right"
          @tap="save"
        />
      </ActionBar>
      <StackLayout>
        <TextField
          v-model="taskData.description"
          ref="descriptionTextField"
          class="description -border "
          hint="Write your todo +hint"
          returnKeyType="done"
          @returnPress="save"
        />
        <FlexboxLayout>
          <Button
            v-for="viewModel in priorities"
            v-bind:key="viewModel.index"
            :text="viewModel.label"
            flexGrow="1"
            :backgroundColor="
              viewModel.value === taskData.priority
                ? viewModel.color
                : transparent
            "
            class="p-0 m-2 -outline"
            :class="{
              'priority-button-selected': viewModel.value === taskData.priority
            }"
            @tap="prioritySelected(viewModel)"
          />
        </FlexboxLayout>
        <Label :text="creationDateLocale" />
      </StackLayout>
    </Page>
  </Frame>
</template>

<script>
import { isIOS, isAndroid } from "platform";
import todotxt from "../core/todotxt";
import { DateTime } from "luxon";
import { colorForPriority } from "../core/todotxt-presenter";

function priorityViewModelMaker(priorities) {
  return priorities.map((priority, index) => {
    const value = `(${priority})`;
    return {
      index,
      label: value,
      value,
      color: colorForPriority(value)
    };
  });
}

export default {
  props: ["task"],
  data() {
    return {
      priorities: priorityViewModelMaker(["A", "B", "C", "D", "E"]),
      taskData: {
        done: false,
        description: "",
        creationDate: new Date(),
        priority: null
      }
    };
  },
  computed: {
    creationDateLocale() {
      return DateTime.fromJSDate(this.taskData.creationDate).toFormat(
        todotxt.serializationDateFormat
      );
    },
    couldSave() {
      return !!(
        this.taskData.description && this.taskData.description.trim().length > 0
      );
    }
  },
  methods: {
    onShownModally() {
      this.updateSaveActionItem();
    },
    onLoaded() {
      if (!this.task) {
        return;
      }
      this.taskData = { ...this.task };
      this.focus();
    },
    focus() {
      this.$refs.descriptionTextField.nativeView.focus();
    },
    cancel() {
      this.$modal.close();
    },
    save() {
      if (!this.couldSave) {
        return;
      }
      const taskByParsing = todotxt.parseLine(this.taskData.description);
      const task = {
        ...taskByParsing,
        description: this.taskData.description,
        creationDate: this.taskData.creationDate,
        priority: this.taskData.priority
      };
      if (this.task) {
        this.$store.dispatch("updateTask", {
          task: this.task,
          updatedTask: task
        });
      } else {
        this.$store.dispatch("addTask", task);
      }
      this.$modal.close();
    },
    updateSaveActionItem() {
      if (isIOS) {
        const page = this.$refs.page;
        if (
          !(
            page &&
            page.nativeView &&
            page.nativeView.ios &&
            page.nativeView.ios.navigationItem &&
            page.nativeView.ios.navigationItem.rightBarButtonItem
          )
        ) {
          return;
        }
        page.nativeView.ios.navigationItem.rightBarButtonItem.enabled = this.couldSave;
      }
      if (isAndroid) {
        const actionItem = this.$refs.saveActionItem.nativeView;
        actionItem.actionBar.nativeViewProtected
          .getMenu()
          .findItem(actionItem._getItemId())
          .setEnabled(this.couldSave);
      }
    },
    prioritySelected(viewModel) {
      this.taskData.priority = viewModel.value;
    }
  },
  watch: {
    couldSave() {
      this.updateSaveActionItem();
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
  font-size: 30;
  padding: 20;
}
.priority-button-selected {
  color: white;
  border: none;
}
</style>
