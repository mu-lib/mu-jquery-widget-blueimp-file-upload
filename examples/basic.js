(function (modules, factory) {
  var root = this;
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-widget-blueimp-file-upload/examples/basic"] = factory.apply(root, modules.map(function (m) {
      return this[m] || root[m.replace(/^\.{2}/, "mu-jquery-widget-blueimp-file-upload")];
    }));
  }
})(["../widget"], function (widget) {
  return widget.extend(function ($element) {
    $element.data("mu-jquery-widget-blueimp-file-upload", {
      dataType: "json"
    });
  }, {
      "on/fileupload/done": function ($event, data) {
        var $element = this.$element;
        this.$.each(data.result.files, function (index, file) {
          $('<p/>').text(file.name).insertAfter($element);
        });
      }
    });
});