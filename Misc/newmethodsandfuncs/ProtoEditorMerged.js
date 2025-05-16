//------------------------------------------------------------------------
//ProtoEditor.js
//ProtoMerged v2.4.0
//------------------------------------------------------------------------
var listRecents = app.CreateList( ", " );
var errors = ",IgnoreErrors"
app.SetOptions("AllowRemote")
var mybuttons = [];
var barAHeight = 0.09
var barBHeight = 0.09
var keyBarHeight = 0.09
var titleBarHeight = 0.09
var codEdit;
var uix;
//app.Script("extraKeyBar.js")
//app.Script("init.js");
new opts();
new keybd();
function OnStart()
   {
   app.LoadPlugin("UIExtras");
 uix = app.CreateUIExtras();
app.LoadPlugin("Support");
var sup = app.CreateSupport();

//      var removeList = "ProtoEditor.js,console.js,init.js"
//      var frontList = "extraKeyBar.js"
//      opts.LoadScripts(removeList.split(","), frontList, true);
      //app.CreateDebug();
      if (app.LoadBoolean("isLocked", null, "isLocked.txt"))
      {
         app.SaveBoolean("isConfig", false, "isConfig.txt");
      }
      else
      {
         app.SaveBoolean("isConfig", true, "isConfig.txt");
      }
      app.SaveBoolean("isProtected", true, "isProtected.txt");

      app.SetOnShowKeyboard(function ()
      {
         keybd.init()
      });
      //app.CreateDebug();
      setTheme()

      layps = app.CreateLayout("linear", "Vertical")
      layps.SetMargins(0.018, 0.018, 0.018, 0.018);
      laypp = app.CreateLayout("Linear")
         //     layps.SetPadding(null,.09,.09,null,.5);
      laypp.SetBackColor("#363636");
      laypp.AddChild(layps);
      prg = sup.CreateProgress();
      prg.SetSpinSpeed(Math.PI / 9)
      prg.SetBarColor("#783873");
      prg.SetRimColor("#2c2b2a");
      prg.SetRimWidth(8.91)
      prg.SetCircleRadius(.27)
      prg.SetBarWidth(9)
      prg.SetSpin(true);
      layps.AddChild(prg);
      dlgpp = sup.CreateBottomSheet(1, .65);
      // app.CreateDialog("", "notitle,nocancel");
      dlgpp.AddChild(laypp);
      dlgpp.Show();
      txtUpdate = app.CreateText("Booting...", 1, -1, "MultiLine")
      txtUpdate.SetPadding(.0108, .0108, .0108, .0108);
      layps.AddChild(txtUpdate);
      if (app.IsAPK())
      {
         app.SetSharedApp(app.GetAppName());
      }
      txtUpdate.SetText('Ops Config...')
         // opts.LoadScript("extraKeyBar.js");
      opts.config()
      //var permissions = new SetPermissions();
      //permissions.Check()
      txtUpdate.SetText('Configuring hardware keys...')
      hwShorts()
      txtUpdate.SetText('Making multiedit...')
      var medit = new multiEdit();
      var med = medit.init();
      dlgmult = app.CreateDialog("medit", "NoDim,OverKeys");
      dlgmult.AddLayout(med);
      txtUpdate.SetText("Ops Extract")
      opts.extract()
      build()
      new drawer()
      txtUpdate.SetText('Initializing clipboard / utility drawer...')
      drawer.buildRight()
      txtUpdate.SetText('Initializing file drawer...')
      drawer.buildLeft()
      if (!app.LoadBoolean("assetsExt", false, "assetsExt.txt"))
      {
         opts.dlgWs.Show();
         app.SaveBoolean("assetsExt", true, "assetsExt.txt");
      }
      if (app.LoadBoolean("isFirstBoot", true, "isFirstBoot.txt"))
      {
         window.OnBack()
         window.OnBack()
         window.OnBack()
         app.SaveBoolean("isFirstBoot", false, "isFirstBoot.txt");
      }
   } //end.OnStart

function build()
   {
      layM = app.CreateLayout("linear");
      setTheme()
      txtUpdate.SetText('Creating title bar...')
      new titleBar();
      var titleB = titleBar.CreateTitleBar("ProtoEditor", 16);
      titleB.h = titleBarHeight;
      titleBar.SetStyle(titleBarHeight, .27, "#2c2b2a", "#383873", "#793939", "#2c2b2a", -1);
      layM.AddChild(titleB)
         //new newd()
         //drawer.tabs()
      txtUpdate.SetText('Building menubar A...')
      var ebarA = new editorBarA();
      ebarA.h = barAHeight
      layM.edtBarA = ebarA.init(ebarA.h)
      layM.AddChild(layM.edtBarA);
      //layM.AddChild(ebarA.init())
      txtUpdate.SetText('Creating code editor...')
         // var frmCode = app.CreateLayout("frame")
      codEdit = new codeEditor();
      codEdit.hSum = parseFloat(1 - (barAHeight + barBHeight + titleBarHeight + keyBarHeight + 0.045))
      layM.codeEdit = codEdit.init(codEdit.hSum)
         // frmCode.AddChild(layM.codeEdit);
      layM.AddChild(layM.codeEdit);
      txtUpdate.SetText('Building menubar B...')
      var ebarB = new editorBarB();
      ebarB.h = barBHeight
      layM.edtBarB = ebarB.init(ebarB.h)
      layM.AddChild(layM.edtBarB);
      txtUpdate.SetText('Initializing key shortcut bar...')
      var pathKeys = app.LoadText("pathDat", (app.GetAppPath() + "/user/"), "pathDat.txt") + "/keys.txt"
      var keys = app.ReadFile(pathKeys)
      keybar.init(keyBarHeight);
      keybar.SetKeys(app.ReadFile(pathKeys));
      var extbar = keybar.GetExtraKeyBar(edtTxt)
      layM.AddChild(extbar);
      app.AddLayout(layM);
      txtUpdate.SetText('Building docsviewer')
      new docs();
      docs.build()
      dlgpp.Dismiss();
   } //end.build

//OnConfig
function OnConfig()
   {
      if (app.LoadBoolean("isConfig", null, "isConfig.txt"))
      {
         app.CloseDrawer("left");
         app.CloseDrawer("right");
         app.RemoveDrawer("right");
         app.RemoveDrawer("left")
         var urlLeft = "file:///" + pathData.GetText() + "/web/viewer.html"
         drawer.buildLeft(urlLeft)
         drawer.webpdf.LoadUrl("file:///" + pathData.GetText() + "/web/viewer.html");
         drawer.buildRight()
         dlgRecents.Dismiss();
         txtUpdate.SetText("Reconfiguring layout...")
         dlgpp.Show()
         app.DestroyLayout(layM);
         build()
         layM.SetTouchable(true);
         layImg.Gone();
         onFileChoose(app.LoadText("currentFile", "/", "currentFile.txt"))
         spnSyntax.SetText(app.LoadText("syntaxTmp", null, "syntaxTmp.txt"))
         dlgpp.Dismiss();
      }
      else
      {
         dlgRecents.Dismiss();
         //   txtUpdate.SetText("Reconfiguring layout...")
         //     dlgpp.Show()
         app.CloseDrawer("left");
         app.CloseDrawer("right");
         app.RemoveDrawer("right");
         app.RemoveDrawer("left")
         var urlLeft = "file:///" + pathData.GetText() + "/web/viewer.html"
         drawer.buildLeft(urlLeft)
         drawer.webpdf.LoadUrl("file:///" + pathData.GetText() + "/web/viewer.html");
         drawer.buildRight()
            //  dlgpp.Hide();
      }
   } //end.OnConfig
//OnPause

function OnPause()
   {
      app.SaveBoolean("oldConfig", app.LoadBoolean("isConfig", null, "isConfig.txt"), "oldConfig.txt");
      app.SaveBoolean("isConfig", false, "isConfig.txt");
      app.SaveText("listRecents ", listRecents.GetList(","), "listRecents.txt");
//      app.SaveText("listRecents", (listRecents.GetList(",") || ","), "listRecents.txt");
      //app.SaveText("wsDir",null , "wsDir.txt");
   } //end.OnPause
//OnResume

function OnResume()
   {
      app.SaveBoolean("isConfig", app.LoadBoolean("oldConfig", null, "oldConfig.txt"), "isConfig.txt");
      // debug
      // app.ShowPopup( app.LoadText("wsDir","/sdcard","wsDir.txt"));
   } //end.OnResume

function OnData(isStartUp)
   {
      new osr();
      sharedFiles = app.GetSharedFiles();
      sharedData = app.GetSharedText([0]);
      if (sharedData)
      {
         if (osr.status(sharedData)) browser.build();
         osr.url(sharedData);
         if (!osr.status(sharedData)) edtTxt.InsertText(sharedData)
      }
      if (sharedFiles)
      {
         //Display intent data.
         var intent = app.GetIntent();
         if (intent)
         {
            var s = "";
            s = sharedFiles[0];
            // alert(sharedFiles[0])
            for (var key in intent.extras)
            {
               // s = intent.extras[key];
               //  s = intent.extras[key]
               // app.ShowPopup(s);
               if (key = "real_path")
               {
                  s = intent.extras[key];
               } //endif
            } //endfor
            //	alert(s);
            s = s.replace("/storage/emulated/0", "/sdcard");
            onFileChoose(s)
         } //endif
      } //endif
   } //end.OnData
   
//editorBarA
function editorBarA()
   {
      this.init = function (barH)
      {
         this.edtBarBackColor = "#2c2b2a";
         this.syntaxList = "Syntax:" + "," + "html,php,javascript,python,java,text,markdown,c,ruby,arduino,source,css,image,audio,video,pdf"
         this.globalTextSize = 14.4l 
         editorBarA.h = barH || -1
         editorBarA.edtBar = app.CreateLayout("Linear", "Horizontal");
         editorBarA.edtBar.SetSize(1, editorBarA.h);
         editorBarA.edtBar.SetBackColor(this.edtBarBackColor);
         editorBarA.edtBar.SetMargins(0, 0, 0, 0);
         var btnsedtBarA = ["[fa-bars]", "[fa-save]", "[fa-folder-open]", "[fa-play]", "[fa-bug]", "[fa-chrome]", "[fa-lock]"];
         var wBarA = parseFloat((1 / (btnsedtBarA.length + 3)))
         for (var i = 0; i < btnsedtBarA.length; i++)
         {
            btnsA = app.CreateList(btnsedtBarA[i], wBarA, -1, "FontAwesome,monospace");
            btnsA.SetColumnWidths(0, 1, 0);
            btnsA.SetTextSize(this.globalTextSize);
            btnsA.icon = btnsedtBarA[i];
            btnsA.SetOnTouch(keys_OnTouch)
            btnsA.SetOnLongTouch(keys_OnLTouch);
            editorBarA.edtBar.AddChild(btnsA);
         }
         spnSyntax = app.CreateSpinner(this.syntaxList)
         spnSyntax.SetTextSize(this.globalTextSize);
         spnSyntax.SetOnChange(function (item)
         {
            switch (item)
            {
               case "markdown":
                  app.SaveBoolean("isProtected", false, "isProtected.txt");
                  edtTxt.SetLanguage(".md");
                  break;
               case "text":
                  app.SaveBoolean("isProtected", false, "isProtected.txt");
                  edtTxt.SetLanguage(".txt");
                  break;
               case "html":
                  app.SaveBoolean("isProtected", false, "isProtected.txt");
                  edtTxt.SetLanguage(".html");
                  break;
               case "css":
                  app.SaveBoolean("isProtected", false, "isProtected.txt");
                  edtTxt.SetLanguage(".css");
                  break;
               case "python":
                  app.SaveBoolean("isProtected", false, "isProtected.txt");
                  edtTxt.SetLanguage(".py");
                  break;
               case "php":
                  app.SaveBoolean("isProtected", false, "isProtected.txt");
                  edtTxt.SetLanguage(".php");
                  break;
               case "javascript":
                  app.SaveBoolean("isProtected", false, "isProtected.txt");
                  edtTxt.SetLanguage(".js");
                  break;
               case "java":
                  app.SaveBoolean("isProtected", false, "isProtected.txt");
                  edtTxt.SetLanguage(".java");
                  break;
               case "python":
                  app.SaveBoolean("isProtected", false, "isProtected.txt");
                  edtTxt.SetLanguage(".py");
                  break;
               case "c":
                  app.SaveBoolean("isProtected", false, "isProtected.txt");
                  edtTxt.SetLanguage(".c");
                  break;
               case "ruby":
                  app.SaveBoolean("isProtected", false, "isProtected.txt");
                  edtTxt.SetLanguage(".rb");
                  break;
               case "arduino":
                  app.SaveBoolean("isProtected", false, "isProtected.txt");
                  edtTxt.SetLanguage(".c");
                  break;
               case "ruby":
                  app.SaveBoolean("isProtected", false, "isProtected.txt");
                  edtTxt.SetLanguage(".rb");
                  break;
               case "source":
                  app.SaveBoolean("isProtected", false, "isProtected.txt");
                  edtTxt.SetLanguage(".rb");
                  break;
               case "image":
                  app.SaveBoolean("isProtected", true, "isProtected.txt");
                  app.ShowPopup("Protection Enabled");
                  edtTxt.SetLanguage("Syntax:");
                  break;
               case "video":
                  app.SaveBoolean("isProtected", true, "isProtected.txt");
                  app.ShowPopup("Protection Enabled");
                  edtTxt.SetLanguage("Syntax:");
                  break;
               case "audio":
                  app.SaveBoolean("isProtected", true, "isProtected.txt");
                  app.ShowPopup("Protection Enabled");
                  edtTxt.SetLanguage("Syntax:");
                  break;
               case "pdf":
                  app.SaveBoolean("isProtected", true, "isProtected.txt");
                  app.ShowPopup("Protection Enabled");
                  edtTxt.SetLanguage("Syntax:");
                  break;
               default:
                  app.SaveBoolean("isProtected", false, "isProtected.txt");
                  edtTxt.SetLanguage(".js");
                  break;
            } //end switch
         });
         editorBarA.edtBar.AddChild(spnSyntax);
         return editorBarA.edtBar;
      }
   } //end.editorBarA 

