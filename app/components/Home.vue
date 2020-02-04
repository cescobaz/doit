<template>
  <Page>
    <ActionBar title="doit">
      <ActionItem
        ios.systemIcon="4"
        android.systemIcon=""
        ios.position="right"
        @tap="selectFile"
      />
    </ActionBar>
    <ListView for="task in tasks">
      <v-template>
        <Label class="task" :text="task.description" />
      </v-template>
    </ListView>
  </Page>
</template>

<script>
import TodoTXT from "../todotxt";

const DocumentPickerDelegate = NSObject.extend(
  {
    init() {
      console.log("custom init delegate");
      return super.init();
    },
    documentPickerDidPickDocumentsAtURLs(controller, urls) {
      console.log("DAJEEE");
      console.log("picked", urls);
    }
  },
  {
    name: "DocumentPickerDelegate",
    protocols: [UIDocumentPickerDelegate]
  }
);

export default {
  data: {},
  computed: {
    tasks() {
      return this.$store.state.tasks;
    }
  },
  methods: {
    selectFile(event) {
      const controller = UIDocumentPickerViewController.alloc().initWithDocumentTypesInMode(
        NSArray.arrayWithArray([kUTTypeFolder, kUTTypeText]),
        UIDocumentPickerModeOpen
      );
      controller.shouldShowFileExtensions = true;
      const delegate = DocumentPickerDelegate.alloc().init();
      controller.delegate = delegate;
      const windows = UIApplication.sharedApplication.windows;
      windows.lastObject.rootViewController.presentViewControllerAnimatedCompletion(
        controller,
        true,
        () => {}
      );
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

.info {
  font-size: 20;
  horizontal-align: center;
  vertical-align: center;
}

.task {
  font-size: 20;
  padding: 10;
}
</style>
