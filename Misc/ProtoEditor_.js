app.SetOptions("AllowRemote, IgnoreErrors")
var mybuttons = [];
var barAHeight = 0.09
var barBHeight = 0.09
var keyBarHeight = 0.09
var titleBarHeight = 0.09
var codEdit;
app.Script("extraKeyBar.js")
app.Script( "init.js" );
new opts();
      //------------------------------------------------------------------------
   //ProtoEditor.js
   //ProtoMerged v2.2.0
   //------------------------------------------------------------------------
function OnStart() {

     var removeList = "ProtoEditor.js,console.js,init.js"
     var frontList = "extraKeyBar.js"

    opts.LoadScripts(removeList.split(","),  frontList , true);
//app.CreateDebug();
if ( app.LoadBoolean( "isLocked",null,"isLocked.txt"))
{app.SaveBoolean( "isConfig", false, "isConfig.txt");
}
else
{
app.SaveBoolean( "isConfig", true, "isConfig.txt");
}
      app.SaveBoolean("isProtected", true, "isProtected.txt");

          new keybd();
      app.SetOnShowKeyboard(function() {
         keybd.init()
      });

         //app.CreateDebug();
      setTheme()
      app.LoadPlugin("Support");
      sup = app.CreateSupport();
      layps = app.CreateLayout("linear","Vertical")
      layps.SetMargins(0.018, 0.018, 0.018, 0.018);
      laypp = app.CreateLayout("Linear")
 //     layps.SetPadding(null,.09,.09,null,.5);
      laypp.SetBackColor("#363636");
      laypp.AddChild(layps);
      prg = sup.CreateProgress();
      prg.SetSpinSpeed(Math.PI/9)
      prg.SetBarColor("#783873");
      prg.SetRimColor("#2c2b2a");
      prg.SetRimWidth(8.91)
      prg.SetCircleRadius(.27)
      prg.SetBarWidth(9)
      prg.SetSpin(true);
      layps.AddChild(prg);
      dlgpp = sup.CreateBottomSheet(1,.65);
     // app.CreateDialog("", "notitle,nocancel");
      dlgpp.AddChild(laypp);
      dlgpp.Show();
      txtUpdate = app.CreateText("Booting...", 1, -1, "MultiLine")
      txtUpdate.SetPadding(.0108, .0108, .0108, .0108);
      layps.AddChild(txtUpdate);
      if (app.IsAPK()) {
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
      if (!app.LoadBoolean("assetsExt", false, "assetsExt.txt")) {
         opts.dlgWs.Show();
         app.SaveBoolean("assetsExt", true, "assetsExt.txt");
      }
          if (app.LoadBoolean( "isFirstBoot",true,"isFirstBoot.txt" )){
    window.OnBack()
    window.OnBack()
    window.OnBack()
    app.SaveBoolean( "isFirstBoot",false,"isFirstBoot.txt"  );
    }

   } //end.OnStart
function build() {
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
//------------------------------------------------------------------------
//OnConfig
//------------------------------------------------------------------------
function OnConfig() {
   if (app.LoadBoolean( "isConfig",null, "isConfig.txt" ))
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
//a------------------------------------------------------------------------
//OnPause
//------------------------------------------------------------------------
function OnPause() {
app.SaveBoolean( "oldConfig", app.LoadBoolean( "isConfig", null, "isConfig.txt"), "oldConfig.txt");
app.SaveBoolean( "isConfig", false,"isConfig.txt" );
      //app.SaveText("listRecents ", listRecents.GetList(","), "listRecents.txt");
      app.SaveText("listRecents", (listRecents.GetList(",") || "," ), "listRecents.txt");
      //app.SaveText("wsDir",null , "wsDir.txt");
   } //end.OnPause
//------------------------------------------------------------------------
//OnResume
//------------------------------------------------------------------------
function OnResume() {
app.SaveBoolean( "isConfig", app.LoadBoolean( "oldConfig", null, "oldConfig.txt"), "isConfig.txt");
      /*debug*/
      // app.ShowPopup( app.LoadText("wsDir","/sdcard","wsDir.txt"));
   } //end.OnResume
function OnData(isStartUp) {
      new osr();
      sharedFiles = app.GetSharedFiles();
      sharedData = app.GetSharedText([0]);
      if (sharedData) {
         if (osr.status(sharedData)) browser.build();
         osr.url(sharedData);
         if (!osr.status(sharedData)) edtTxt.InsertText(sharedData)
      }
      if (sharedFiles) {
         //Display intent data.
         var intent = app.GetIntent();
         if (intent) {

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
             }//endif


            }//endfor
          //	alert(s);
          s = s.replace("/storage/emulated/0", "/sdcard");
           onFileChoose(s)
         } //endif
      } //endif
   } //end.OnData
//-----------------------------------------------------------------------
//Initial Configurations
//------------------------------------------------------------------------
function opts() {
      opts.GetPlugins = function ()
      {
      return app.ReadFile("plugins.txt")
      }

      opts.LoadPlugins = function(list, debug) {
         opts.pluginlist  = list.split(",")
         for (var i in opts.pluginlist) {
            app.LoadPlugin(opts.pluginlist[i]);
            if(debug){app.Debug(opts.pluginlist[i].toString())}
         }
         return;
      }

        opts.GetScripts = function (lstDel)
      {
        opts.scriptlist = app.ListFolder(app.GetAppPath(), ".js")
        for (var i in lstDel)
        {
           opts.removeitems(opts.scriptlist,lstDel[i]);
        }

          return opts.scriptlist
      }

      opts.LoadScripts = function (remove, toFront, debug) {
         opts.scriptlist  = opts.GetScripts(remove);
         //move to front (to avoid some sort of syncronization error that occurs)
         if (toFront.length > 0)
         {
         var arr = toFront.split(",");
          for (var i in arr){

                opts.scriptlist.unshift(arr[i]);
         }
         }

          for (var i in opts.scriptlist) {
            app.Script(opts.scriptlist[i]);
            if(debug){app.Debug(opts.scriptlist[i].toString())}
         }
         return;
      }


   opts.removeitems = function (arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

      opts.config = function() {
         _AddPermissions("Share,Storage,Accounts,Network");
         //app.SetOrientation( "portrait" );
         app.EnableBackKey(false);
         app.DisableKeys('VOLUME_DOWN,VOLUME_UP');

     //Scripts and Plugins
      opts.LoadPlugins(opts.GetPlugins(),true);
      uix = app.CreateUIExtras();
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

      btnBack.SetOnTouch(function() {
         web.Back();
      });
      btnForward.SetOnTouch(function() {
         web.Forward();
      });
      btnReload.SetOnTouch(function() {
         web.Reload();
      });
      btnClose.SetOnTouch(function() {
         webd.Hide();
      });
      btnRemote.SetOnTouch(function() {
         /*
               in progress ,open by filetype
               var cf =     app.LoadText("currentFile", null, "currentFile.txt")
               var cext = cf.substring(cf.lastIndexOf(".")+1,cf.length)
               switch (cext)
               {
               case "md":
               break;
               case "html":
               break;

               break;

               }
               app.ShowPopup( "cf\: "+cf+"\ncext\: "+cext );
                app.OpenFile(cf,cext)
                */
         var cf = app.LoadText("currentFile", null, "currentFile.txt")
         var cext = cf.substring(cf.lastIndexOf(".") + 1, cf.length)
         if (web.GetUrl() != "about:blank") {
            if (cext.indexOf("htm") > -1) {
               app.OpenUrl(web.GetUrl())
            }
         } else {
            app.OpenFile(app.LoadText("currentFile", web.GetUrl(), "currentFile.txt"))
         }
      });
      btnPrint.SetOnTouch(function() {
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
      opts.btnWsY.SetOnTouch(function() {
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
      opts.btnWsN.SetOnTouch(function() {
         opts.dlgWs.Dismiss();
      });
      opts.layWs = app.CreateLayout("Linear", "VTop");
      opts.layWs.AddChild(opts.txtWs);
      opts.layWs.AddChild(opts.btnWsY);
      opts.layWs.AddChild(opts.btnWsN);
      opts.dlgWs.AddLayout(opts.layWs);
      return;
   } //end opts.config
opts.extract = function() {
      //app.SaveText("pathDat", pathDat, "pathDat.txt");
      //app.SaveBoolean("assetsExt", false, "assetsExt.txt");
      //	app.HideProgress();
      if (!app.LoadBoolean("assetsExt", false, "assetsExt.txt")) {
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
function hwShorts() {
   app.SetOnKey(function(action, name) {
      /*debug*/ //app.ShowPopup( action + " " + name );
      if (name == "VOLUME_DOWN" && action == "Down") {
         edtTxt.SetCursorPos(edtTxt.GetCursorPos() - 1)
      }
      if (name == "VOLUME_UP" && action == "Down") {
         edtTxt.SetCursorPos(edtTxt.GetCursorPos() + 1)
      }
   });
}
var keybar = new extraKeyBar
var isEdtA = false;
var isEdtB = false;
app.SaveBoolean("isDebug", false);
if (!app.LoadBoolean("isLocked", false, "isLocked.txt")) {
   app.SetOrientation(app.GetOrientation());
   app.ShowPopup("🔐");
} else {
   app.ShowPopup("🔓");
}



//Tabs object.
function _Tabs(list, width, height, options) {
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
      this.AddTab = function(name) {
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
      this.lay.SetOnChange = function(cb) {
         this.OnChange = cb;
      }
      //Return layout for given tab.
      this.lay.GetLayout = function(name) {
         return this.parent.tabs[name].content;
      }
      //Set current tab.
      this.lay.ShowTab = function(name) {
         app.SetDebugEnabled(false);
         //Drop out if no change.
         if (curTabName == name) {
            app.SetDebugEnabled(true);
            return;
         }
         curTabName = name;
         //Get tab info.
         var tab = this.parent.tabs[name];
         if (!tab) {
            app.SetDebugEnabled(true);
            return;
         }
         //Clear all tab selections.
         for (var tb in this.parent.tabs) {
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
      for (var i = 0; i < lst.length; i++) {
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
function _Tabs_OnTouch(ev) {
      if (ev.action == "Down") {
         app.SetDebugEnabled(false);
         var txt = ev.source;
         txt.tabs.lay.ShowTab(txt.GetText());
         app.SetDebugEnabled(true);
      }
   } //end.TabsOnTouch