//editorBarB
function editorBarB()
   {
      this.init = function (barBH)
      {
         editorBarB.edtBarBackColor = "#2c2b2a";
         editorBarB.h = barBH || -1
         editorBarB.edtBar = app.CreateLayout("Linear", "horizontal");
         editorBarB.edtBar.SetBackColor(editorBarB.edtBarBackColor);
         editorBarB.edtBar.SetSize(1, editorBarB.h);
         var globalTextSize = 12.2
         app.SaveBoolean("isUndo", false);
         btnUndoFast = app.CreateText("[fa-backward]", 1 / 9, -1, "fontawesome")
         btnUndoFast.SetOnTouchDown(function ()
         {
            app.LockDrawer("left");
            app.SaveBoolean("isUndo", true);
            setInterval(function ()
            {
               if (app.LoadBoolean("isUndo") == true)
               {
                  edtTxt.Undo();
               }
            }, 180)
         });
         btnUndoFast.SetOnTouchUp(function ()
         {
            app.SaveBoolean("isUndo", false);
            app.UnlockDrawer("left");
         });
         editorBarB.edtBar.AddChild(btnUndoFast);
         btnUndo = app.CreateList("[fa-undo]", 1 / 9, -1, "FontAwesome");
         btnUndo.icon = "[fa-undo]"
         btnUndo.SetOnTouch(keys_OnTouch);
         editorBarB.edtBar.AddChild(btnUndo);
         btnSearch = app.CreateList("[fa-search]", 1 / 9, -1, "FontAwesome");
         btnSearch.icon = "[fa-search]";
         btnSearch.SetOnTouch(keys_OnTouch);
         editorBarB.edtBar.AddChild(btnSearch);
         searchF = app.CreateTextEdit("", 1.5 / 9, -1, "singleline");
         searchF.SetHint("find");
         searchF.SetOnTouch(function ()
         {
            app.SaveBoolean("isSearch", true);
         });
         searchF.SetTextSize(globalTextSize);
         searchF.SetOnEnter(function ()
         {
            edtTxt.Search(searchF.GetText());
         });
         editorBarB.edtBar.AddChild(searchF);
         searchR = app.CreateTextEdit("", 1.5 / 9, -1, "singleline");
         searchR.SetHint("replace");
         searchR.SetOnTouch(function ()
         {
            app.SaveBoolean("isSearch", true);
         });
         searchR.SetOnEnter(function ()
         {
            edtTxt.Search(searchF.GetText());
            edtTxt.Replace(searchR.GetText());
         });
         searchR.SetTextSize(globalTextSize);
         editorBarB.edtBar.AddChild(searchR);
         btnReplace = app.CreateList("[fa-exchange]", 1 / 9, -1, "FontAwesome");
         btnReplace.icon = "[fa-exchange]";
         btnReplace.SetOnTouch(keys_OnTouch);
         btnReplace.SetOnLongTouch(keys_OnLTouch);
         editorBarB.edtBar.AddChild(btnReplace);
         btnRepeat = app.CreateList("[fa-repeat]", 1 / 9, -1, "FontAwesome");
         btnRepeat.icon = "[fa-repeat]";
         btnRepeat.SetOnTouch(keys_OnTouch);
         editorBarB.edtBar.AddChild(btnRepeat);
         btnRepeatFast = app.CreateText("[fa-forward]", 1 / 9, -1, "button,fontawesome")
         btnRepeatFast.SetOnTouchDown(function ()
         {
            app.LockDrawer("right");
            app.SaveBoolean("isRedo", true);
            setInterval(function ()
            {
               if (app.LoadBoolean("isRedo") == true)
               {
                  edtTxt.Redo();
               }
            }, 180)
         });
         btnRepeatFast.SetOnTouchUp(function ()
         {
            btnRepeatFast.SetBackColor("#2c2b2a");
            app.SaveBoolean("isRedo", false);
            app.UnlockDrawer("right");
         });
         editorBarB.edtBar.AddChild(btnRepeatFast);
         return editorBarB.edtBar
      }
   } //end.editorBarB 
   
//extraKeyBar.js
function extraKeyBar()
   {
      this.backColor = "#783863"
      this.globalAlpha = .18
      this.textSize = 12.6
      this.init = function (kbHeight)
         {
            extraKeyBar.h = kbHeight || null
            layKeys = app.CreateLayout("linear", "horizontal");
            layKeys.SetBackColor(this.backColor);
            layKeys.SetBackAlpha(this.globalAlpha);
            frameKeys = app.CreateScroller(1, extraKeyBar.h, "NoScrollBars");
            frameKeys.AddChild(layKeys);
            scrKeys = app.CreateLayout("Linear", "Horizontal");
            frameKeys.SetMargins(0, 0, 0, 0);
            frameKeys.SetPadding(0, 0, 0, 0);
            //scrKeys.SetSize(1, extraKeyBar.h);
            scrKeys.SetBackColor("#2c2b2a");
            scrKeys.AddChild(frameKeys);
         } //end extraKeyBar.init()
      this.SetKeys = function (keys)
         {
            this.keys = keys;
            btns = [];
            spns = [];
         } //end extraKeyBar.setKeys()
      this.GetExtraKeyBar = function (editor)
         {
            this.editor = editor
            var keys = this.keys;
            chlist = app.CreateList("")
            var keysplit = keys.split(/\r\n|\r|\n/gm)
            for (i = 0; i < keysplit.length; i++)
            {
               var ch = keysplit[i];
               chlist.AddItem(keysplit[i]);
               //       btn = app.CreateList(ch);
               btn = findableButton(mybuttons, ch, -1, extraKeyBar.h);
               btn.SetOnLongTouch(function (title, body, index)
               {
                  editor.InsertText(title);
               });
               layKeys.AddChild(btn);
               // btns.push(btn);
            } //endfor
            return scrKeys
         } //end extraKeyBar.GetBar()
      extraKeyBar.KeyEditorConfig = function (wsPath)
         {
            extraKeyBar.path = wsPath || app.LoadText("pathDat", "", "pathDat.txt");
            extraKeyBar.layout = app.CreateLayout("Linear", "Top,FillXY");
            extraKeyBar.editor = app.CreateTextEdit("", 0.90, 0.36);
            extraKeyBar.editor.SetText(app.ReadFile(extraKeyBar.path + '/keys.txt'));
            extraKeyBar.btnSetKeys = app.CreateButton("Set Keys");
            extraKeyBar.btnSetKeys.SetOnTouch(function ()
            {
               app.WriteFile(extraKeyBar.path + '/keys.txt', extraKeyBar.editor.GetText());
               alert("Keys set, restart app to initialize changes")
               extraKeyBar.dialog.Dismiss();
               app.CloseDrawer("right");
            });
            extraKeyBar.dialog = app.CreateDialog('KeyBar Editor');
            extraKeyBar.dialog.SetBackColor("#2c2b2a");
            extraKeyBar.dialog.SetBackAlpha(0.18);
            extraKeyBar.layout.AddChild(extraKeyBar.editor);
            extraKeyBar.layout.AddChild(extraKeyBar.btnSetKeys);
            extraKeyBar.dialog.AddLayout(extraKeyBar.layout);
         } //end extraKeyBar.KeyEditor()
      this.KeyEditor = function ()
         {
            extraKeyBar.KeyEditorConfig(app.LoadText('pathDat', null, 'pathDat.txt'));
            extraKeyBar.dialog.SetOnCancel(function ()
            {
               app.CloseDrawer("right");
            });
            extraKeyBar.dialog.SetOnBack(function ()
            {
               app.CloseDrawer("right");
            });
            extraKeyBar.dialog.Show();
         } //end extraKeyBar.KeyEditor
   } //end.extraKeyBar 
function refilter() {
      edtTxt.SetOnDoubleTap(function() {
         app.OpenDrawer("right");
      });
      /*enable for key shortcut commandoutput*/
      /*edtTxt.SetOnChange(function (title) {*/
      /*gets current key*/ //
      var txttmp = edtTxt.GetText().substring(edtTxt.GetCursorPos(), edtTxt.GetLineStart(edtTxt.GetCursorLine()))
      if (txttmp.indexOf('\"') > -1) {
         filterButtons(mybuttons, edtTxt.GetText().substring((edtTxt.GetText().lastIndexOf('\"') + 1), (edtTxt.GetCursorPos())))
      } else if (txttmp.indexOf(",") > -1) {
         filterButtons(mybuttons, edtTxt.GetText().substring((edtTxt.GetText().lastIndexOf(",") + 1), (edtTxt.GetCursorPos())))
      } else if (txttmp.indexOf(".") > -1) {
         filterButtons(mybuttons, edtTxt.GetText().substring((edtTxt.GetText().lastIndexOf(".") + 1), (edtTxt.GetCursorPos())))
      } else if (txttmp.indexOf("function ") > -1) {
         filterButtons(mybuttons, edtTxt.GetText().substring((edtTxt.GetText().lastIndexOf(" ") + 1), (edtTxt.GetCursorPos())))
      } else if (txttmp.indexOf("=") > -1) {
         filterButtons(mybuttons, edtTxt.GetText().substring((edtTxt.GetText().lastIndexOf("=") + 1), (edtTxt.GetCursorPos())))
      } else if (txttmp.indexOf(",") > -1) {
         filterButtons(mybuttons, edtTxt.GetText().substring((edtTxt.GetText().lastIndexOf(",") + 1), (edtTxt.GetCursorPos())))
      } else if (txttmp.indexOf("if") > -1) {
         filterButtons(mybuttons, edtTxt.GetText().substring((edtTxt.GetText().lastIndexOf("if") + 1), (edtTxt.GetCursorPos())))
      } else if (txttmp.indexOf("for") > -1) {
         filterButtons(mybuttons, edtTxt.GetText().substring((edtTxt.GetText().lastIndexOf("for") + 1), (edtTxt.GetCursorPos())))
      } else if (txttmp.indexOf("do") > -1) {
         filterButtons(mybuttons, edtTxt.GetText().substring((edtTxt.GetText().lastIndexOf("do") + 1), (edtTxt.GetCursorPos())))
      } else if (txttmp.indexOf("<") > -1) {
         filterButtons(mybuttons, edtTxt.GetText().substring((edtTxt.GetText().lastIndexOf("<") + 1), (edtTxt.GetCursorPos())))
      } else {}
   } //end.refilter
function findableButton(array, text, width, height, options) {
      var btn = app.CreateList(text, null, null, "")
      btn.SetTextSize(12.6)
      btn.SetOnTouch(function(title) {
         var edtTmp = edtTxt.GetText().substring(edtTxt.GetText().lastIndexOf(".") + 1, edtTxt.GetCursorPos())
         var txttmp = edtTxt.GetText().substring(edtTxt.GetCursorPos(), edtTxt.GetLineStart(edtTxt.GetCursorLine()))
         if (txttmp.indexOf('\"') > -1) {
            edtTxt.ReplaceText(title, edtTxt.GetText().lastIndexOf('\"'), edtTxt.GetCursorPos())
         } else if (txttmp.indexOf(',') > -1) {
            edtTxt.ReplaceText(title, edtTxt.GetText().lastIndexOf(','), edtTxt.GetCursorPos())
         } else if (txttmp.indexOf(".") > -1) {
            edtTxt.ReplaceText(title, edtTxt.GetText().lastIndexOf(".") + 1, edtTxt.GetCursorPos())
         } else if (txttmp.indexOf("function ") > -1) {
            edtTxt.ReplaceText(title, edtTxt.GetText().lastIndexOf(" ") + 1, edtTxt.GetCursorPos())
         } else if (txttmp.indexOf(",") > -1) {
            edtTxt.ReplaceText(title, edtTxt.GetText().lastIndexOf(",") + 1, edtTxt.GetCursorPos())
         } else if (txttmp.indexOf("if") > -1) {
            edtTxt.ReplaceText(title, edtTxt.GetText().lastIndexOf("if"), edtTxt.GetCursorPos())
         } else if (txttmp.indexOf("for") > -1) {
            edtTxt.ReplaceText(title, edtTxt.GetText().lastIndexOf("for"), edtTxt.GetCursorPos())
         } else if (txttmp.indexOf("do") > -1) {
            edtTxt.ReplaceText(title, edtTxt.GetText().lastIndexOf("do"), edtTxt.GetCursorPos())
         } else if (txttmp.indexOf("<") > -1) {
            edtTxt.ReplaceText(title, edtTxt.GetText().lastIndexOf("<"), edtTxt.GetCursorPos())
         } else {}
         // edtTxt.ReplaceText(edtTxt.Search(title,"down",true,true),edtTxt.GetCursorPos(), edtTxt.Search(".")
      })
      btn.text = text;
      array.push(btn);
      return btn
   } //end.findableButton
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
   
   
//fileMgr.js 
function openFile()
   {
      app.ChooseFile("Choose a file", "\*/\*", onFileChoose)
   } //end.openFile
function osr()
   {
      osr.url = function (txtIn)
         {
            osr.file = txtIn
               //url check 
            var regexUrl = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:� _\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:� \+.~#?&//=]*)/ig
            var isURL = regexUrl.exec(osr.file)
               //alert(isURL!==null)
            if (isURL)
            {
               //browser.LoadPage(osr.file)
               return true;
            }
         } //osr.url
      osr.status = function (txtIn)
         {
            osr.file = txtIn
            var regexUrl = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:� _\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:� \+.~#?&//=]*)/ig
            var isURL = regexUrl.exec(osr.file)
            return isURL;
         } //osr.status
   } //end osr

