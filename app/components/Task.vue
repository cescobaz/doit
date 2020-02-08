<template>
  <Frame>
    <Page @loaded="focus">
      <ActionBar title="Task">
        <ActionItem
          ios.systemIcon="1"
          android.systemIcon=""
          ios.position="left"
          @tap="cancel"
        />
        <ActionItem
          ios.systemIcon="3"
          android.systemIcon=""
          ios.position="right"
          @tap="save"
        />
      </ActionBar>
      <StackLayout>
        <TextField
          ref="descriptionTextField"
          class="description"
          returnKeyType="done"
          v-model="description"
          hint="Write your todo +hint"
        />
      </StackLayout>
    </Page>
  </Frame>
</template>

<script>
import TodoTXT from "../core/todotxt";

export default {
  data: {
    description: null,
    creationDate: null
  },
  computed: {},
  methods: {
    focus() {
      this.$refs.descriptionTextField.nativeView.focus();
    },
    cancel() {
      this.$modal.close();
    },
    save() {
      console.log("save");
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

.text-field {
  font-size: 20;
  padding: 10;
}
</style>
