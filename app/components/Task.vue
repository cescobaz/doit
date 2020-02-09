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
          :text="description"
          @textChange="textChange"
          ref="descriptionTextField"
          class="description"
          hint="Write your todo +hint"
          returnKeyType="done"
          @returnPress="save"
        />
        <Label text="separatore" />
        <Label :text="description" />
      </StackLayout>
    </Page>
  </Frame>
</template>

<script>
import { isIOS, isAndroid } from "platform";
import TodoTXT from "../core/todotxt";

export default {
  data: {
    description: "wee",
    creationDate: null
  },
  computed: {},
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
      console.log("save");
      if (!this.saveEnabled) {
        return;
      }
    },
    updateSaveActionItem() {
      console.log(this.description);
      const saveEnabled = !!(
        this.description && this.description.trim().length > 0
      );
      if (isIOS) {
        const page = this.$refs.page;
        const buttonItem = page.nativeView.ios;
        if (!buttonItem) {
          return;
        }
        console.log(saveEnabled);
        buttonItem.enabled = saveEnabled;
      }
      if (isAndroid) {
        const actionItem = this.$refs.saveActionItem.nativeView;
        actionItem.actionBar.nativeViewProtected
          .getMenu()
          .findItem(actionItem._getItemId())
          .setEnabled(saveEnabled);
      }
    },
    textChange(textField) {
      this.description = textField.value;
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