function onFileChoose(file)
   {
      app.SaveText("currentFile", file, "currentFile.txt");
      titleBar.SetPath(app.LoadText("currentFile", null, "currentFile.txt"));
      drawer.SetPath(app.LoadText("currentFile", null, "currentFile.txt"));
      if ((file.indexOf(".mp3") > -1) | (file.indexOf(".flac") > -1) | (file.indexOf(".wav") > -1) | (file.indexOf(".aac") > -1) | (file.indexOf(".wma") > -1))
      {
         var ap = new audioPlayer();
         app.SaveText("currentFile", file, "currentFile.txt");
         listRecents.AddItem(file, 'audio', null);
         app.SaveBoolean("isProtected", true, "isProtected.txt");
         app.SaveText("listRecents", listRecents.GetList(","), "listRecents.txt")
         spnSyntax.SetText("audio");
         ap.CreateAudioPlayer()
         ap.LoadAudio(file);
         ap.Show()
         ap.PlayAudio()
         return
      }
      if ((file.indexOf("mp4") > -1) | (file.indexOf(".mov") > -1) | (file.indexOf(".avi") > -1) | (file.indexOf(".mkv") > -1) | (file.indexOf(".mpeg4") > -1) | (file.indexOf(".3gp") > -1) | (file.indexOf(".webm") > -1))
      {
         var vp = new videoPlayer();
         app.SaveText("currentFile", file, "currentFile.txt");
         app.SaveBoolean("isProtected", true, "isProtected.txt");
         listRecents.AddItem(file, 'video', null);
         app.SaveText("listRecents", listRecents.GetList(","), "listRecents.txt")
         spnSyntax.SetText("video");
         vp.CreateVideoPlayer()
         vp.LoadVideo(file);
         vp.PlayVideo();
         return
      }
      if ((file.indexOf(".jpg") > -1) | (file.indexOf(".png") > -1) | (file.indexOf(".jpeg") > -1) | (file.indexOf(".svg") > -1) | (file.indexOf(".psd") > -1) | (file.indexOf(".bmp") > -1) | (file.indexOf(".gif") > -1) | (file.indexOf(".ico") > -1) | (file.indexOf(".cr2") > -1) | (file.indexOf(".raw") > -1))
      {
         app.SaveText("currentFile", file, "currentFile.txt");
         spnSyntax.SetText("image");
         app.SaveBoolean("isProtected", true, "isProtected.txt");
         webImg = app.CreateWebView(null, null, "IgnoreErrors,NoScrollBars,AllowZoom")
         layImg = app.CreateLayout("frame");
         layImg.AddChild(webImg);
         layTr = app.CreateLayout("linear", "Vertical,Right");
         layImg.AddChild(layTr);
         layTr.SetPadding(null, .18, null, null);
         btnClose = app.CreateButton("[fa-close]", -1, null, "FontAwesome");
         btnShare = app.CreateButton("[fa-share-alt]", -1, null, "FontAwesome");
         btnPrint = app.CreateButton("[fa-print]", -1, null, "FontAwesome");
         layTr.AddChild(btnClose);
         layTr.AddChild(btnShare);
         layTr.AddChild(btnPrint);
         btnPrint.SetOnTouch(function ()
         {
            webImg.Print();
         });
         btnShare.SetOnTouch(function ()
         {
            app.SendFile("file://" + file)
         });
         btnClose.SetOnTouch(function ()
         {
            layM.SetTouchable(true);
            layImg.Gone();
         });
         app.AddLayout(layImg);
         var mdContent2 = '![](' + file + ')';
         var md2 = new mdParser(file, mdContent2);
         var html2 = md2.GetHtml();
         webImg.ClearHistory();
         webImg.LoadHtml(html2);
         layM.SetTouchable(false);
         layImg.Animate("SlideFromBottom");
         spnSyntax.SetText('Syntax');
         listRecents.AddItem(file, "image");
         app.SaveText("listRecents", listRecents.GetList(","), "listRecents.txt");
         return;
      }
      if (file.indexOf(".pdf") > -1)
      {
         webtmp = app.CreateWebView(1, 1);
         //dlgtmp = app.CreateDialog("","NoDim");
         //dlgtmp.AddLayout(webtmp);
         scriptA = app.CreateText(" ");
         scriptA.SetText(app.ReadFile('jsA.txt'));
         scriptB = app.CreateText(" ");
         scriptB.SetText(app.ReadFile('jsB.txt'));
         // app.DeleteFile('web/viewer.js', );
         app.SaveText("currentFile", file, "currentFile.txt");
         listRecents.AddItem(file, '.pdf ', null);
         app.SaveText("listRecents", listRecents.GetList(","), "listRecents.txt")
         spnSyntax.SetText("pdf");
         app.SaveBoolean("isProtected", true, "isProtected.txt");
         app.WriteFile(pathData.GetText() + "/web/viewer.js", scriptA.GetText() + file + scriptB.GetText());
         //app.WriteFile("web/viewer.js", app.LoadText("jsA", null, "jsA.txt") + edtPath.GetText() + app.LoadText("jsB", null, "jsB.txt"));
         drawer.webpdf.Hide()
         drawer.webpdf.Show()
            //drawer webpdf.ClearFocus();
         drawer.webpdf.Reload();
         drawer.webpdf.ClearHistory();
         drawer.webpdf.LoadUrl("file:///" + pathData.GetText() + "/web/viewer.html");
         //webtmp.LoadUrl("file:///sdcard/documents/hlteditor/data/web/viewer.html");
         app.OpenDrawer("left");
         //app.SimulateTouch(drawer.layMain, .71, .05, "down");
         drawer.tabs.ShowTab(" PDF Viewer")
            //webtmp.SetOnProgress(function() {
         app.OpenDrawer("left");
         //});
         return;
      }
      if (file.indexOf(".py") > -1)
      {
         if (isEdtA == true)
         {
            edtA.SetText(app.ReadFile(file));
            return;
         }
         if (isEdtB == true)
         {
            edtB.SetText(app.ReadFile(file));
            return;
         }
         edtTxt.SetText(app.ReadFile(file));
         app.SaveText("currentFile", file, "currentFile.txt");
         spnSyntax.SetText('python');
         listRecents.AddItem(file, ".py", null);
         app.SaveText("listRecents", listRecents.GetList(","), "listRecents.txt")
         app.SaveBoolean("isProtected", false, "isProtected.txt");
         return
      }
      if (file.indexOf(".php") > -1)
      {
         if (isEdtA == true)
         {
            edtA.SetText(app.ReadFile(file));
            return;
         }
         if (isEdtB == true)
         {
            edtB.SetText(app.ReadFile(file));
            return;
         }
         edtTxt.SetText(app.ReadFile(file));
         app.SaveText("currentFile", file, "currentFile.txt");
         spnSyntax.SetText('php');
         listRecents.AddItem(file, '.php', null);
         app.SaveText("listRecents", listRecents.GetList(","), "listRecents.txt")
         app.SaveBoolean("isProtected", false, "isProtected.txt");
         return;
      }
      if ((file.indexOf(".txt") > -1) | (file.indexOf(".text") > -1) | (file.indexOf(".dat") > -1))
      {
         if (isEdtA == true)
         {
            edtA.SetText(app.ReadFile(file));
            return;
         }
         if (isEdtB == true)
         {
            edtB.SetText(app.ReadFile(file));
            return;
         }
         edtTxt.SetText(app.ReadFile(file));
         app.SaveText("currentFile", file, "currentFile.txt");
         spnSyntax.SetText('text');
         listRecents.AddItem(file, '.txt', null);
         app.SaveText("listRecents", listRecents.GetList(","), "listRecents.txt")
         app.SaveBoolean("isProtected", false, "isProtected.txt");
         return;
      }
      if (file.indexOf(".js") > -1)
      {
         if (isEdtA == true)
         {
            edtA.SetText(app.ReadFile(file));
            return;
         }
         if (isEdtB == true)
         {
            edtB.SetText(app.ReadFile(file));
            return;
         }
         edtTxt.SetText(app.ReadFile(file));
         app.SaveText("currentFile", file, "currentFile.txt");
         spnSyntax.SetText('javascript');
         listRecents.AddItem(file, '.js', null);
         app.SaveText("listRecents", listRecents.GetList(","), "listRecents.txt")
         app.SaveBoolean("isProtected", false, "isProtected.txt");
         return;
      }
      if (file.indexOf(".rb") > -1)
      {
         if (isEdtA == true)
         {
            edtA.SetText(app.ReadFile(file));
            return;
         }
         if (isEdtB == true)
         {
            edtB.SetText(app.ReadFile(file));
            return;
         }
         edtTxt.SetText(app.ReadFile(file));
         app.SaveText("currentFile", file, "currentFile.txt");
         spnSyntax.SetText('ruby');
         listRecents.AddItem(file, '.rb', null);
         app.SaveText("listRecents", listRecents.GetList(","), "listRecents.txt")
         app.SaveBoolean("isProtected", false, "isProtected.txt");
         return;
      }
      if (file.indexOf(".c") > -1)
      {
         if (isEdtA == true)
         {
            edtA.SetText(app.ReadFile(file));
            return;
         }
         if (isEdtB == true)
         {
            edtB.SetText(app.ReadFile(file));
            return;
         }
         edtTxt.SetText(app.ReadFile(file));
         app.SaveText("currentFile", file, "currentFile.txt");
         spnSyntax.SetText(".c");
         listRecents.AddItem(file, '.c', null);
         app.SaveText("listRecents", listRecents.GetList(","), "listRecents.txt")
         app.SaveBoolean("isProtected", false, "isProtected.txt");
         return;
      }
      if (file.indexOf(".h") > -1)
      {
         if (isEdtA == true)
         {
            edtA.SetText(app.ReadFile(file));
            return;
         }
         if (isEdtB == true)
         {
            edtB.SetText(app.ReadFile(file));
            return;
         }
         edtTxt.SetText(app.ReadFile(file));
         app.SaveText("currentFile", file, "currentFile.txt");
         spnSyntax.SetText(".c");
         listRecents.AddItem(file, '.h', null);
         app.SaveText("listRecents", listRecents.GetList(","), "listRecents.txt");
         app.SaveBoolean("isProtected", false, "isProtected.txt");
         return;
      }
      if (file.indexOf(".ino") > -1)
      {
         if (isEdtA == true)
         {
            edtA.SetText(app.ReadFile(file));
            return;
         }
         if (isEdtB == true)
         {
            edtB.SetText(app.ReadFile(file));
            return;
         }
         edtTxt.SetText(app.ReadFile(file));
         app.SaveText("currentFile", file, "currentFile.txt");
         spnSyntax.SetText(".c");
         listRecents.AddItem(file, '.ino', null);
         app.SaveText("listRecents", listRecents.GetList(","), "listRecents.txt")
         app.SaveBoolean("isProtected", false, "isProtected.txt");
         return;
      }
      if (file.indexOf(".pde") > -1)
      {
         if (isEdtA == true)
         {
            edtA.SetText(app.ReadFile(file));
            return;
         }
         if (isEdtB == true)
         {
            edtB.SetText(app.ReadFile(file));
            return;
         }
         edtTxt.SetText(app.ReadFile(file));
         app.SaveText("currentFile", file, "currentFile.txt");
         spnSyntax.SetText('.java');
         listRecents.AddItem(file, '.pde', null);
         app.SaveText("listRecents", listRecents.GetList(","), "listRecents.txt")
         app.SaveBoolean("isProtected", false, "isProtected.txt");
         return;
      }
      if (file.indexOf(".md") > -1)
      {
         if (isEdtA == true)
         {
            edtA.SetText(app.ReadFile(file));
            return;
         }
         if (isEdtB == true)
         {
            edtB.SetText(app.ReadFile(file));
            return;
         }
         edtTxt.SetText(app.ReadFile(file));
         app.SaveText("currentFile", file, "currentFile.txt");
         spnSyntax.SetText('markdown');
         listRecents.AddItem(file, '.md', null);
         app.SaveText("listRecents", listRecents.GetList(","), "listRecents.txt")
         app.SaveBoolean("isProtected", false, "isProtected.txt");
         return;
      }
      else
      {
         dlgOpen = app.CreateDialog("Open File", "NoDim");
         optA = app.CreateButton("Open With ...");
         optA.SetOnTouch(function ()
         {
            var file = app.LoadText("currentFile", null, "currentFile.txt");
            listRecents.AddItem(file, 'other');
            app.SaveText("listRecents", listRecents.GetList(","), "listRecents.txt")
            app.OpenFile(file, "*/*");
            app.SaveText("currentFile", "", "currentFile.txt");
         });
         optB = app.CreateButton("Open");
         optB.SetOnTouch(function ()
         {
            var file = app.LoadText("currentFile", null, "currentFile.txt");
            edtTxt.SetText(app.ReadFile(file));
            app.SaveText("currentFile", file, "currentFile.txt");
            spnSyntax.SetText('Syntax');
            listRecents.AddItem(file, "other");
            app.SaveText("listRecents", listRecents.GetList(","), "listRecents.txt")
            dlgOpen.Hide();
         });
         layDlgOpen = app.CreateLayout("Linear", "VCenter");
         layDlgOpen.AddChild(optA);
         layDlgOpen.AddChild(optB);
         dlgOpen.AddLayout(layDlgOpen);
         dlgOpen.Show();
         app.SaveBoolean("isProtected", false, "isProtected.txt");
         return;
      }
   } //end.onFileChoose 

 //folderLister.js
    /*
    * Credit to John of the DS forums for all code within folderLister.js
    * Also a big thank you to him, as these methods are not only very
    * useful, but also crucial to the functionality of this app
    * Link:[https://grou//ps.google.com/d/msg/droidscriptpremium/J95-ER0xZ7I/7ZjoElG3AAAJ]
    */
function FolderLister(path)
   {
      this.SetPath(path);
   } //end.FolderLister
FolderLister.prototype.SetPath = function (path)
   {
      if (typeof path === "string")
      {
         if (path.charAt(0) === "/")
         {
            this.path = path;
         }
         else if (path === "..")
         {
            this.path = this.path.split("/").slice(0, -1).join("/") || "/sdcard";
         }
         else
         {
            this.path = this.path + "/" + path;
         }
         edt.SetText(this.path);
      }
      app.EnableBackKey(this.path === "/sdcard");
   } //end.FolderLister.SetPath
FolderLister.prototype.MakeList = function (options, textSize)
   {
      var FolderLister = this;
      this.options = options || "";
      textSize = textSize || 12;
      /*folders*/ //this.list = app.CreateList(app.ListFolder(this.path,null, null, this.options + ",folders"));
      /*all*/
      this.list = app.CreateList(app.ListFolder(this.path, null, null, this.options));
      this.list.SetTextSize(textSize);
      this.list.SetOnTouch(function (path)
      {
         /*Checks if folder or file*/
         var fileToOpen = edt.GetText() + "/" + path
         app.SaveText("wsDir", fileToOpen.substring(0, fileToOpen.lastIndexOf("/")), "wsDir.txt")
            //if a folder, then update folder list
         if (path.indexOf(".") <= -1)
         {
            FolderLister.SetPath(path);
            FolderLister.update();
         }
         // if a file, send path to file opening utility 
         else
         {
            if (app.FolderExists(fileToOpen))
            {
               FolderLister.SetPath(path);
               FolderLister.update();
            }
            else
            {
               app.CloseDrawer("left");
               onFileChoose(fileToOpen)
            }
         }
      });
      window.OnBack = function ()
      {
         FolderLister.SetPath("..")
         FolderLister.update();
      };
      window.update = function ()
      {
         FolderLister.update();
      };
      app.EnableBackKey(false);
      return this.list;
   } //end.FolderLister.MakeList
FolderLister.prototype.update = function ()
   {
      /*folders*/ //this.list.SetList(app.ListFolder(this.path, null, null, this.options + ",folders"));
      /*all*/
      this.list.SetList(app.ListFolder(this.path, null, null, this.options));
   } //end.FolderLister.update
