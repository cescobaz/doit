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

export default {
  data() {
    return {
      done: false,
      description: "",
      creationDate: new Date(),
      priority: null
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
    onLoaded() {
      this.updateSaveActionItem();
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
      const task = {
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
</style>
