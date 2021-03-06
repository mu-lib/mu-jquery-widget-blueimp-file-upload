(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["mu-jquery-widget/widget"], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory(require("mu-jquery-widget/widget"));
  } else {
    root["mu-jquery-widget-blueimp-file-upload/widget"] = factory(root["mu-jquery-widget/widget"]);
  }
})(this, function (widget) {
  var slice = Array.prototype.slice;

  return widget.extend({
    "on/initialize": function () {
      var me = this;
      var $element = me.$element;

      function proxy(method) {
        me[me[method] ? method + "$fileupload" : method] = this;
      }

      $element.fileupload(me.$.extend({}, $element.data("mu-jquery-widget-blueimp-file-upload"), $element.is(":file") ? {
        replaceFileInput: false
      } : false));

      ["add", "submit", "send", "done", "fail", "always", "progress", "progressall", "start", "stop", "change", "paste", "drop", "dragover", "chunksend", "chunkdone", "chunkfail", "chunkalways", "processstart", "process", "processdone", "processfail", "processalway", "processstop", "destroy", "destroyed", "added", "sent", "completed", "failed", "finished", "started", "stopped"].forEach(function (type) {
        $element.on("fileupload" + type, function ($e) {
          $element.trigger("fileupload/" + type, slice.call(arguments, 1));
        });
      });

      proxy.call(function (key, value) {
        return $element.fileupload(method, key, value);
      }, "option");

      ["destroy", "disable", "enable"].forEach(proxy, function () {
        $element.fileupload(method);
        return me;
      });

      ["progress", "active"].forEach(proxy, function () {
        return $element.fileupload(method);
      });

      ["add", "send"].forEach(proxy, function (data) {
        $element.fileupload(data);
        return me;
      });
    }
  });
});