FolderLister.prototype.uplvl = function ()
   {
      /*folders*/ //this.list.SetList(app.ListFolder(this.path, null, null, this.options + ",folders"));
      /*all*/
      this.list.SetList(app.ListFolder(this.path, null, null, this.options));
   } //end.FolderLister.uplvl
FolderLister.prototype.GetPath = function ()
   {
      return this.path
   } //end.FolderLister.GetPath
   
   //Touch.js 
function keys_OnTouch()
   {
      switch (this.icon)
      {
         case "[fa-undo]":
            edtTxt.Undo();
            break;
         case "[fa-close]":
            edtTxt.SetText(" ");
            break;
         case "[fa-copy]":
            edtTxt.Copy()
            break;
         case "[fa-paste]":
            edtTxt.Paste();
            break;
         case "[fa-arrows-alt]":
            edtTxt.SelectAll();
            break;
         case "[fa-play]":
            var syntax = spnSyntax.GetText();
            app.SaveBoolean("isDebug", false);
            run(syntax);
            break;
         case "[fa-lock]":
            if (!app.LoadBoolean("isLocked", false, "isLocked.txt"))
            {
               app.SaveBoolean("isLocked", true, "isLocked.txt");
               app.SaveBoolean("isConfig", false, "isConfig.txt");
               app.SetOrientation(app.GetOrientation());
               app.ShowPopup("🔐");
            }
            else
            {
               app.SaveBoolean("isLocked", false, "isLocked.txt");
               app.SaveBoolean("isConfig", true, "isConfig.txt");
               app.SetOrientation(null);
               app.ShowPopup("🔓");
            }
            break;
         case "[fa-repeat]":
            edtTxt.Redo();
            break;
         case "[fa-chrome]":
            browser.build()
            browser.laywebb.Animate("SlideFromTop");
            break;
         case "[fa-search]":
            edtTxt.Search(searchF.GetText());
            break;
         case "[fa-times-circle]":
            edtTxt.SetText("");
            break;
         case "[fa-exchange]":
            edtTxt.Search(searchF.GetText());
            edtTxt.Replace(searchR.GetText());
            break;
         case "[fa-cut]":
            edtTxt.Cut()
            break;
         case "[fa-save]":
            if (!(app.LoadBoolean("isProtected", false, "isProtected.txt")))
            {
               dlgSave = app.CreateDialog("are you sure?", "NoDim");
               layDlgSave = app.CreateLayout("Linear", "VCenter");
               //	layDlgSave.SetSize(.45, .27);
               optSaveA = app.CreateButton(" [fa-check] \n Save ", -1, null, "FontAwesome");
               optSaveA.SetOnTouch(function ()
               {
                  var file = app.LoadText("currentFile", null, "currentFile.txt");
                  app.WriteFile(file, app.ReadFile(file));
                  app.WriteFile(file, edtTxt.GetText());
                  dlgSave.Dismiss();
                  app.ShowPopup("Saved:" + " \n" + file);
                  return;
               });
               optSaveB = app.CreateButton(" [fa-window-close] \n Cancel ", -1, null, "FontAwesome");
               optSaveB.SetOnTouch(function ()
               {
                  dlgSave.Dismiss();
               });
               optSaveC = app.CreateButton(" [fa-file] \n Save As ", -1, null, "FontAwesome");
               optSaveC.SetOnTouch(function ()
               {
                  saveaspath = app.CreateTextEdit("/sdcard/");
                  laysaveas = app.CreateLayout("Linear", "Horizontal");
                  laysaveas.AddChild(saveaspath);
                  dlgsaveas = app.CreateDialog("", "NoDim");
                  btnsaveasdlg = app.CreateButton("save to path below");
                  laysaveas.AddChild(btnsaveasdlg);
                  dlgsaveas.AddLayout(laysaveas);
                  btnsaveasdlg.SetOnTouch(function ()
                  {
                     var pathSaveAs = saveaspath.GetText();
                     app.ShowPopup("(will) Save to path :" + saveaspath.GetText());
                  });
                  dlgsaveas.Show();
               });
               layDlgSave.AddChild(optSaveA);
               layDlgSave.AddChild(optSaveB);
               layDlgSave.AddChild(optSaveC);
               dlgSave.AddLayout(layDlgSave);
               dlgSave.Show();
            }
            break;
         case "[fa-share-alt]":
            app.SendText(edtTxt.GetText());
            break;
         case "[fa-bars]":
            app.OpenDrawer("left");
            break;
         case "[fa-folder-open]":
            var oldFile = app.LoadText("currentFile", null, "currentFile.txt");
            app.SaveText("lastFile", oldFile, "lastFile.txt");
            openFile()
            app.CloseDrawer("left");
            break;
         case "[fa-bug]":
            var syntax = spnSyntax.GetText();
            app.SaveBoolean("isDebug", true);
            run(syntax);
            break;
      } //end.switch
   } //end.keys_OnTouch
   
function keys_OnLTouch()
   {
      switch (this.icon)
      {
         case "[fa-save]":
            if (!(app.LoadBoolean("isProtected", false, "isProtected.txt")))
            {
               var file = app.LoadText("currentFile", null, "currentFile.txt");
               app.WriteFile(file, app.ReadFile(file));
               app.WriteFile(file, edtTxt.GetText());
               app.ShowPopup("Saved:" + " \n" + file);
            }
            break;
         case "[fa-play]":
            app.SaveBoolean("isDebug", false);
            run("quicksand")
            break;
         case "[fa-exchange]":
            edtTxt.ReplaceAll(searchF.GetText(), searchR.GetText());
            break
            return;
      } //end.switch
   } //end.keys_OnLTouch
   
   
   
 //picker.js 
function picker()
   {
      picker.buildUI = function ()
         {
            picker.layd = app.CreateLayout("linear");
            picker.layMake = app.CreateLayout("Linear", "Horizontal");
            picker.layd.AddChild(picker.layMake);
            picker.btnRecents = app.CreateButton("[fa-cubes] Recents", 0.45, null, "fontawesome");
            picker.btnRecents.SetOnTouch(function ()
            {
               var recents = app.LoadText("listRecents", null, "listRecents.txt")
               listRecents.SetOnTouch(function (title)
               {
                  app.CloseDrawer("left");
                  dlgRecents.Dismiss()
                  app.SaveText("currentFile", title, "currentFile.txt");
                  app.SaveText("oldListItemFile", title, "oldListItemFile.txt")
                  onFileChoose(title)
                  listRecents.RemoveItem(app.LoadText("oldListItemFile", null, "oldListItemFile.txt"));
               });
               listRecents.SetOnLongTouch(function (title)
               {
                  var clipBC = app.ReadFile(title);
                  app.SetClipboardText(clipBC);
                  app.ShowPopup("Copied: \n " + clipBC)
               });
               dlgRecents.Show();
            });
            picker.layMake.AddChild(picker.btnRecents);
            picker.btnOpen = app.CreateButton("[fa-folder-open] Open File", 0.45, null, "fontawesome");
            picker.btnOpen.SetOnTouch(function ()
            {
               var oldFile = app.LoadText("currentFile", null, "currentFile.txt");
               app.SaveText("lastFile", oldFile, "lastFile.txt");
               openFile()
               app.CloseDrawer("left");
            });
            picker.layMake.AddChild(picker.btnOpen);
            picker.layFCBar = app.CreateLayout("Linear", "Horizontal");
            picker.layd.AddChild(picker.layFCBar);
            picker.btnFileNewFC = app.CreateButton("[fa-file] Create File", 0.333, null, "fontawesome");
            picker.btnFileNewFC.SetOnTouch(function ()
            {
               if (txtFileNameFC.GetText().length != 0)
               {
                  var newFP = edt.GetText() + "/" + txtFileNameFC.GetText() + "." + txtFileType.GetText()
                  var extension = newFP.substring(newFP.lastIndexOf("."));
                  app.WriteFile(newFP, edtTxt.GetText());
                  app.ShowPopup("Created File: " + newFP);
                  /*refreshes file browser list @ current path*/
                  window.update()
                  app.SaveText("currentFile", newFP, "currentFile.txt");
                  /*debug*/ //app.ShowPopup("new cf is " + app.LoadText("currentFile", null, "currentFile.txt"))
                  drawer.SetPath(newFP);
                  titleBar.SetPath(newFP);
                  listRecents.AddItem(newFP);
                  app.SaveText("listRecents", listRecents.GetList(","), "listRecents.txt")
                     //var listr = app.LoadText("listRecents", null, "listRecents.txt");
                     //listRecents.SetList(listr, ",")
                  switch (extension)
                  {
                     //.js,.java,.php,.c,.cpp,.cs,.rb,.m,.py,.txt
                     case ".md":
                        app.SaveBoolean("isProtected", false, "isProtected.txt");
                        spnSyntax.SetText("markdown");
                        edtTxt.SetLanguage(".m");
                        break;
                     case ".txt":
                        app.SaveBoolean("isProtected", false, "isProtected.txt");
                        spnSyntax.SetText("text");
                        edtTxt.SetLanguage(".txt");
                        break;
                     case ".text":
                        app.SaveBoolean("isProtected", false, "isProtected.txt");
                        spnSyntax.SetText("text");
                        edtTxt.SetLanguage(".text");
                        break;
                     case ".html":
                        app.SaveBoolean("isProtected", false, "isProtected.txt");
                        spnSyntax.SetText("html");
                        edtTxt.SetLanguage(".html");
                        break;
                     case ".css":
                        app.SaveBoolean("isProtected", false, "isProtected.txt");
                        spnSyntax.SetText("css");
                        edtTxt.SetLanguage(".html");
                        break;
                     case ".php":
                        app.SaveBoolean("isProtected", false, "isProtected.txt");
                        spnSyntax.SetText("php");
                        edtTxt.SetLanguage(".js");
                        break;
                     case ".js":
                        app.SaveBoolean("isProtected", false, "isProtected.txt");
                        spnSyntax.SetText("javascript");
                        edtTxt.SetLanguage(".js");
                        break;
                     case ".java":
                        app.SaveBoolean("isProtected", false, "isProtected.txt");
                        spnSyntax.SetText("java");
                        edtTxt.SetLanguage(".java");
                        break;
                     case ".class":
                        app.SaveBoolean("isProtected", false, "isProtected.txt");
                        spnSyntax.SetText("java");
                        edtTxt.SetLanguage(".java");
                        break;
                     case ".py":
                        app.SaveBoolean("isProtected", false, "isProtected.txt");
                        spnSyntax.SetText("python");
                        edtTxt.SetLanguage(".py");
                        break;
                     case ".c":
                        app.SaveBoolean("isProtected", false, "isProtected.txt");
                        spnSyntax.SetText("c");
                        edtTxt.SetLanguage(".c");
                        break;
                     case ".rb":
                        app.SaveBoolean("isProtected", false, "isProtected.txt");
                        spnSyntax.SetText("ruby");
                        edtTxt.SetLanguage(".rb");
                        break;
                     case ".ino":
                        app.SaveBoolean("isProtected", false, "isProtected.txt");
                        spnSyntax.SetText("arduino");
                        edtTxt.SetLanguage(".cpp");
                        break;
                     case ".pde":
                        app.SaveBoolean("isProtected", false, "isProtected.txt");
                        spnSyntax.SetText("arduino");
                        edtTxt.SetLanguage(".cpp");
                        break;
                     default:
                        app.SaveBoolean("isProtected", false, "isProtected.txt");
                        spnSyntax.SetText("Syntax");
                        edtTxt.SetLanguage(".txt");
                        break;
                  }
               }
            });
            picker.layFCBar.AddChild(picker.btnFileNewFC);
            picker.btnTmplNewFC = app.CreateButton("[fa-sitemap] Templates", 0.333, null, "fontawesome");
            picker.btnTmplNewFC.SetOnTouch(function ()
            {
               app.ShowPopup("tbd");
            });
            picker.layFCBar.AddChild(picker.btnTmplNewFC);
            picker.btnFldrNewFC = app.CreateButton("[fa-folder] Create Folder", 0.333, null, "fontawesome");
            picker.btnFldrNewFC.SetOnTouch(function ()
            {
               if (txtFileNameFC.GetText().length != 0)
               {
                  app.MakeFolder(edt.GetText() + "/" + txtFileNameFC.GetText());
                  alert("Created Folder:" + edt.GetText() + "/" + txtFileNameFC.GetText());
                  /*refreshes file browser list @ current path*/
                  window.update()
               }
            });
            picker.layFCBar.AddChild(picker.btnFldrNewFC);
            barnf = app.CreateLayout("Linear", "Horizontal");
            picker.layd.AddChild(barnf);
            labelDot = app.CreateText(".");
            txtFileNameFC = app.CreateTextEdit("", 0.45, null, "singleline,nospell,autosize,autoselect");
            txtFileNameFC.SetHint("File/Folder");
            barnf.AddChild(txtFileNameFC);
            barnf.AddChild(labelDot);
            txtFileType = app.CreateTextEdit("", .225, -1, "singleline,nospell,autosize,autoselect");
            txtFileType.SetHint("ext");
            spnFileType = app.CreateSpinner("txt,js,html,css,json,dat,temp,py,md,java,php,ino,pde,c,h,class,rb,source", 0.225, -1);
            spnFileType.SetOnChange(function (item)
            {
               //to strip off ".ext" from filename
               //var tftCurrent = txtFileType.GetText().substring(txtFileType.GetText().lastIndexOf(".")+1); 
               txtFileType.SetText(item);
            });
            barnf.AddChild(txtFileType);
            barnf.AddChild(spnFileType);
            edt = app.CreateText("");
            picker.layd.AddChild(edt);
            picker.lay = app.CreateLayout("linear");
            picker.lay.AddChild(picker.layd)
         } //end picker.BuildUI
      picker.init = function ()
         {
            var pathWorkspace = app.LoadText("wsDir", null, "wsDir.txt");
            var fld = new FolderLister(pathWorkspace);
            var list = fld.MakeList("alphasort")
            list.SetOnLongTouch(function (title)
            {
               var pathDelete = edt.GetText() + "/" + title
               dlg = app.CreateYesNoDialog("Delete: " + title + " ?");
               dlg.SetOnTouch(function (item)
               {
                  if (item == "Yes")
                  {
                     app.ShowPopup("Deleted: " + pathDelete);
                     app.DeleteFolder(pathDelete);
                     window.update()
                  }
                  if (item == "No")
                  {
                     app.ShowPopup("no");
                  }
               });
               dlg.Show();
            });
            picker.lay.AddChild(list);
            return picker.lay
         } //end picker.init
   } //end.picker 
 
 
