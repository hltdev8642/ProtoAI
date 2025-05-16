var keyobjs = [];
var keynms = [];

function OnStart() {
   var prototest = new proto();
   edit = app.CreateCodeEdit("", 1, 0.81);
   prototest.hwshorts(edit);
   lay = app.CreateLayout("linear", "VTop");
   lay.AddChild(edit);
   var keysIn = app.ReadFile("keys.txt")
   var keyarr = keysIn.split("\n")
      //  var keyarr = keysIn.split("/\r\n|\r|\n/gm")
   var layKeys = prototest.extrakeybar(keyarr, "arr", 1, -1)
   lay.AddChild(layKeys)
   edit.SetOnDoubleTap(function() {
      
      var idx = keynms.indexOf(edit.GetText())
      if (idx > -1){
       //alert(JSON.stringify(keyobjs[4].GetList()))
        keyobjs[idx].Gone()
        }
        
   })
   app.AddLayout(lay);
}

function proto() {
   this.extrakeybar = function(keys, type, w, h, bg, bc, tc, alpha) {
      this.w = w || 1;
      this.h = h || -1;
      this.bg = bg || "#454545";
      this.bc = bc || "#783873";
      this.tc = tc || "#fff";
      this.alpha = alpha || 0.45;
      this.type = type || "other";
      if (type == "str") {
         this.extrakeys = keys.split(",");
      }
      if (type == "arr") {
         this.extrakeys = keys;
      }
      if (type == "other") {
         this.extrakeys = [" ", " "];
      }
      this.laykeybar = app.CreateLayout("linear", "horizontal");
      this.laykeybar.SetBackColor(this.bg);
      this.scrkeybar = app.CreateScroller(this.w, this.h, "noscrollbar");
      this.scrkeybar.AddChild(this.laykeybar);
      for (var i in this.extrakeys) {
         var varname = "key " + i
         varname = app.CreateList(this.extrakeys[i]);
         keyobjs.push(varname);
         keynms.push(this.extrakeys[i]);
         varname.SetBackColor(this.bc);
         varname.SetTextColor(this.tc);
         varname.SetBackAlpha(this.alpha);
         varname.SetOnLongTouch(function(title, body, image, index) {
            proto.editor.InsertText(title)
         })
         this.laykeybar.AddChild(varname);
      }
      return this.scrkeybar;
   }
   this.hwshorts = function(editor) {
      this.editor = editor;
      proto.editor = this.editor;
      app.SetOnKey(function(action, name) {
         switch (name) {
            case "VOLUME_DOWN":
               if (action == "DOWN") {
                  this.editor.SetCursorPos(this.editor.GetCursorPosition() - 1)
               }
               break;
            case "VOLUME_UP":
               if (action == "DOWN") {
                  this.editor.SetCursorPos(this.editor.GetCursorPosition() + 1);
               }
               break;
         }
      });
   }
}

function filterButtons(array, filter) {
      var btns;
      for (var key in array) {
         btns = array[key];
         if ((btns.text.toLowerCase()).indexOf(filter.toLowerCase()) > -1) {
            //btn.ScrollToItem(btns.text, null, scrKeys)
            btns.Show()
         } else {
            btns.Gone()
         }
      }
   } //end.filterButtons