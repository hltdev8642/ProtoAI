/*

//Called when application is started
function OnStart(){
    //Create a layout with objects vertically centered.
    lay = app.CreateLayout( "linear", "Vertical,FillXY" );    

    //Create a text label and add it to layout.
    btn = app.CreateButton( "FilePicker demo" );
    lay.AddChild( btn );
    btn.SetOnTouch(btn_OnTouch);
    pick = new FilePicker(mycallback);
    lay.AddChild(pick.GetPicker())
    // don't show hidden files
    pick.SetHideFiles(false);
    //Add layout to app.    
    app.AddLayout( lay );
}//function Onstart()

*/


function btn_OnTouch(){
    pick.SetFolder("/sdcard");
    pick.Show();    
}//function btn_OnTouch()

function mycallback(fullpath){
  app.Alert("user chose " + fullpath)
}//function mycallback()

function FilePicker(Callback,basePath){
  var self = this;
  this.basePath = basePath || "/sdcard";
  this.callback = Callback || function(){};
  this.FolderPath = this.basePath;
  this.hideHiddenFiles = false;
this.pathbar = app.CreateButton(this.basePath,1,-1,"GrayButton,fontawesome")
  this.dlg = app.CreateDialog(this.basePath);
  this.lay = app.CreateLayout( "linear", "Vertical" );
this.lay.AddChild(this.pathbar)
  this.lstFolds = app.CreateList("blank" , 1 ,.5,);

  this.lstFolds.parent = self;
  this.lstFolds.SetOnTouch(FilePicker_NewFolder);  
  this.lay.AddChild(this.lstFolds);
  this.lstFiles = app.CreateList("blank" , 1,.5);
this.labelFiles = app.CreateButton("[fa-file] Files\: ",1,-1,"GrayButton,fontawesome")
this.lay.AddChild(this.labelFiles)
  this.lstFiles.parent = self;
  this.lstFiles.SetOnTouch(FilePicker_NewFile); 
  this.lay.AddChild(this.lstFiles);
  //this.dlg.AddLayout(this.lay);
  
  this.GetPicker = function (){
  return this.lay
  }
  
  this.Show = function(){
    self.dlg.Show();
  }
  this.SetHideFiles=function(val){
    if(val == undefined) val = true;
    self.hideHiddenFiles = val;
  }
  this.Hide = function(){
    self.dlg.Hide();
  }
  this.SetFilter = function(filter){
      self.fileFilter = filter;
  }
  this.GetFolder = function(){
    return self.FolderPath;
  }
  this.SetFolder = function(folderPath){
    this.pathbar.SetText("[fa-folder] Folder\: "+ folderPath)
    self.FolderPath = folderPath;
    self.dlg.SetTitle(folderPath);
    app.ShowProgress( "Loading..." );
    var lst = app.ListFolder(folderPath);
    lst.sort(function(x,y){return (x.toLowerCase() > y.toLowerCase())?1:-1});
    var ths = lst.shift();
    self.lstFolds.SetList("");
    if( self.FolderPath != self.basePath )
      self.lstFolds.AddItem("..",null,"folder");
    self.lstFiles.SetList("");
    while (undefined != ths) {
      if ((! self.hideHiddenFiles) || (ths.indexOf(".") != 0)){
        var pth = folderPath + "/" + ths;
        if (app.IsFolder(pth))
           self.lstFolds.AddItem(ths,null,"folder")
        else
           self.lstFiles.AddItem(ths)
      }
      ths = lst.shift();
    }
    app.HideProgress();
  }  
}//function FilePicker()

function FilePicker_NewFolder(fil){
  var par = this.parent;
  var pth = par.GetFolder();
  if (fil != "..") {
      pth += "/" + fil
  }
  else{
     if( pth == par.basePath || pth == "/" ){
       par.Hide()
       return;
     }
     var tst = pth.split("/");
     tmp = tst.pop();
     pth = (tst.join("/"));
     if(pth=="") pth = "/";
  }
  
  par.SetFolder(pth);
}//function FilePicker_NewFolder()

function FilePicker_NewFile(fil){
  var par = this.parent;
  var pth = par.GetFolder();
  par.Hide();
  par.callback(pth += "/" + fil);
}//function FilePicker_NewFile()