function hwShorts()
{
   app.SetOnKey(function (action, name)
   {
      //debug
      //app.ShowPopup( action + " " + name );
      if (name == "VOLUME_DOWN" && action == "Down")
      {
         edtTxt.SetCursorPos(edtTxt.GetCursorPos() - 1)
      }
      if (name == "VOLUME_UP" && action == "Down")
      {
         edtTxt.SetCursorPos(edtTxt.GetCursorPos() + 1)
      }
   });
}
var keybar = new extraKeyBar
var isEdtA = false;
var isEdtB = false;
app.SaveBoolean("isDebug", false);
if (!app.LoadBoolean("isLocked", false, "isLocked.txt"))
{
   app.SetOrientation(app.GetOrientation());
   app.ShowPopup("🔐");
}
else
{
   app.ShowPopup("🔓");
}
 
 
//mdParser.js 
function mdParser(title, bodyTxt)
   {
      this.title = title;
      this.bodyTxt = bodyTxt;
      this.GetHtml = function ()
         {
            var a = '<!DOCTYPE html>';
            a += '<html>';
            a += '<title>';
            var b = '</title>';
            b += '<meta charset="utf-8">'
            b += '<xmp theme="cerulean" style="display:none;">'
            var c = '</xmp>';
            c += '<script src="build/strapdown.min.js"></script>';
            c += '</html>';
            return a + this.title + b + this.bodyTxt + c;
         } //end mdParser.GetHtml
   } //end.mdParser

 //multiEdit.js 
function multiEdit()
   {
      this.init = function ()
      {
         layA = app.CreateLayout("linear", "VCenter,fillx");
         edtA = app.CreateCodeEdit("isEdtA", 1, .36);
         edtA.SetOnDoubleTap(function ()
         {
            edtA.Paste()
         });
         edtB = app.CreateCodeEdit("isEdtB", 1, .36);
         edtB.SetLanguage("markdown")
         edtB.SetOnDoubleTap(function ()
         {
            edtB.Paste()
         });
         barO = app.CreateLayout("linear", "horizontal,fillx");
         barO.SetBackColor("#2c2b2a");
         btnInsertA = app.CreateButton("insertA");
         btnInsertA.SetOnTouch(function ()
         {
            edtTxt.InsertText(edtA.GetText())
         });
         btnInsertB = app.CreateButton("insertB");
         btnInsertB.SetOnTouch(function ()
         {
            edtTxt.InsertText(edtB.GetText())
         });
         btnA = app.CreateButton("openA");
         btnA.SetOnTouch(function ()
         {
            var oldFile = app.LoadText("currentFile", null, "currentFile.txt");
            app.SaveText("lastFile", oldFile, "lastFile.txt");
            isEdtA = true
            isEdtB = false
            openFile()
         });
         btnB = app.CreateButton("openB");
         btnB.SetOnTouch(function ()
         {
            var oldFile = app.LoadText("currentFile", null, "currentFile.txt");
            app.SaveText("lastFile", oldFile, "lastFile.txt");
            isEdtA = false
            isEdtB = true
            openFile()
         });
         barO.AddChild(btnInsertA);
         barO.AddChild(btnA);
         barO.AddChild(btnB);
         barO.AddChild(btnInsertB);
         layA.AddChild(edtA);
         layA.AddChild(barO);
         layA.AddChild(edtB);
         return layA
      }
   } //end.multiEdit 
 
 
//Initial Configurations
function opts()
   {
      opts.GetPlugins = function ()
      {
         return app.ReadFile("plugins.txt")
      }
      opts.LoadPlugins = function (list, debug)
      {
         opts.pluginlist = list.split(",")
         for (var i in opts.pluginlist)
         {
            app.LoadPlugin(opts.pluginlist[i]);
            if (debug)
            {
               app.Debug(opts.pluginlist[i].toString())
            }
         }
         return;
      }
      opts.GetScripts = function (lstDel)
      {
         opts.scriptlist = app.ListFolder(app.GetAppPath(), ".js")
         for (var i in lstDel)
         {
            opts.removeitems(opts.scriptlist, lstDel[i]);
         }
         return opts.scriptlist
      }
      opts.LoadScripts = function (remove, toFront, debug)
      {
         opts.scriptlist = opts.GetScripts(remove);
         //move to front (to avoid some sort of syncronization error that occurs)
         if (toFront.length > 0)
         {
            var arr = toFront.split(",");
            for (var i in arr)
            {
               opts.scriptlist.unshift(arr[i]);
            }
         }
         for (var i in opts.scriptlist)
         {
            app.Script(opts.scriptlist[i]);
            if (debug)
            {
               app.Debug(opts.scriptlist[i].toString())
            }
         }
         return;
      }
      opts.removeitems = function (arr)
      {
         var what, a = arguments,
            L = a.length,
            ax;
         while (L > 1 && arr.length)
         {
            what = a[--L];
            while ((ax = arr.indexOf(what)) !== -1)
            {
               arr.splice(ax, 1);
            }
         }
         return arr;
      }
      opts.config = function ()
         {
            _AddPermissions("Share,Storage,Accounts,Network");
            //app.SetOrientation( "portrait" );
            app.EnableBackKey(false);
            app.DisableKeys('VOLUME_DOWN,VOLUME_UP');
            //Scripts and Plugins
           // opts.LoadPlugins(opts.GetPlugins(), true);
   
            web = app.CreateWebView(1, 0.955, "IgnoreErrors,AllowZoom");
            webd = app.CreateDialog("", "NoDim,NoTitle");
            layWeb = app.CreateLayout("frame");
            layWeb.SetSize(1, 1);
            layWeb.SetBackColor("#CC2c2b2a");
            ll = app.CreateLayout("linear", "VTop");
            ll.AddChild(web);
            layWeb.AddChild(ll);
            layNav = app.CreateLayout("linear", "Horizontal,HCenter,FillXY");
            layNav.SetSize(1, .045);
            btnClose = app.CreateButton("[fa-window-close]", (1 / 6), -1, "GrayButton,FontAwesome");
            btnBack = app.CreateButton("[fa-arrow-left]", (1 / 6), -1, "GrayButton,FontAwesome");
            btnForward = app.CreateButton("[fa-arrow-right]", (1 / 6), -1, "GrayButton,FontAwesome");
            btnReload = app.CreateButton("[fa-refresh]", (1 / 6), -1, "GrayButton,FontAwesome");
            btnRemote = app.CreateButton("[fa-external-link]", (1 / 6), -1, "GrayButton,FontAwesome");
            btnPrint = app.CreateButton("[fa-print]", (1 / 6), -1, "GrayButton,FontAwesome");
            btnBack.SetOnTouch(function ()
            {
               web.Back();
            });
            btnForward.SetOnTouch(function ()
            {
               web.Forward();
            });
            btnReload.SetOnTouch(function ()
            {
               web.Reload();
            });
            btnClose.SetOnTouch(function ()
            {
               webd.Hide();
            });
            btnRemote.SetOnTouch(function ()
            {
               var cf = app.LoadText("currentFile", null, "currentFile.txt")
               var cext = cf.substring(cf.lastIndexOf(".") + 1, cf.length)
               if (web.GetUrl() != "about:blank")
               {
                  if (cext.indexOf("htm") > -1)
                  {
                     app.OpenUrl(web.GetUrl())
                  }
               }
               else
               {
                  app.OpenFile(app.LoadText("currentFile", web.GetUrl(), "currentFile.txt"))
               }
            });
            btnPrint.SetOnTouch(function ()
            {
               web.Print()
            });
            layNav.AddChild(btnClose);
            layNav.AddChild(btnBack);
            layNav.AddChild(btnForward);
            layNav.AddChild(btnReload);
            layNav.AddChild(btnRemote);
            layNav.AddChild(btnPrint);
            ll.AddChild(layNav);
            layWeb.AddChild(ll);
            webd.AddLayout(layWeb);
            opts.dlgWs = app.CreateDialog("Set Workspace Path", "");
            opts.pathDat = app.LoadText("pathDat", "/sdcard/Protoeditor", "pathDat.txt")
            opts.txtWs = app.CreateTextEdit(opts.pathDat)
            opts.btnWsY = app.CreateButton("Ok");
            opts.btnWsN = app.CreateButton("Cancel");
            opts.btnWsY.SetOnTouch(function ()
            {
               app.ShowProgress("Copying Files to\: \n " + opts.txtWs.GetText());
               app.SaveText("pathDat", opts.txtWs.GetText(), "pathDat.txt");
               app.ExtractAssets("Misc/databackup", (opts.txtWs.GetText() + "/").replace("\/\/", "\/"), true);
               app.ShowProgress((opts.txtWs.GetText() + "/").replace("\/\/", "\/"))
               app.ExtractAssets("Misc/build", (opts.txtWs.GetText() + "/build").replace("\/\/", "\/"), true);
               app.ShowProgress((opts.txtWs.GetText() + "/build").replace("\/\/", "\/"))
               app.SaveBoolean("assetsExt", true, "assetsExt.txt");
               app.HideProgress();
               opts.dlgWs.Dismiss();
            });
            opts.btnWsN.SetOnTouch(function ()
            {
               opts.dlgWs.Dismiss();
            });
            opts.layWs = app.CreateLayout("Linear", "VTop");
            opts.layWs.AddChild(opts.txtWs);
            opts.layWs.AddChild(opts.btnWsY);
            opts.layWs.AddChild(opts.btnWsN);
            opts.dlgWs.AddLayout(opts.layWs);
            return;
         } //end opts.config
      opts.extract = function ()
         {
            //app.SaveText("pathDat", pathDat, "pathDat.txt");
            //app.SaveBoolean("assetsExt", false, "assetsExt.txt");
            //	app.HideProgress();
            if (!app.LoadBoolean("assetsExt", false, "assetsExt.txt"))
            {
               opts.dlgWs.Show();
               app.SaveBoolean("assetsExt", true, "assetsExt.txt");
            }
            new browser();
            pathDocs = app.CreateText("");
            pathData = app.CreateText("");
            pathDocs.SetText(app.LoadText("wspaceSave", null, "wspaceSave.txt"))
            pathData.SetText(app.LoadText("pathDat", null, "pathDat.txt"))
            return;
         } //end opts.extract
   } //end opts
function hwShorts()
{
   app.SetOnKey(function (action, name)
   {
      /*debug*/ //app.ShowPopup( action + " " + name );
      if (name == "VOLUME_DOWN" && action == "Down")
      {
         edtTxt.SetCursorPos(edtTxt.GetCursorPos() - 1)
      }
      if (name == "VOLUME_UP" && action == "Down")
      {
         edtTxt.SetCursorPos(edtTxt.GetCursorPos() + 1)
      }
   });
}
var keybar = new extraKeyBar
var isEdtA = false;
var isEdtB = false;
app.SaveBoolean("isDebug", false);
if (!app.LoadBoolean("isLocked", false, "isLocked.txt"))
{
   app.SetOrientation(app.GetOrientation());
   app.ShowPopup("🔐");
}
else
{
   app.ShowPopup("🔓");
}
 
  
 //run.js 
function run(syntax)
   {
      switch (syntax)
      {
         case "Syntax:":
            app.SaveBoolean("isProtected", false, "isProtected.txt");
            break;
         case "markdown":
            var md = new mdParser("ProtoEditor", edtTxt.GetText());
            var html = md.GetHtml();
            web.ClearHistory();
            web.LoadHtml(html);
            webd.Show();
            break;
         case "quicksand":
            var txt = edtTxt.GetText();
            var fileTmp = app.LoadText("pathDat", null, "pathDat.txt") + "/" + "tmp.js"
            app.WriteFile(fileTmp, edtTxt.GetText());
            app.StartApp(fileTmp);
            break;
         case "javascript":
            var txt = edtTxt.GetText();
            var fileJs = app.LoadText("currentFile", null, "currentFile.txt");
            if (!app.LoadBoolean("isDebug"))
            {
               app.StartApp(fileJs);
            }
            if (app.LoadBoolean("isDebug"))
            {
               app.StartApp(fileJs, "debug,overlay");
            }
            break;
         case "python":
            var filePy = app.LoadText("currentFile", null, "currentFile.txt");
            app.OpenFile(filePy, ".py");
            break;
         case "html":
            var txt = edtTxt.GetText();
            web.ClearHistory();
            web.LoadHtml(edtTxt.GetText());
            webd.Show()
            break;
         case "php":
            app.SaveBoolean("isProtected", false, "isProtected.txt");
            var txt = edtTxt.GetText();
            web.ClearHistory();
            web.LoadHtml(edtTxt.GetText());
            webd.Show()
            break;
         case "image":
            app.SaveBoolean("isProtected", true, "isProtected.txt");
            var imgTmp = app.LoadText("currentFile", null, "currentFile.txt");
            app.OpenFile(imgTmp, "image");
            break;
         case "video":
            app.SaveBoolean("isProtected", true, "isProtected.txt");
            var vidTmp = app.LoadText("currentFile", null, "currentFile.txt");
            app.OpenFile(vidTmp, "video");
            break;
         case "audio":
            app.SaveBoolean("isProtected", true, "isProtected.txt");
            var audTmp = app.LoadText("currentFile", null, "currentFile.txt");
            app.OpenFile(audTmp, "audio");
            break;
         case "pdf":
            app.SaveBoolean("isProtected", true, "isProtected.txt");
            var pdfTmp = app.LoadText("currentFile", null, "currentFile.txt");
            app.OpenFile(pdfTmp, "document");
            break;
      } //end switch
      return;
   } //end.run 
 
    
   //setTheme.js 
function setTheme()
   {
      theme = app.CreateTheme("Dark");
      theme.SetDimBehind(false);
      theme.SetButtonStyle("#353535", "#161616", 2, "#2c2b2a", 0, 1, "#978873");
      theme.AdjustColor(35, 0, -10);
      theme.SetBtnTextColor("white");
      theme.SetButtonOptions("custom");
      theme.SetBackColor("#2c2b2a");
      theme.SetCheckBoxOptions("dark");
      theme.SetTextEditOptions("NoDim");
      theme.SetDialogColor("#2c2b2a");
      theme.SetDialogBtnColor("#2c2b2a");
      theme.SetDialogBtnTxtColor("white");
      app.SetTheme(theme);
   } //end.setTheme 
  
  
 //Tabs object.
