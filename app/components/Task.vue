<template>
  <Frame>
    <Page>
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
          focus="true"
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
  mounted() {
    this.$nextTick(() => {
      try {
        console.log("mounted", this.$refs.descriptionTextField);
        console.log("mounte2", Object.keys(this.$refs.descriptionTextField));
        this.$refs.descriptionTextField.nativeElement.focus();
      } catch (error) {
        console.log("mounted error", error);
      }
    });
  },
  computed: {},
  methods: {
    focus() {
      console.log(this.$refs.descriptionTextField);
      this.$refs.descriptionTextField.focus();
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
