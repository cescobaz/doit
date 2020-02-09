<template>
  <Frame @shownModally="updateSaveActionItem">
    <Page ref="page" @loaded="focus">
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
          v-model="description"
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
              viewModel.selected ? viewModel.color : transparent
            "
            class="p-0 m-2 -outline"
            :class="{ 'priority-button-selected': viewModel.selected }"
            @tap="prioritySelected(viewModel)"
          />
        </FlexboxLayout>
        <Label :text="creationDateLocale" />
        <Label text="none" />
      </StackLayout>
    </Page>
  </Frame>
</template>

<script>
import { isIOS, isAndroid } from "platform";
import todotxt from "../core/todotxt";
import { DateTime } from "luxon";

function priorityViewModelMaker(priorities) {
  const prioritySize = 7;
  const hdelta = 360 / prioritySize;
  const computeIndex = index => {
    if (index > prioritySize) {
      return 7;
    }
    return index;
  };
  return priorities.map((priority, index) => {
    const value = `(${priority})`;
    return {
      index,
      label: value,
      value,
      color: `hsl(${computeIndex(index) * hdelta},60%,50%)`,
      selected: false
    };
  });
}

export default {
  data() {
    return {
      done: false,
      description: "",
      creationDate: new Date(),
      priority: null,
      priorities: priorityViewModelMaker(["A", "B", "C", "D", "E"])
    };
  },
  computed: {
    creationDateLocale() {
      return DateTime.fromJSDate(this.creationDate).toFormat(
        todotxt.serializationDateFormat
      );
    },
    couldSave() {
      return !!(this.description && this.description.trim().length > 0);
    }
  },
  methods: {
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
      const taskByParsing = todotxt.parseLine(this.description);
      const task = {
        ...taskByParsing,
        description: this.description,
        creationDate: this.creationDate,
        priority: this.priority
      };
      this.$store.dispatch("addTask", task);
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
      console.log("prioritySelected", viewModel);
      this.priority = viewModel.value;
      this.priorities.forEach(
        (p, index) => (p.selected = p.index === viewModel.index)
      );
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