function _Tabs(list, width, height, options)
   {
      var lst = list.split(",");
      this.tabs = [];
      var curTabName = null;
      //Disable debug during creation.
      app.SetDebugEnabled(false);
      //Create main layout.
      this.lay = app.CreateLayout("Linear", "VCenter");
      this.lay.SetBackColor("#2c2b2a");
      this.lay.SetSize(width, height);
      this.lay.OnChange = null;
      this.lay.parent = this;
      //Create top (tab strip) layout.
      this.layTop = app.CreateLayout("Linear", "Horizontal");
      this.layTop.SetBackColor("#ff000000");
      this.lay.AddChild(this.layTop);
      //Create body layout.
      this.layBody = app.CreateLayout("Frame", "");
      this.layBody.SetSize(width, height - .063);
      this.lay.AddChild(this.layBody);
      //Add a tab.
      this.AddTab = function (name)
         {
            app.SetDebugEnabled(false);
            this.layTab = app.CreateLayout("Linear", "Vertical,VCenter");
            this.layTab.SetBackColor("#2c2b2a");
            this.layTab.SetMargins(0, 0, 0.002, 0);
            this.layTab.SetSize(width / lst.length, -1);
            this.txtTab = app.CreateText(name, width / lst.length, .063, "FillXY,Bold");
            this.txtTab.SetFontFile("Misc/line-awesome.ttf");
            this.txtTab.SetBackground("/Sys/Img/TabLowWideAlt.png");
            this.txtTab.SetPadding(0, 0.015, 0, 0);
            this.txtTab.SetOnTouch(_Tabs_OnTouch);
            this.txtTab.tabs = this;
            this.layTab.AddChild(this.txtTab);
            this.layTop.AddChild(this.layTab);
            //Save array of tab info.
            this.tabs[name] = {
               txt: this.txtTab,
               content: null
            };
            //Add tab content layout to body.
            this.tabs[name].content = app.CreateLayout("Linear", "fillxy" + options);
            this.layBody.AddChild(this.tabs[name].content);
            app.SetDebugEnabled(true);
         }
         //Set tab change callback.
      this.lay.SetOnChange = function (cb)
         {
            this.OnChange = cb;
         }
         //Return layout for given tab.
      this.lay.GetLayout = function (name)
         {
            return this.parent.tabs[name].content;
         }
         //Set current tab.
      this.lay.ShowTab = function (name)
         {
            app.SetDebugEnabled(false);
            //Drop out if no change.
            if (curTabName == name)
            {
               app.SetDebugEnabled(true);
               return;
            }
            curTabName = name;
            //Get tab info.
            var tab = this.parent.tabs[name];
            if (!tab)
            {
               app.SetDebugEnabled(true);
               return;
            }
            //Clear all tab selections.
            for (var tb in this.parent.tabs)
            {
               this.parent.tabs[tb].txt.SetBackground("Img/TabHighWideSmall.png");
               this.parent.tabs[tb].content.SetVisibility("Hide");
            }
            //Select chosen tab.
            tab.txt.SetBackground("Img/TabLowWideSmall.png");
            tab.content.SetVisibility("Show");
            app.SetDebugEnabled(true);
            //Fire callback if set.
            if (this.OnChange)
               this.OnChange(name);
         }
         //Add tabs.
      for (var i = 0; i < lst.length; i++)
      {
         this.AddTab(lst[i]);
      }
      //Set default tab.
      this.lay.ShowTab(lst[0]);
      //Re-enable debug.
      app.SetDebugEnabled(true);
      //Return main layout to caller.
      return this.lay;
   } //end.Tabs
   //Handle tab clicks.
function _Tabs_OnTouch(ev)
   {
      if (ev.action == "Down")
      {
         app.SetDebugEnabled(false);
         var txt = ev.source;
         txt.tabs.lay.ShowTab(txt.GetText());
         app.SetDebugEnabled(true);
      }
   } //end.TabsOnTouch 

   
   
   
   //titleBar.js
function titleBar()
   {
      //titlebar.constructors
      titleBar.CreateTitleBar = function (titleText, textTitleSize)
         {
            titleBar.titleText = titleText || "ProtoEditor"
            titleBar.titleTextSize = textTitleSize || 12
            titleBar.layMain = app.CreateLayout("Linear", "Vertical,Left");
            titleBar.layMain.SetGravity("VCenter,HCenter");
            titleBar.txtTitle = app.CreateText(titleBar.titleText);
            titleBar.txtTitle.SetTextSize(titleBar.titleTextSize);
            titleBar.layA = app.CreateLayout("Linear", "Horizontal");
            titleBar.layB = app.CreateLayout("Linear", "Horizontal");
            titleBar.layTitle = app.CreateLayout("linear", "horizontal");
            titleBar.layTitle.SetGravity("Left");
            titleBar.scrTitle = app.CreateScroller(null, null, "NoScrollBars");
            titleBar.txtPath = app.CreateText(titleBar.textPath || "/");
            titleBar.layA.AddChild(titleBar.txtTitle);
            titleBar.layB.AddChild(titleBar.txtPath);
            titleBar.layTitle.AddChild(titleBar.layA);
            titleBar.scrTitle.AddChild(titleBar.layB);
            titleBar.layTitle.AddChild(titleBar.scrTitle);
            titleBar.layMain.AddChild(titleBar.layTitle);
            return titleBar.layMain
         } //titleBar.CreateTitleBar
      titleBar.SetStyle = function (height, alpha, colorBGTitle, colorTxtTitle, colorTxtPath, colorBGPath, textPathSize)
         {
            titleBar.height = height || -1
            titleBar.alpha = alpha || titleBar.alpha || 1.0
            titleBar.colorBGTitle = colorBGTitle
            titleBar.colorTxtTitle = colorTxtTitle
            titleBar.colorTxtPath = colorTxtPath
            titleBar.colorBGPath = colorBGPath
            titleBar.textPathSize = textPathSize || 12
            titleBar.layTitle.SetBackColor(titleBar.colorBGTitle);
            titleBar.txtPath.SetTextSize(titleBar.textPathSize)
            titleBar.txtTitle.SetBackColor(titleBar.colorBGTitle);
            titleBar.txtTitle.SetTextColor(titleBar.colorTxtTitle);
            titleBar.txtTitle.SetBackAlpha(titleBar.alpha);
            titleBar.layMain.SetBackColor(titleBar.colorBGMain);
            titleBar.txtPath.SetTextColor(titleBar.colorTxtPath);
            titleBar.txtPath.SetBackAlpha(titleBar.alpha);
            return;
         } //titleBar.SetStyle
      titleBar.SetPath = function (path)
         {
            this.path = path || titleBar.path
            titleBar.txtPath.SetText(this.path);
            return;
         } //end titleBar.SetPath
      titleBar.GetPath = function (path)
         {
            return titleBar.txtPath.GetText();
         } //end titleBar.GetPath
   } //end titleBar()
  
  //------------------------------------------------------------------------
//audioPlayer.js 
//------------------------------------------------------------------------
function audioPlayer() {
      audioPlayer.fileName = this.fileName || "";
      audioPlayer.format = this.format || "";
      audioPlayer.type = this.type || "";
      this.CreateAudioPlayer = function() {
            audioPlayer.mediaplayer = app.CreateMediaPlayer();
            audioPlayer.mediaplayer.SetFile(audioPlayer.fileName);
            audioPlayer.layoutControls = app.CreateLayout("linear", "Horizontal,FillXY");
            audioPlayer.layoutControls.SetGravity("HCenter");
            audioPlayer.mainLayout = app.CreateLayout("linear", "Vertical");
            audioPlayer.btnReset = app.CreateButton("[fa-step-backward]", -1, -1, "FontAwesome");
            audioPlayer.btnReset.SetOnTouch(function() {
               audioPlayer.btnstouch("reset")
            });
            audioPlayer.btnRewind = app.CreateButton("[fa-backward]", -1, -1, "FontAwesome");
            audioPlayer.btnRewind.SetOnTouch(function() {
               audioPlayer.btnstouch("rewind")
            });
            audioPlayer.btnPlay = app.CreateButton("[fa-play]", -1, -1, "FontAwesome");
            audioPlayer.btnPlay.SetOnTouch(function() {
               audioPlayer.btnstouch("play")
            });
            audioPlayer.btnPause = app.CreateButton("[fa-pause]", -1, -1, "FontAwesome");
            audioPlayer.btnPause.SetOnTouch(function() {
               audioPlayer.btnstouch("pause")
            });
            audioPlayer.btnStop = app.CreateButton("[fa-stop]", -1, -1, "FontAwesome");
            audioPlayer.btnStop.SetOnTouch(audioPlayer.btnsontouch);
            audioPlayer.btnStop.SetOnTouch(function() {
               audioPlayer.btnstouch("stop")
            });
            audioPlayer.btnFastForward = app.CreateButton("[fa-forward]", -1, -1, "FontAwesome");
            audioPlayer.btnFastForward.SetOnTouch(function() {
               audioPlayer.btnstouch("forward")
            });
            audioPlayer.btn = app.CreateButton("[fa-forward]", -1, -1, "FontAwesome");
            audioPlayer.btnFastForward.SetOnTouch(function() {
               audioPlayer.btnstouch("forward")
            });
            audioPlayer.btnFastForward = app.CreateButton("[fa-forward]", -1, -1, "FontAwesome");
            audioPlayer.btnFastForward.SetOnTouch(function() {
               audioPlayer.btnstouch("forward")
            });
            audioPlayer.btnLoad = app.CreateButton("[fa-folder-open]", -1, -1, "FontAwesome");
            audioPlayer.btnLoad.SetOnTouch(function() {
               audioPlayer.btnstouch("load");
            });
            audioPlayer.duration = audioPlayer.mediaplayer.GetDuration()
            audioPlayer.barSeek = app.CreateSeekBar(1, -1);
            audioPlayer.barSeek.SetRange(1.0);
            audioPlayer.barSeek.SetOnTouch(function() {
               audioPlayer.btnstouch("seek");
            });
            audioPlayer.trackInfoLabel = app.CreateList("Track Info:");
            audioPlayer.trackInfoLabel.SetEnabled(false)
            audioPlayer.trackInfo = app.CreateText("");
            audioPlayer.trackInfo.SetTextSize(14.4)
            audioPlayer.trackFormatLabel = app.CreateList("Track Format:");
            audioPlayer.trackFormatLabel.SetEnabled(false);
            audioPlayer.trackFormat = app.CreateText("");
            audioPlayer.trackFormat.SetTextSize(14.4)
            audioPlayer.layoutControls.AddChild(audioPlayer.btnReset);
            audioPlayer.layoutControls.AddChild(audioPlayer.btnRewind);
            audioPlayer.layoutControls.AddChild(audioPlayer.btnPlay);
            audioPlayer.layoutControls.AddChild(audioPlayer.btnPause);
            audioPlayer.layoutControls.AddChild(audioPlayer.btnStop);
            audioPlayer.layoutControls.AddChild(audioPlayer.btnFastForward);
            audioPlayer.mainLayout.AddChild(audioPlayer.layoutControls);
            audioPlayer.layoutControls.AddChild(audioPlayer.btnLoad);
            audioPlayer.mainLayout.AddChild(audioPlayer.barSeek);
            audioPlayer.mainLayout.AddChild(audioPlayer.trackInfoLabel);
            audioPlayer.mainLayout.AddChild(audioPlayer.trackInfo);
            audioPlayer.mainLayout.AddChild(audioPlayer.trackFormatLabel);
            audioPlayer.mainLayout.AddChild(audioPlayer.trackFormat)
            audioPlayer.dialog = app.CreateDialog("", "NoTitle");
            audioPlayer.dialog.SetOnBack(function() {
               audioPlayer.dialog.Dismiss();
               audioPlayer.mediaplayer.Stop();
               audioPlayer.dialog.Gone();
            });
            audioPlayer.dialog.AddLayout(audioPlayer.mainLayout);
         } //end audioPlayer.CreateAudioPlayer
      this.Show = function() {
            audioPlayer.dialog.Show();
         } //end audioPlayer.Show
      audioPlayer.update = function() {
            if (audioPlayer.mediaplayer.GetDuration()) {
               audioPlayer.barSeek.SetValue(audioPlayer.mediaplayer.GetPosition() / audioPlayer.mediaplayer.GetDuration());
            }
         } //end audioPlayer.update
      this.LoadAudio = function(fileName) {
            audioPlayer.mediaplayer.SetFile(fileName);
            var trackFormat = fileName.substring(fileName.lastIndexOf(".") + 1)
            var trackName = fileName.substring(fileName.lastIndexOf("/") + 1, fileName.lastIndexOf("."))
            audioPlayer.trackInfo.SetText(trackName);
            audioPlayer.trackFormat.SetText(trackFormat);
            audioPlayer.mediaplayer.Play();
         } //end audioPlayer.LoadAudio
      this.PlayAudio = function() {
            audioPlayer.mediaplayer.Play();
         } //end audioPlayer.PlayAudio
      audioPlayer.btnstouch = function(title) {
            switch (title) {
               case "reset":
                  audioPlayer.mediaplayer.SeekTo(0);
                  break;
               case "rewind":
                  audioPlayer.mediaplayer.SeekTo(audioPlayer.mediaplayer.GetPosition() - 30);
                  break;
               case "play":
                  audioPlayer.mediaplayer.Play();
                  break;
               case "pause":
                  audioPlayer.mediaplayer.Pause();
                  break;
               case "stop":
                  audioPlayer.mediaplayer.Stop();
                  break;
               case "forward":
                  audioPlayer.mediaplayer.SeekTo(audioPlayer.mediaplayer.GetPosition() + 30);
                  break;
               case "load":
                  app.ChooseFile(null, "", function(fileName) {
                     audioPlayer.mediaplayer.SetFile(fileName);
                     var trackFormat = fileName.substring(fileName.lastIndexOf(".") + 1)
                     var trackName = fileName.substring(fileName.lastIndexOf("/") + 1, fileName.lastIndexOf("."))
                     audioPlayer.trackInfo.SetText(trackName);
                     audioPlayer.trackFormat.SetText(trackFormat);
                     audioPlayer.mediaplayer.Play();
                  })
                  break;
               case "seek":
                  audioPlayer.mediaplayer.SeekTo(audioPlayer.mediaplayer.GetDuration() * audioPlayer.barSeek.GetValue());
                  setInterval("audioPlayer.update()", 1000);
                  break;
            } //end.switch
         } //end audioPlayer.btnstouch
   } //audioPlayer.end 
