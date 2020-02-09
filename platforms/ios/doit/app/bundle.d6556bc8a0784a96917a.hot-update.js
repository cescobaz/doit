webpackHotUpdate("bundle",{

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/Task.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var platform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@nativescript/core/platform/platform.js");
/* harmony import */ var platform__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(platform__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_todotxt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./core/todotxt.js");
/* harmony import */ var _core_todotxt__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_todotxt__WEBPACK_IMPORTED_MODULE_1__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  data: {
    description: "wee",
    creationDate: "2020-01-25",
    couldSave: false
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
      if (!this.couldSave) {
        return;
      }

      const task = {
        description: this.description
      };
      this.$store.dispatch("addTask", task);
      this.$modal.close();
    },

    updateSaveActionItem() {
      if (platform__WEBPACK_IMPORTED_MODULE_0__["isIOS"]) {
        const page = this.$refs.page;

        if (!(page && page.nativeView && page.nativeView.ios && page.nativeView.ios.navigationItem && page.nativeView.ios.navigationItem.rightBarButtonItem)) {
          return;
        }

        page.nativeView.ios.navigationItem.rightBarButtonItem.enabled = this.couldSave;
      }

      if (platform__WEBPACK_IMPORTED_MODULE_0__["isAndroid"]) {
        const actionItem = this.$refs.saveActionItem.nativeView;
        actionItem.actionBar.nativeViewProtected.getMenu().findItem(actionItem._getItemId()).setEnabled(this.couldSave);
      }
    },

    textChange(textField) {
      this.description = textField.value;
      this.couldSave = !!(this.description && this.description.trim().length > 0);
      this.updateSaveActionItem();
    }

  }
});

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vY29tcG9uZW50cy9UYXNrLnZ1ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBLHNCQURBO0FBRUEsOEJBRkE7QUFHQTtBQUhBLEdBREE7QUFNQSxjQU5BO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUpBOztBQUtBO0FBQ0E7QUFDQSxLQVBBOztBQVFBO0FBQ0E7QUFDQSxLQVZBOztBQVdBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQSxLQXBCQTs7QUFxQkE7QUFDQTtBQUNBOztBQUNBLFlBQ0EsRUFDQSxRQUNBLGVBREEsSUFFQSxtQkFGQSxJQUdBLGtDQUhBLElBSUEscURBTEEsQ0FEQSxFQVFBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQSxpREFDQSxPQURBLEdBRUEsUUFGQSxDQUVBLHVCQUZBLEVBR0EsVUFIQSxDQUdBLGNBSEE7QUFJQTtBQUNBLEtBNUNBOztBQTZDQTtBQUNBO0FBQ0EsMEJBQ0Esc0RBREE7QUFHQTtBQUNBOztBQW5EQTtBQVBBLEciLCJmaWxlIjoiYnVuZGxlLmQ2NTU2YmM4YTA3ODRhOTY5MTdhLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxGcmFtZSBAc2hvd25Nb2RhbGx5PVwidXBkYXRlU2F2ZUFjdGlvbkl0ZW1cIj5cbiAgICA8UGFnZSByZWY9XCJwYWdlXCIgQGxvYWRlZD1cImZvY3VzXCI+XG4gICAgICA8QWN0aW9uQmFyIHRpdGxlPVwiVGFza1wiPlxuICAgICAgICA8QWN0aW9uSXRlbVxuICAgICAgICAgIGlvcy5zeXN0ZW1JY29uPVwiMVwiXG4gICAgICAgICAgYW5kcm9pZC5zeXN0ZW1JY29uPVwiXCJcbiAgICAgICAgICBpb3MucG9zaXRpb249XCJsZWZ0XCJcbiAgICAgICAgICBAdGFwPVwiY2FuY2VsXCJcbiAgICAgICAgLz5cbiAgICAgICAgPEFjdGlvbkl0ZW1cbiAgICAgICAgICByZWY9XCJzYXZlQWN0aW9uSXRlbVwiXG4gICAgICAgICAgaW9zLnN5c3RlbUljb249XCIzXCJcbiAgICAgICAgICBhbmRyb2lkLnN5c3RlbUljb249XCJcIlxuICAgICAgICAgIGlvcy5wb3NpdGlvbj1cInJpZ2h0XCJcbiAgICAgICAgICBAdGFwPVwic2F2ZVwiXG4gICAgICAgIC8+XG4gICAgICA8L0FjdGlvbkJhcj5cbiAgICAgIDxTdGFja0xheW91dD5cbiAgICAgICAgPFRleHRGaWVsZFxuICAgICAgICAgIDp0ZXh0PVwiZGVzY3JpcHRpb25cIlxuICAgICAgICAgIEB0ZXh0Q2hhbmdlPVwidGV4dENoYW5nZVwiXG4gICAgICAgICAgcmVmPVwiZGVzY3JpcHRpb25UZXh0RmllbGRcIlxuICAgICAgICAgIGNsYXNzPVwiZGVzY3JpcHRpb25cIlxuICAgICAgICAgIGhpbnQ9XCJXcml0ZSB5b3VyIHRvZG8gK2hpbnRcIlxuICAgICAgICAgIHJldHVybktleVR5cGU9XCJkb25lXCJcbiAgICAgICAgICBAcmV0dXJuUHJlc3M9XCJzYXZlXCJcbiAgICAgICAgLz5cbiAgICAgICAgPExhYmVsIHRleHQ9XCJzZXBhcmF0b3JlXCIgLz5cbiAgICAgICAgPExhYmVsIDp0ZXh0PVwiZGVzY3JpcHRpb25cIiAvPlxuICAgICAgICA8TGFiZWwgOnRleHQ9XCJjcmVhdGlvbkRhdGVcIiAvPlxuICAgICAgPC9TdGFja0xheW91dD5cbiAgICA8L1BhZ2U+XG4gIDwvRnJhbWU+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IHsgaXNJT1MsIGlzQW5kcm9pZCB9IGZyb20gXCJwbGF0Zm9ybVwiO1xuaW1wb3J0IFRvZG9UWFQgZnJvbSBcIi4uL2NvcmUvdG9kb3R4dFwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGRhdGE6IHtcbiAgICBkZXNjcmlwdGlvbjogXCJ3ZWVcIixcbiAgICBjcmVhdGlvbkRhdGU6IFwiMjAyMC0wMS0yNVwiLFxuICAgIGNvdWxkU2F2ZTogZmFsc2VcbiAgfSxcbiAgY29tcHV0ZWQ6IHt9LFxuICBtZXRob2RzOiB7XG4gICAgb25Mb2FkZWQoKSB7XG4gICAgICB0aGlzLnVwZGF0ZVNhdmVBY3Rpb25JdGVtKCk7XG4gICAgICB0aGlzLmZvY3VzKCk7XG4gICAgfSxcbiAgICBmb2N1cygpIHtcbiAgICAgIHRoaXMuJHJlZnMuZGVzY3JpcHRpb25UZXh0RmllbGQubmF0aXZlVmlldy5mb2N1cygpO1xuICAgIH0sXG4gICAgY2FuY2VsKCkge1xuICAgICAgdGhpcy4kbW9kYWwuY2xvc2UoKTtcbiAgICB9LFxuICAgIHNhdmUoKSB7XG4gICAgICBpZiAoIXRoaXMuY291bGRTYXZlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRhc2sgPSB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uXG4gICAgICB9O1xuICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goXCJhZGRUYXNrXCIsIHRhc2spO1xuICAgICAgdGhpcy4kbW9kYWwuY2xvc2UoKTtcbiAgICB9LFxuICAgIHVwZGF0ZVNhdmVBY3Rpb25JdGVtKCkge1xuICAgICAgaWYgKGlzSU9TKSB7XG4gICAgICAgIGNvbnN0IHBhZ2UgPSB0aGlzLiRyZWZzLnBhZ2U7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAhKFxuICAgICAgICAgICAgcGFnZSAmJlxuICAgICAgICAgICAgcGFnZS5uYXRpdmVWaWV3ICYmXG4gICAgICAgICAgICBwYWdlLm5hdGl2ZVZpZXcuaW9zICYmXG4gICAgICAgICAgICBwYWdlLm5hdGl2ZVZpZXcuaW9zLm5hdmlnYXRpb25JdGVtICYmXG4gICAgICAgICAgICBwYWdlLm5hdGl2ZVZpZXcuaW9zLm5hdmlnYXRpb25JdGVtLnJpZ2h0QmFyQnV0dG9uSXRlbVxuICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHBhZ2UubmF0aXZlVmlldy5pb3MubmF2aWdhdGlvbkl0ZW0ucmlnaHRCYXJCdXR0b25JdGVtLmVuYWJsZWQgPSB0aGlzLmNvdWxkU2F2ZTtcbiAgICAgIH1cbiAgICAgIGlmIChpc0FuZHJvaWQpIHtcbiAgICAgICAgY29uc3QgYWN0aW9uSXRlbSA9IHRoaXMuJHJlZnMuc2F2ZUFjdGlvbkl0ZW0ubmF0aXZlVmlldztcbiAgICAgICAgYWN0aW9uSXRlbS5hY3Rpb25CYXIubmF0aXZlVmlld1Byb3RlY3RlZFxuICAgICAgICAgIC5nZXRNZW51KClcbiAgICAgICAgICAuZmluZEl0ZW0oYWN0aW9uSXRlbS5fZ2V0SXRlbUlkKCkpXG4gICAgICAgICAgLnNldEVuYWJsZWQodGhpcy5jb3VsZFNhdmUpO1xuICAgICAgfVxuICAgIH0sXG4gICAgdGV4dENoYW5nZSh0ZXh0RmllbGQpIHtcbiAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSB0ZXh0RmllbGQudmFsdWU7XG4gICAgICB0aGlzLmNvdWxkU2F2ZSA9ICEhKFxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uICYmIHRoaXMuZGVzY3JpcHRpb24udHJpbSgpLmxlbmd0aCA+IDBcbiAgICAgICk7XG4gICAgICB0aGlzLnVwZGF0ZVNhdmVBY3Rpb25JdGVtKCk7XG4gICAgfVxuICB9XG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIj5cbkBpbXBvcnQgXCJ+QG5hdGl2ZXNjcmlwdC90aGVtZS9zY3NzL3ZhcmlhYmxlcy9ibHVlXCI7XG5cbi8vIEN1c3RvbSBzdHlsZXNcbi5mYXMge1xuICBAaW5jbHVkZSBjb2xvcml6ZSgkY29sb3I6IGFjY2VudCk7XG59XG4uZGVzY3JpcHRpb24ge1xuICBmb250LXNpemU6IDMwO1xuICBwYWRkaW5nOiAyMDtcbn1cbjwvc3R5bGU+XG4iXSwic291cmNlUm9vdCI6IiJ9