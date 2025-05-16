
function OnConfig() {
    app.DestroyLayout(drw.layout);
    build()
    }
    
    function OnStart() {
        
        build()
        
        }
//Called when application is started.
function build() {
setTheme()
   //Create a layout with objects vertically centered.
   new drw()
   app.AddDrawer(drw.layout(), "left", 1)
   drw.tabBuilder(' File Manager, PDF Viewer')
   drw.FileManager()
   drw.pdfTab()
}

function drw() {
drw.build = function ()
{
setTheme()
   //Create a layout with objects vertically centered.
   new drw()
   app.AddDrawer(drw.layout(), "left", 1)
   drw.tabBuilder(' File Manager, PDF Viewer')
   drw.FileManager()
   drw.pdfTab()
	
}

   drw.layout = function(w, h) {
      drw.w = w || 1.0;
      drw.h = h || 1.0;
      drw.lay = app.CreateLayout("Linear", "Top");
      drw.lay.SetSize(drw.w, drw.h);
      drw.lay.SetBackColor("#cc22cc");
      return drw.lay;
   }
   drw.tabBuilder = function(tabs) {
      drw.tabList = tabs.split(",")
      drw.tabs = app.CreateTabs(tabs, 1.0, 1.0)
      for (i = 0; i < drw.tabs.length; i++) {
         var tab = drw.tabList[i];
         tab = drw.tabs.GetLayout(drw.tabList[i]);
      }
      drw.lay.AddChild(drw.tabs);
   }
   drw.FileManager = function() {
      drw.fileTab = drw.tabs.GetLayout(" File Manager")
      app.LoadPlugin( "Support" );
      var sup = app.CreateSupport();
      var cfGrid = sup.CreateGridLayout();
      cfGrid.SetColCount(2);
      
 cfBar = app.CreateTextEdit( "/", 1.0,0.135,"NoKeyboard,MultiLine,NoSpell,AutoSelect")
 scrBar = app.CreateScroller(1.0,.135);
 scrBar.AddChild(cfBar)
cfBtn = app.CreateButton( "current file\:" ,null,null,"");
cfGrid.AddChild(cfBtn);
cfGrid.AddChild(scrBar);
  drw.fileTab.AddChild(cfGrid);
controlGridA =  sup.CreateGridLayout();
controlGridA.SetColCount(2);

  cfBar.SetTextColor("#793939");
           cfBar.SetBackColor("#00000000");
           cfBar.SetCursorColor("#CC5c2b2a");
            cfBtn.SetOnTouch(function() {
               alert("app.OpenFile(" + cfBar.GetText() + ")");
               //(drawer.GetPath(), drawer.GetPath().substring(-1, drawer.GetPath().lastIndexOf(".")))");
            });

btnRecents = app.CreateButton( "Recents" ,0.495, null,"");

controlGridA.AddChild(btnRecents);




btnOpen = app.CreateButton( "Open" ,0.495,null,"");
controlGridA.AddChild(btnOpen);
     drw.fileTab.AddChild(controlGridA);
     
     
controlGridB =  sup.CreateGridLayout();
controlGridB.SetColCount(3);

btnCreateFile = app.CreateButton( "Create File" ,0.333,null,"");
controlGridB.AddChild(btnCreateFile);

btnTemplates = app.CreateButton( "Templates" ,0.333,null,"");
controlGridB.AddChild(btnTemplates);


btnCreateFolder = app.CreateButton( "Create Folder" ,0.333,null,"");
controlGridB.AddChild(btnCreateFolder);

     drw.fileTab.AddChild(controlGridB);
     
     
txtFileName = app.CreateTextEdit("",0.4325,null,"singleline");

txtFileName.SetHint("FileName");
txtExt = app.CreateTextEdit("",0.135,null,"singleline");
txtExt.SetHint("Ext");

spnExt = app.CreateSpinner("Syntax",0.4325);
controlGridC = sup.CreateGridLayout();
controlGridC.SetColCount(3);
controlGridC.AddChild(txtFileName);
controlGridC.AddChild(txtExt);
controlGridC.AddChild(spnExt);

     drw.fileTab.AddChild(controlGridC);
    
 
txtFilePath = app.CreateText("/sdcard",1);
controlGridD = sup.CreateGridLayout()
controlGridD.SetColCount(1);
controlGridD.SetRowCount(3);
controlGridD.AddChild(txtFilePath)

lstBrowser = app.CreateList(app.ListFolder("/sdcard/droidscript"),1,.27)
controlGridD.AddChild(lstBrowser)

btnLevelUp = app.CreateButton("Up Level ---^",1,null);
controlGridD.AddChild(btnLevelUp);
drw.fileTab.AddChild(controlGridD)

 
 

   }
   drw.pdfTab = function() {
      drw.pdfTab = drw.tabs.GetLayout(" PDF Viewer")
      txt = app.CreateCodeEdit("testing", 1.0, .23);
      drw.pdfTab.AddChild(txt);
   }
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
   //------------------------------------------------------------------------
//setTheme.js 
//------------------------------------------------------------------------
function setTheme() {
      theme = app.CreateTheme("Dark");
      theme.SetDimBehind(false);
      theme.SetButtonStyle("#353535", "#161616", 2, "#2c2b2a", 0, 1.0, "#978873");
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