//------------------------------------------------------------------------
//videoPlayer.js 
//------------------------------------------------------------------------
function videoPlayer() {
      videoPlayer.fileName = this.fileName || ""
      videoPlayer.format = this.format || ""
      videoPlayer.type = this.type || ""
      this.LoadVideo = function(fileName) {
         this.fileName = fileName || videoPlayer.fileName
         videoPlayer.mediaplayer.SetFile(this.fileName)
      }
      this.PlayVideo = function() {
         videoPlayer.mediaplayer.Play();
      }
      this.CreateVideoPlayer = function() {
            videoPlayer.mediaplayer = app.CreateVideoView(1, -1);
            videoPlayer.mediaplayer.SetFile(videoPlayer.fileName);
            videoPlayer.layoutControls = app.CreateLayout("linear", "Horizontal,FillXY");
            videoPlayer.layoutControls.SetGravity("HCenter");
            videoPlayer.mainLayout = app.CreateLayout("linear", "Vertical");
            videoPlayer.btnReset = app.CreateButton("[fa-step-backward]", -1, -1, "FontAwesome");
            videoPlayer.btnReset.SetOnTouch(function() {
               videoPlayer.btnstouch("reset")
            });
            videoPlayer.btnRewind = app.CreateButton("[fa-backward]", -1, -1, "FontAwesome");
            videoPlayer.btnRewind.SetOnTouch(function() {
               videoPlayer.btnstouch("rewind")
            });
            videoPlayer.btnPlay = app.CreateButton("[fa-play]", -1, -1, "FontAwesome");
            videoPlayer.btnPlay.SetOnTouch(function() {
               videoPlayer.btnstouch("play")
            });
            videoPlayer.btnPause = app.CreateButton("[fa-pause]", -1, -1, "FontAwesome");
            videoPlayer.btnPause.SetOnTouch(function() {
               videoPlayer.btnstouch("pause")
            });
            videoPlayer.btnStop = app.CreateButton("[fa-stop]", -1, -1, "FontAwesome");
            videoPlayer.btnStop.SetOnTouch(videoPlayer.btnsontouch);
            videoPlayer.btnStop.SetOnTouch(function() {
               videoPlayer.btnstouch("stop")
            });
            videoPlayer.btnFastForward = app.CreateButton("[fa-forward]", -1, -1, "FontAwesome");
            videoPlayer.btnFastForward.SetOnTouch(function() {
               videoPlayer.btnstouch("forward")
            });
            videoPlayer.btn = app.CreateButton("[fa-forward]", -1, -1, "FontAwesome");
            videoPlayer.btnFastForward.SetOnTouch(function() {
               videoPlayer.btnstouch("forward")
            });
            videoPlayer.btnFastForward = app.CreateButton("[fa-forward]", -1, -1, "FontAwesome");
            videoPlayer.btnFastForward.SetOnTouch(function() {
               videoPlayer.btnstouch("forward")
            });
            videoPlayer.btnLoad = app.CreateButton("[fa-folder-open]", -1, -1, "FontAwesome");
            videoPlayer.btnLoad.SetOnTouch(function() {
               videoPlayer.btnstouch("load");
            });
            videoPlayer.duration = videoPlayer.mediaplayer.GetDuration()
            videoPlayer.barSeek = app.CreateSeekBar(1, -1);
            videoPlayer.barSeek.SetRange(1.0);
            videoPlayer.barSeek.SetOnTouch(function() {
               videoPlayer.btnstouch("seek");
            });
            videoPlayer.layoutControls.AddChild(videoPlayer.btnRewind);
            videoPlayer.layoutControls.AddChild(videoPlayer.btnPlay);
            videoPlayer.layoutControls.AddChild(videoPlayer.btnPause);
            videoPlayer.layoutControls.AddChild(videoPlayer.btnStop);
            videoPlayer.layoutControls.AddChild(videoPlayer.btnFastForward);
            videoPlayer.mainLayout.AddChild(videoPlayer.layoutControls);
            videoPlayer.layoutControls.AddChild(videoPlayer.btnLoad);
            videoPlayer.mainLayout.AddChild(videoPlayer.barSeek);
            videoPlayer.mainLayout.AddChild(videoPlayer.mediaplayer);
            videoPlayer.dialog = app.CreateDialog("", "NoTitle");
            videoPlayer.dialog.AddLayout(videoPlayer.mainLayout);
            videoPlayer.dialog.SetOnCancel(function() {
               videoPlayer.mediaplayer.Stop();
               videoPlayer.mediaplayer.Gone();
            });
            videoPlayer.Show()
         } //end videoPlayer.CreatwVideoPlayer
      videoPlayer.Show = function() {
            videoPlayer.dialog.Show();
         } //end videoPlayer.Show
      videoPlayer.GetPlayer = function() {
            return videoPlayer.mainLayout();
         } //end videoPlayer.GetPlayer
      videoPlayer.update = function() {
            if (videoPlayer.mediaplayer.GetDuration()) {
               videoPlayer.barSeek.SetValue(videoPlayer.mediaplayer.GetPosition() / videoPlayer.mediaplayer.GetDuration());
            }
         } //end videoPlayer.update
      videoPlayer.btnstouch = function(title) {
            switch (title) {
               case "reset":
                  videoPlayer.mediaplayer.SeekTo(0);
                  break;
               case "rewind":
                  videoPlayer.mediaplayer.SeekTo(videoPlayer.mediaplayer.GetPosition() - 5);
                  break;
               case "play":
                  videoPlayer.mediaplayer.Play();
                  break;
               case "pause":
                  videoPlayer.mediaplayer.Pause();
                  break;
               case "stop":
                  videoPlayer.mediaplayer.Stop();
                  break;
               case "forward":
                  videoPlayer.mediaplayer.SeekTo(videoPlayer.mediaplayer.GetPosition() + 5);
                  break;
               case "load":
                  app.ChooseFile(null, "", function(fileName) {
                     videoPlayer.mediaplayer.SetFile(fileName);
                     videoPlayer.mediaplayer.Play();
                  })
                  break;
               case "seek":
                  videoPlayer.mediaplayer.SeekTo(videoPlayer.mediaplayer.GetDuration() * videoPlayer.barSeek.GetValue());
                  setInterval("videoPlayer.update()", 1000);
                  break;
            } //end.switch
         } //end videoPlayer.btnstouch
   } //videoPlayer.end
//------------------------------------------------------------------------
//browser.js 
//------------------------------------------------------------------------
function browser() {
      browser.build = function() {
         app.CloseDrawer("left");
         browser.addressbar = app.CreateTextEdit("http://www.google.com", 1, null, "singleline");
         browser.addressbar.SetOnEnter(function() {
            if (browser.addressbar.GetText().substring(0, 4) != "http") {
               browser.addressbar.SetText("http://" + browser.addressbar.GetText());
            }
            if (browser.addressbar.GetText().indexOf(".") <= -1) {
               browser.addressbar.SetText(browser.addressbar.GetText() + ".com");
            }
            browser.webview.LoadUrl(browser.addressbar.GetText().replace(" ", "%20"));
         });
         browser.addressbar.SetBackColor("#CC783873");
         browser.laywebb = app.CreateLayout("frame");
         browser.laywebb.SetSize(1, 1);
         browser.laywebb.SetBackColor("#CC783873");
         browser.laywebb.SetBackAlpha(.91);
         browser.layBrowse = app.CreateLayout("Linear", "Vertical");
         browser.webview = app.CreateWebView(1, .81, "IgnoreErrors,AllowZoom,AutoZoom");
         browser.webview.SetBackAlpha(.81);
         browser.webview.SetOnProgress(function() {
            browser.addressbar.SetText(browser.webview.GetUrl());
         });
         browser.laywebb.AddChild(browser.layBrowse);
         browser.btnWebExit = app.CreateButton("[fa-close] Exit", -1, .082, "FontAwesome");
         browser.btnWebExit.SetBackColor("#CCC22B2A");
         browser.btnWebGo = app.CreateButton("[fa-first-order] Go", -1, .082, "FontAwesome");
         browser.btnWebGo.SetBackColor("#CC2CB22A");
         browser.btnWebReload = app.CreateButton("[fa-refresh] Reload", -1, .082, "FontAwesome");
         browser.btnWebReload.SetBackColor("#CCC2B22A");
         browser.btnWebForward = app.CreateButton("[fa-arrow-right] Forward", -1, .082, "FontAwesome");
         browser.btnWebForward.SetBackColor("#CC2c2ba2")
         browser.btnWebBack = app.CreateButton("[fa-arrow-left] Back", -1, .082, "FontAwesome");
         browser.btnWebBack.SetBackColor("#CC2c2ba2");
         browser.layAddBar = app.CreateLayout("Linear", "Horizontal");
         browser.layAddBar.SetGravity("Center");
         browser.layAddBar.AddChild(browser.btnWebBack);
         browser.layAddBar.AddChild(browser.btnWebReload);
         browser.layAddBar.AddChild(browser.btnWebGo);
         browser.layAddBar.AddChild(browser.btnWebForward);
         browser.layAddBar.AddChild(browser.btnWebExit);
         browser.divWebTop = app.CreateList(" ", 1, .0045);
         browser.divWebTop.SetBackColor("#4c4b4a");
         browser.layBrowse.AddChild(browser.divWebTop);
         browser.layBrowse.AddChild(browser.layAddBar);
         browser.divWebMid = app.CreateList(" ", 1, .0045);
         browser.divWebMid.SetBackColor("#4c4b4a");
         browser.layBrowse.AddChild(browser.divWebMid);
         browser.btnWebGo.SetOnTouch(function() {
            browser.webview.LoadUrl(browser.addressbar.GetText());
         });
         browser.btnWebReload.SetOnTouch(function() {
            browser.webview.Reload();
         });
         browser.btnWebForward.SetOnTouch(function() {
            browser.webview.Forward();;
         });
         browser.btnWebBack.SetOnTouch(function() {
            browser.webview.Back();;
         });
         browser.btnWebExit.SetOnTouch(function() {
            browser.laywebb.Gone();
         });
         browser.layBrowse.AddChild(browser.addressbar);
         browser.divWebBottom = app.CreateList(" ", 1, .0045);
         browser.divWebBottom.SetBackColor("#4c4b4a");
         browser.layBrowse.AddChild(browser.divWebBottom);
         browser.webview.LoadUrl("http://www.google.com ");
         browser.layBrowse.AddChild(browser.webview)
         browser.btnWebPrintB = app.CreateButton("[fa-print]", 1, -1, "fontawesome,graybutton");
         browser.btnWebPrintB.SetOnTouch(function() {
            browser.webview.Print();
         });
         browser.layBrowse.AddChild(browser.btnWebPrintB);
         browser.divWebEnd = app.CreateList(",", 1, .0045);
         browser.divWebEnd.SetBackColor("#4c4b4a");
         browser.laywebb.AddChild(browser.divWebEnd);
         app.AddLayout(browser.laywebb);
         browser.laywebb.Animate("SlideFromTop");
         browser.laywebb.Hide();
      }
      browser.LoadPage = function(url) {
         browser.url = url;
         browser.webview.LoadUrl(browser.url);
         //	browser.webview.SetOnProgress(browser.progress);
         browser.addressbar.SetText(browser.url);
         browser.laywebb.Animate("SlideFromTop");
      }
   } //end.browser
  
  //------------------------------------------------------------------------
//codeEditor
//------------------------------------------------------------------------
function codeEditor() {
      this.init = function(codeEditHeight) {
         codeEditor.h = codeEditHeight
         codeEditor.w = .90
         edtTxt = app.CreateCodeEdit("code editor", codeEditor.w, codeEditor.h);
         if (app.LoadBoolean("AutoOn", null, "AutoOn.txt")) {
            edtTxt.SetOnChange(refilter)
         } else {}
         edtTxt.SetColorScheme("Dark");
         edtTxt.SetBackColor("#783873");
         edtTxt.SetBackAlpha(.09)
         edtTxt.SetOnDoubleTap(function() {
            app.OpenDrawer("right");
         });
         /*enable for key shortcut commandoutput*/
         /*edtTxt.SetOnChange(function (title) {*/
         /*gets current key*/ //app.ShowPopup(edtTxt.GetText().substring(edtTxt.GetCursorPos(), edtTxt.GetCursorPos() -1))});
         return edtTxt;
      }
   } //end.codeEditor
function keybd(shown) {
      keybd.init = function() {
         keybd.width = app.GetScreenWidth()
         keybd.height = app.GetScreenHeight()
         keybd.sizeFactor = 0.00
         if (app.GetOrientation() == "Portrait") {
            keybd.sizeFactor = 0.056;
         }
         if (app.GetOrientation() == "Landscape") {
            keybd.sizeFactor = keybd.sizeFactor
         }
         keybd.sizeAll()
      }
      keybd.sizeAll = function() {
         keybd.widthFinal = keybd.width * codeEditor.w
         keybd.heightFinal = keybd.height * (codeEditor.h + keybd.sizeFactor)
         keybd.heightFinal -= app.GetKeyboardHeight()
         layM.codeEdit.SetSize(keybd.widthFinal, keybd.heightFinal, "px");
         //debug 
         /*
         app.ShowPopup( "width" + keybd.widthFinal );
         app.ShowPopup( "height" + keybd.heightFinal );	
         app.ShowPopup("factor" + keybd.sizeFactor)
         */
      }
   } //end.keybd
  
  function docs() {
      docs.build = function() {
         lay = app.CreateLayout("linear", "VTop,FillXY,touchthrough");
         layBtn = app.CreateLayout("linear", "VBottom,fillxy,touchthrough");
         btnClose = app.CreateButton("[fa-close]", 1, .09, "gray,fontawesome");
         btnClose.SetOnTouch(function() {
            docs.hide()
         });
         frame = app.CreateLayout("frame");
         layBtn.AddChild(btnClose);
         view = app.CreateWebView(1, .91, "IgnoreErrors,allowremote");
        view.LoadUrl("file:///sdcard/Droidscript/.edit/docs/docs.htm");
       // view.LoadHtml( app.ReadFile( "file:///sdcard/Droidscript/.edit/docs/docs.htm" ))
         lay.AddChild(view);
         layBtn.Hide();
         lay.Hide();
         app.AddLayout(layBtn);
         app.AddLayout(lay);
      }
      docs.show = function() {
         layBtn.Animate("slidefrombottom");
         lay.Animate("slidefromtop");
      }
      docs.hide = function() {
         lay.Animate("slidetotop");
         layBtn.Animate("slidetobottom");
      }
   } //end.docs
   
   //------------------------------------------------------------------------
//drawers
//------------------------------------------------------------------------
function drawer() {
      //setTheme()
      drawer.buildLeft = function(url) {
            drawer.url = url || "http://www.google.com";
            drawer.tabs = app.CreateTabs(" File Browser, PDF Viewer", 1, 1);
            drawer.layDrawer = drawer.tabs.GetLayout(" File Browser")
            drawer.layPDF = drawer.tabs.GetLayout(" PDF Viewer")
            drawer.webpdf = app.CreateWebView(1, 1, "IgnoreErrors");
            drawer.FCBar2 = app.CreateLayout("Linear", "Horizontal");
            drawer.layFileC = app.CreateLayout("Linear", "Horizontal");
            drawer.txtFP = app.CreateButton("Current File: ");
            drawer.txtFP.SetMargins(null, .036, null, null);
            drawer.txtFP.SetTextColor("#783873");
            drawer.barFileCurr = app.CreateTextEdit(this.path || "/", -1, .116, "MultiLine,ReadOnly,NoKeyboard,NoSpell,,AutoSize,AutoSelect");
            drawer.barFileCurr.SetTextColor("#793939");
            drawer.barFileCurr.SetBackColor("#00000000");
            drawer.barFileCurr.SetPadding(0, .0491184, .009, 0);
            drawer.barFileCurr.SetMargins(0, 0, 0, 0)
            drawer.barFileCurr.SetCursorColor("#CC5c2b2a");
            drawer.txtFP.SetOnTouch(function() {
               app.OpenFile(drawer.GetPath(), drawer.GetPath().substring(-1, drawer.GetPath().lastIndexOf(".")));
            });
            drawer.layBarP = app.CreateLayout("Linear", "Horizontal,touchthrough");
            drawer.layBarP.SetGravity("VCenter");
            drawer.txtFileCreate = app.CreateText("", 1);
            drawer.layfp = app.CreateLayout("Linear", "Vertical");
            drawer.btnLabelRecents = app.CreateText("Long Press File to Append Data to Clipboard", -1, null, "fontawesome");
            drawer.btnClearR = app.CreateButton("Clear Recents");
            drawer.btnClearR.SetOnTouch(function() {
               app.SaveText("listRecents", " ", "listRecents.txt");
               listRecents.SetList(app.LoadText("listRecents", null, "listRecents.txt"));
            });
            listRecents = app.CreateList(app.LoadText("listRecents", null, "listRecents.txt"), 1, .45, "");
            recentsBackDrop = app.CreateLayout("Linear", "VTop,fillxy");
            recentsBackDrop.AddChild(listRecents);
            recentsBackDrop.SetBackColor("#CC2c2b2a");
            recentsBackDrop.SetBackAlpha(.34);
            recentsBackDrop.SetSize(.981, .63);
            listRecents.SetTextSize(11.7);
            drawer.btnCloseR = app.CreateButton("[fa-close] Close", 1, null, "fontawesome");
            drawer.btnCloseR.SetOnTouch(function() {
               dlgRecents.Dismiss();
            });
            dlgRecents = app.CreateDialog("Recent Files", "");
            dlgRecents.SetBackColor( "#2c2b2a" );
            dlgRecents.AddLayout(drawer.layfp);
            new picker();
            picker.buildUI();
            drawer.foldp = picker.init();
            drawer.layFiles = app.CreateLayout("Linear", "Vertical");
            drawer.layFiles.SetSize(1, .63);
            drawer.btnLevelUp = app.CreateButton("[fa-level-up]", 1, 0.09, "fontawesome,fillxy");
            drawer.btnLevelUp.SetOnTouch(function() {
               window.OnBack()
            });
            drawer.txtSearchBarFC = app.CreateTextEdit("");
            drawer.layDrawer.AddChild(drawer.FCBar2);
            drawer.layFileC.AddChild(drawer.txtFP);
            drawer.layBarP.AddChild(drawer.barFileCurr);
            drawer.layFileC.AddChild(drawer.layBarP);
            drawer.layDrawer.AddChild(drawer.layFileC);
            drawer.layDrawer.AddChild(drawer.txtFileCreate);
            drawer.layfp.AddChild(drawer.btnLabelRecents);
            drawer.layfp.AddChild(drawer.btnClearR);
            drawer.layfp.AddChild(recentsBackDrop);
            drawer.layfp.AddChild(drawer.btnCloseR);
            drawer.layFiles.AddChild(drawer.foldp);
            drawer.layDrawer.AddChild(drawer.layFiles);
            drawer.layDrawer.AddChild(drawer.btnLevelUp);
            drawer.layPDF.AddChild(drawer.webpdf);
            drawer.tabLay = app.CreateLayout("linear", "VTop,Left");
            drawer.tabLay.AddChild(drawer.tabs);
            drawer.scrDLeft = app.CreateScroller(-1, -1);
            drawer.scrDLeft.AddChild(drawer.tabLay);
            app.AddDrawer(drawer.scrDLeft, "left", 1, .009);
         } //end drawer.tabs
      drawer.SetPath = function(path) {
            this.path = path || drawer.path;
            drawer.barFileCurr.SetText(this.path);
         } // end drawer.SetPath
      drawer.GetPath = function(path) {
            return this.path
         } // end drawer.GetPath
      drawer.GetUrlLeft = function() {
         return drawer.webpdf.GetUrl();
      }
      drawer.buildRight = function() {
         cbar = new clipBar();
         cbar.init();
         scrDRight = app.CreateScroller(-1, -1);
         scrDRight.AddChild(cbar.init())
         app.AddDrawer(scrDRight, "right", .216, 0.009);
      }
   } //end.drawer
   app.LoadScript('Misc/beautify_js.js');
//------------------------------------------------------------------------
//clipBar
//------------------------------------------------------------------------
function clipBar() {
      this.init = function() {
         layDrawerClipBarB = app.CreateLayout("linear", "Vertical");
         layDrawerClipBarA = app.CreateLayout("linear", "Vertical");
         layDrawerClipBarC = app.CreateLayout("Linear", "horizontal");
         divA = app.CreateList(",", null, .0045);
         divA.SetBackColor("#4c4b4a");
         divB = app.CreateList(",", null, .0045);
         divB.SetBackColor("#4c4b4a");
         divC = app.CreateList(",", null, .0045);
         divC.SetBackColor("#4c4b4a");
         divD = app.CreateList(",", null, .0045);
         divD.SetBackColor("#4c4b4a");
         divE = app.CreateList(",", null, .0045);
         divE.SetBackColor("#4c4b4a");
         divF = app.CreateList(",", null, .0045);
         divF.SetBackColor("#4c4b4a");
         divG = app.CreateList(",", null, .0045);
         divG.SetBackColor("#4c4b4a");
         divH = app.CreateList(",", null, .0045);
         divH.SetBackColor("#4c4b4a");
         divI = app.CreateList(",", null, .0045);
         divI.SetBackColor("#4c4b4a");
         divJ = app.CreateList(",", null, .0045);
         divJ.SetBackColor("#4c4b4a");
         var btns = ["[fa-copy]", "[fa-cut]", "[fa-paste]"];
         for (var i = 0; i < btns.length; i++) {
            btn = app.CreateButton(btns[i], .108, null, "FontAwesome");
            btn.icon = btns[i];
            btn.SetTextSize(9);
            btn.SetOnTouch(keys_OnTouch);
            layDrawerClipBarA.AddChild(btn);
            layDrawerClipBarA.SetBackColor("#2c2b2a");
            layDrawerClipBarA.SetBackAlpha(.63);
         }
         var btns2 = ["[fa-share-alt]", "[fa-times-circle]", "[fa-arrows-alt]"]
         for (var i = 0; i < btns2.length; i++) {
            btn = app.CreateButton(btns2[i], .108, null, "FontAwesome");
            btn.icon = btns2[i];
            btn.SetTextSize(9);
            btn.SetOnTouch(keys_OnTouch);
            layDrawerClipBarB.AddChild(btn);
            layDrawerClipBarB.SetBackColor("#2c2b2a");
            layDrawerClipBarB.SetBackAlpha(.63);
         }
         var labeltext = app.CreateList("[fa-text-height]", .108, null, "fontawesome");
         labeltext.SetEnabled(false)
         layTxtSize = app.CreateLayout("Linear", "Horizontal");
         layTxtSize.SetGravity("VCenter");
         layTxtSize.AddChild(labeltext);
         labeltext.SetTextSize(9);
         listSpin = app.CreateList("");
         listSpin.SetSize(.108, null);
         var n = 1;
         do {
            listSpin.AddItem(n);
            n += 1
         } while (n < 90)
         spnTxtSize = uix.CreatePicker(listSpin.GetList(","), .108, null, "NoCycle")
         spnTxtSize.SetTextSize(9)
         spnTxtSize.SetOnChange(spnTxtChange);
         layTxtSize.AddChild(spnTxtSize);
         layDlg = app.CreateDialog("dlg", "NoDim");
         laySettings = app.CreateLayout("linear");
         dlgSettings = app.CreateDialog("Settings", "NoDim");
         dlgSettings.AddLayout(laySettings);
         listSettings = app.CreateList("Favorite1,favorite2,favorite3,favoriten");
         laySettings.AddChild(listSettings);
         /*
         dlgTidySettings = app.CreateDialog("Tidy Settings"  );
         layTidy = app.CreateLayout( "Linear", "VCenter");
         dlgTidySettings.AddLayout( layTidy );
         */
         /*
         txtTidy = app.CreateTextEdit( (JSON.stringify(opt)), .45,.54,"multiline,nospell" );	
         btnTidyStart= app.CreateButton( "Tidy Code" );
         layTidy.AddChild( txtTidy );
         layTidy.AddChild( btnTidyStart );

         btnTidyStart.SetOnTouch( function ()
         {
          

         var opt = txtTidy.GetText()
         */
         btnTidy = app.CreateButton("[fa-cubes]" + "\n Tidy", null, null, "fontawesome")
         btnTidy.SetTextSize(9);
         btnTidy.SetOnTouch(function() {
            var opt = {
               "indent_size": 3,
               "indent_char": " ",
               "indent_level": 0,
               "indent_with_tabs": false,
               "preserve_newlines": true,
               "max_preserve_newlines": 1,
               "jslint_happy": false,
               "space_after_named_function": true,
               "space_after_anon_function": true,
               "brace_style": "expand",
               "keep_array_indentation": false,
               "keep_function_indentation": false,
               "space_before_conditional": true,
               "break_chained_methods": false,
               "eval_code": false,
               "unescape_strings": false,
               "wrap_line_length": 0
            }
            app.CloseDrawer("right");
            txtUpdate.SetText("tidying")
            dlgpp.Show()
            edtTxt.SetText(js_beautify(edtTxt.GetText(), opt))
            dlgpp.Dismiss()
            edtTxt.Focus()
         });
         btnSettings = app.CreateButton("[fa-cogs] \n Settings", null, null, "fontawesome")
         btnSettings.SetTextSize(9);
         btnSettings.SetOnTouch(function() {
            app.SaveBoolean("assetsExt", false, "assetsExt.txt");
            opts.extract()
         });
         btnME = app.CreateButton("[fa-clone]", .108, null, "fontawesome");
         btnME.SetTextSize(9);
         btnME.SetOnTouch(function() {
            dlgmult.Show();
         });
         layTriggers = app.CreateLayout("Linear", "horizontal");
         layTriggers.AddChild(btnME);
         btnPdf = app.CreateButton("[fa-file-pdf-o]", .108, null, "fontawesome");
         btnPdf.SetTextSize(9);
         btnPdf.SetOnTouch(function() {
            app.OpenDrawer("left")
               //app.SimulateTouch(drawer.layMain, .71, .05, "down");
            drawer.tabs.ShowTab(" PDF Viewer")
         });
         layTriggers.AddChild(btnPdf);
         togTheme = app.CreateSpinner("Default,Dark,Light", -1, -1, "Center");
         togTheme.SetBackColor("#2c2b2a");
         togTheme.SetTextColor("silver");
         togTheme.SetOnChange(function(checked) {
            switch (togTheme.GetText()) {
               case "Light":
                  edtTxt.SetColorScheme("light")
                  edtTxt.SetBackAlpha(.45)
                  edtTxt.SetBackColor("silver");
                  break;
               case "Default":
                  edtTxt.SetColorScheme("dark");
                  edtTxt.SetBackColor("#783873");
                  edtTxt.SetBackAlpha(.09)
                  break;
               case "Dark":
                  edtTxt.SetColorScheme("light");
                  edtTxt.SetBackAlpha(.45)
                  edtTxt.SetBackColor("black", "red", "green")
                  edtTxt.SetTextColor("white")
                  break;
            }
         });
         btnKeyBarConfig = app.CreateButton("⚙️⌨️⚙️", .216, null, "fontawesome");
         btnKeyBarConfig.SetOnTouch(function() {
            keybar.KeyEditor();
         });
         btnDocs = app.CreateButton("Docs", .216, null);
         btnDocs.SetOnTouch(function() {
            docs.show()
         });
         togAutoC = app.CreateToggle("AutoC", .216, null);
         autoOnCheck = app.LoadBoolean("AutoOn", false, "AutoOn.txt")
         switch (autoOnCheck) {
            case true:
               togAutoC.SetChecked(true);
               break;
            case false:
               togAutoC.SetChecked(false);
               break;
         }
         togAutoC.SetOnTouch(function(checked) {
            this.checked = checked
            switch (this.checked) {
               case true:
                  app.SaveBoolean("AutoOn", true, "AutoOn.txt");
                  break;
               case false:
                  app.SaveBoolean("AutoOn", false, "AutoOn.txt");
                  break;
            }
         });
         layDrawer = app.CreateLayout("Linear", "Vertical");
         layDrawer.AddChild(divE);
         layHClip = app.CreateLayout("Linear", "Vertical");
         layHClip.AddChild(divA);
         layHClip.AddChild(layTxtSize);
         layHClip.AddChild(divB);
         layHClip.AddChild(layTriggers);
         layHClip.AddChild(divC);
         layDrawerClipBarC.AddChild(layDrawerClipBarA);
         layDrawerClipBarC.AddChild(layDrawerClipBarB);
         layDrawer.AddChild(layDrawerClipBarC);
         layDrawer.AddChild(layHClip);
         layDrawer.AddChild(btnSettings);
         layDrawer.AddChild(btnTidy)
         layDrawer.AddChild(divF)
         layDrawer.AddChild(togTheme);
         layDrawer.AddChild(divD)
         layDrawer.AddChild(btnKeyBarConfig);
         layDrawer.AddChild(divG)
         layDrawer.AddChild(btnDocs);
         layDrawer.AddChild(divH)
         layDrawer.AddChild(togAutoC);
         layDrawer.AddChild(divJ);
         layDrawer.SetBackColor("#2c2b2a");
         return layDrawer
            //app.AddDrawer(layDrawer, "right", .216, .0108);
      }
   } //end.clipBar
function spnTxtChange(item) {
      edtTxt.SetTextSize(item);
   } //end.spnTxtChange
   
  //EOF
  
 
 