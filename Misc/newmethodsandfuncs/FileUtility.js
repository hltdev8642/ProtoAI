new FileUtility();

function FileUtility() {
      FileUtility.Choose = function() {
            app.ChooseFile("Picker", "*.*", function(path) {
               this.path = path;
               FileUtility.ProcessInput(this.path)
            });
         } //end.FileUtility.Choose
      FileUtility.SetCurrent = function(fileName) {
            FileUtility.currentFile = fileName || null;
            app.SaveText("currentFile", FileUtility.currentFile, "currentFile.txt")
            return ("Saved\: " + FileUtility.currentFile)
         } //end.FileUtility.Save()
      FileUtility.GetCurrent = function() {
            return FileUtility.currentFile()
         } //end.FileUtility.Load()
      FileUtility.AddRecent = function(fileName, fileType, fileExt) {
            FileUtility.recentName = fileName || FileUtility.currentFile
            FileUtility.recentType = fileType || FileUtility.currentFileType
            FileUtility.recentExt = fileExtension || FileUtility.currentFileExt
            listRecents.AddItem(FileUtility.recentName, FileUtility.recentType + "\n" + FileUtility.recentExt);
            return ("Added File \: "
               FileUtility.recentName + "\n Type\: " + FileUtility.recentType + "\n Extension\: " + FileUtility.recentExt)
         } //end.FileUtility.AddRecent()
      FileUtility.SetProtection = function(status) {
            FileUtility.protectionStatus = status || true;
            app.SaveBoolean("isProtected", FileUtility.protectionStatus, "isProtected.txt");
         } //end.FileUtility.SetProtection()
      FileUtility.GetProtection = function() {
            return FileUtility.protectionStatus;
         } //end.FileUtility.GetProtection()
      FileUtility.ImageViewer = function() {
            FileUtility.webImg = app.CreateWebView(null, null, "IgnoreErrors,NoScrollBars,AllowZoom")
            FileUtility.layImg = app.CreateLayout("frame");
            FileUtility.layImg.AddChild(FileUtility.webImg);
            FileUtility.layTr = app.CreateLayout("linear", "Vertical,Right");
            FileUtility.layImg.AddChild(FileUtility.layTr);
            FileUtility.layTr.SetPadding(null, .18, null, null);
            FileUtility.btnClose = app.CreateButton("[fa-close]", -1, null, "FontAwesome");
            FileUtility.btnShare = app.CreateButton("[fa-share-alt]", -1, null, "FontAwesome");
            FileUtility.btnPrint = app.CreateButton("[fa-print]", -1, null, "FontAwesome");
            FileUtility.layTr.AddChild(FileUtility.btnClose);
            FileUtility.layTr.AddChild(FileUtility.btnShare);
            FileUtility.layTr.AddChild(FileUtility.btnPrint);
            FileUtility.btnPrint.SetOnTouch(function() {
               FileUtility.webImg.Print();
            });
            FileUtility.btnShare.SetOnTouch(function() {
               app.SendFile("file://" + FileUtility.currentFile)
            });
            FileUtility.btnClose.SetOnTouch(function() {
               layM.SetTouchable(true);
               FileUtility.layImg.Gone();
            });
            app.AddLayout(FileUtility.layImg);
            FileUtility.mdContent = '![](' + file + ')';
            FileUtility.md = new mdParser(FileUtility.currentFile, FileUtility.mdContent);
            FileUtility.html = FileUtility.md.GetHtml();
            FileUtility.webImg.ClearHistory();
            FileUtility.webImg.LoadHtml(FileUtility.html);
            layM.SetTouchable(false);
            FileUtility.layImg.Animate("SlideFromBottom");
         } //end.FileUtility.ImageViewer()
      FileUtility.PDFViewer = function() {
            FileUtility.webPDF = app.CreateWebView(1, 1);
            FileUtility.scriptA = app.CreateText(" ");
            FileUtility.scriptA.SetText(app.ReadFile('jsA.txt'));
            FileUtility.scriptB = app.CreateText(" ");
            FileUtility.scriptB.SetText(app.ReadFile('jsB.txt'));
            FileUtility.SetProtection(true);
            app.WriteFile(pathData.GetText() + "/web/viewer.js", FileUtility.scriptA.GetText() + FileUtility.currentFile + FileUtility.scriptB.GetText());
            drawer.webpdf.Hide()
            drawer.webpdf.Show()
            drawer.webpdf.Reload();
            drawer.webpdf.ClearHistory();
            drawer.webpdf.LoadUrl("file:///" + pathData.GetText() + "/web/viewer.html");
            app.OpenDrawer("left");
            drawer.tabs.ShowTab(" PDF Viewer")
            app.OpenDrawer("left");
         } //end.FileUtility.PDFViewer()
      FileUtility.OpenWith = function() {
            FileUtility.AddRecent(FileUtility.currentFile, FileUtility.currentFileType, FileUtility.currentFileExt)
            spnSyntax.SetText(FileUtility.currentFileType);
            if (isEdtA == true) {
               edtA.SetText(app.ReadFile(FileUtility.GetCurrent));
               return;
            }
            if (isEdtB == true) {
               edtB.SetText(app.ReadFile(FileUtility.GetCurrent));
               return;
            }
            FileUtility.dlgOpen.Hide();
            app.OpenFile(FileUtility.currentFile, "*/*");
         } //end.FileUtility.OpenWith()
      FileUtility.OpenOther = function() {
            FileUtility.SetCurrent(FileUtility.currentFile)
            FileUtility.AddRecent(FileUtility.currentFile, FileUtility.currentFileType, FileUtility.currentFileExt)
            spnSyntax.SetText(FileUtility.currentFileType);
            edtTxt.SetText(app.ReadFile(FileUtility.currentFile));
            FileUtility.dlgOpen.Hide();
         } //end.FileUtility.OpenOther()
      FileUtility.OtherViewer = function() {
            FileUtility.dlgOpen = app.CreateDialog("Open File", "NoDim");
            FileUtility.optA = app.CreateButton("Open With ...");
            FileUtility.optA.SetOnTouch(function() {
               FileUtility.OpenWith()
            });
            FileUtility.optB = app.CreateButton("Open");
            FileUtility.optB.SetOnTouch(function() {
               FileUtility.OpenOther()
            });
            FileUtility.layDlgOpen = app.CreateLayout("Linear", "VCenter");
            FileUtility.layDlgOpen.AddChild(optA);
            FileUtility.layDlgOpen.AddChild(optB);
            FileUtility.dlgOpen.AddLayout(layDlgOpen);
            FileUtility.dlgOpen.Show();
         } //end.FileUtility.OtherViewer()
      FileUtility.ProcessInput = function(fileName) {
         FileUtility.currentFile = fileName || app.LoadText("currentFile", null, "currentFile.txt"));
      FileUtility.SetCurrent(FileUtility.currentFile)
         //	titleBar.SetPath(FileUtility.currentFile || "/")
         //drawer.SetPath(FileUtility.currentFile || "/")
      FileUtility.currentFileExt = FileUtility.GetExtension((FileUtility.currentFile || "nofile.txt"));
      FileUtility.currentFileType = FileUtility.GetType(FileUtility.currentFileExt)
      switch (FileUtility.currentFileType) {
         case "none":
            break;
         case "pdf":
            FileUtility.SetCurrent(FileUtility.currentFile)
            FileUtility.AddRecent(FileUtility.currentFile, FileUtility.currentFileType, FileUtility.currentFileExt)
            spnSyntax.SetText(FileUtility.currentFileType);
            FileUtility.PDFViewer()
            break;
         case "image":
            FileUtility.SetCurrent(FileUtility.currentFile)
            FileUtility.AddRecent(FileUtility.currentFile, FileUtility.currentFileType, FileUtility.currentFileExt)
            spnSyntax.SetText(FileUtility.currentFileType);
            FileUtility.ImageViewer()
            break;
         case "video":
            var vp = new videoPlayer();
            FileUtility.SetCurrent(FileUtility.currentFile)
            FileUtility.AddRecent(FileUtility.currentFile, FileUtility.currentFileType, FileUtility.currentFileExt)
            spnSyntax.SetText(FileUtility.currentFileType);
            vp.CreateVideoPlayer()
            vp.LoadVideo(FileUtility.currentFile);
            vp.PlayVideo();
            break;
         case "audio":
            var ap = new audioPlayer();
            FileUtility.SetCurrent(FileUtility.currentFile)
            FileUtility.AddRecent(FileUtility.currentFile, FileUtility.currentFileType, FileUtility.currentFileExt)
            spnSyntax.SetText(FileUtility.currentFileType);
            ap.CreateAudioPlayer()
            ap.LoadAudio(FileUtility.currentFile);
            ap.Show()
            ap.PlayAudio()
            break;
         case "js":
            FileUtility.SetCurrent(FileUtility.currentFile)
            FileUtility.AddRecent(FileUtility.currentFile, FileUtility.currentFileType, FileUtility.currentFileExt)
            spnSyntax.SetText(FileUtility.currentFileType);
            if (isEdtA == true) {
               edtA.SetText(app.ReadFile(FileUtility.GetCurrent));
               return;
            }
            if (isEdtB == true) {
               edtB.SetText(app.ReadFile(FileUtility.GetCurrent));
               return;
            }
            edtTxt.SetText(app.ReadFile(FileUtility.GetCurrent));
            break;
         case "php":
            FileUtility.SetCurrent(FileUtility.currentFile)
            FileUtility.AddRecent(FileUtility.currentFile, FileUtility.currentFileType, FileUtility.currentFileExt)
            spnSyntax.SetText(FileUtility.currentFileType);
            if (isEdtA == true) {
               edtA.SetText(app.ReadFile(FileUtility.GetCurrent));
               return;
            }
            if (isEdtB == true) {
               edtB.SetText(app.ReadFile(FileUtility.GetCurrent));
               return;
            }
            edtTxt.SetText(app.ReadFile(FileUtility.GetCurrent));
            break;
         case "java":
            FileUtility.SetCurrent(FileUtility.currentFile)
            FileUtility.AddRecent(FileUtility.currentFile, FileUtility.currentFileType, FileUtility.currentFileExt)
            spnSyntax.SetText(FileUtility.currentFileType);
            if (isEdtA == true) {
               edtA.SetText(app.ReadFile(FileUtility.GetCurrent));
               return;
            }
            if (isEdtB == true) {
               edtB.SetText(app.ReadFile(FileUtility.GetCurrent));
               return;
            }
            edtTxt.SetText(app.ReadFile(FileUtility.GetCurrent));
            break;
         case "arduino":
            FileUtility.SetCurrent(FileUtility.currentFile)
            FileUtility.AddRecent(FileUtility.currentFile, FileUtility.currentFileType, FileUtility.currentFileExt)
            spnSyntax.SetText(FileUtility.currentFileType);
            if (isEdtA == true) {
               edtA.SetText(app.ReadFile(FileUtility.GetCurrent));
               return;
            }
            if (isEdtB == true) {
               edtB.SetText(app.ReadFile(FileUtility.GetCurrent));
               return;
            }
            edtTxt.SetText(app.ReadFile(FileUtility.GetCurrent));
            break;
         case "python":
            FileUtility.SetCurrent(FileUtility.currentFile)
            FileUtility.AddRecent(FileUtility.currentFile, FileUtility.currentFileType, FileUtility.currentFileExt)
            spnSyntax.SetText(FileUtility.currentFileType);
            if (isEdtA == true) {
               edtA.SetText(app.ReadFile(FileUtility.GetCurrent));
               return;
            }
            if (isEdtB == true) {
               edtB.SetText(app.ReadFile(FileUtility.GetCurrent));
               return;
            }
            edtTxt.SetText(app.ReadFile(FileUtility.GetCurrent));
            break;
         case "processing":
            FileUtility.SetCurrent(FileUtility.currentFile)
            FileUtility.AddRecent(FileUtility.currentFile, FileUtility.currentFileType, FileUtility.currentFileExt)
            spnSyntax.SetText(FileUtility.currentFileType);
            if (isEdtA == true) {
               edtA.SetText(app.ReadFile(FileUtility.GetCurrent));
               return;
            }
            if (isEdtB == true) {
               edtB.SetText(app.ReadFile(FileUtility.GetCurrent));
               return;
            }
            edtTxt.SetText(app.ReadFile(FileUtility.GetCurrent));
            break;
         case "css":
            FileUtility.SetCurrent(FileUtility.currentFile)
            FileUtility.AddRecent(FileUtility.currentFile, FileUtility.currentFileType, FileUtility.currentFileExt)
            spnSyntax.SetText(FileUtility.currentFileType);
            if (isEdtA == true) {
               edtA.SetText(app.ReadFile(FileUtility.GetCurrent));
               return;
            }
            if (isEdtB == true) {
               edtB.SetText(app.ReadFile(FileUtility.GetCurrent));
               return;
            }
            edtTxt.SetText(app.ReadFile(FileUtility.GetCurrent));
            break;
         case "c":
            FileUtility.SetCurrent(FileUtility.currentFile)
            FileUtility.AddRecent(FileUtility.currentFile, FileUtility.currentFileType, FileUtility.currentFileExt)
            spnSyntax.SetText(FileUtility.currentFileType);
            if (isEdtA == true) {
               edtA.SetText(app.ReadFile(FileUtility.GetCurrent));
               return;
            }
            if (isEdtB == true) {
               edtB.SetText(app.ReadFile(FileUtility.GetCurrent));
               return;
            }
            edtTxt.SetText(app.ReadFile(FileUtility.GetCurrent));
            break;
         case "ruby":
            FileUtility.SetCurrent(FileUtility.currentFile)
            FileUtility.AddRecent(FileUtility.currentFile, FileUtility.currentFileType, FileUtility.currentFileExt)
            spnSyntax.SetText(FileUtility.currentFileType);
            if (isEdtA == true) {
               edtA.SetText(app.ReadFile(FileUtility.GetCurrent));
               return;
            }
            if (isEdtB == true) {
               edtB.SetText(app.ReadFile(FileUtility.GetCurrent));
               return;
            }
            edtTxt.SetText(app.ReadFile(FileUtility.GetCurrent));
            break;
         case "json":
            FileUtility.SetCurrent(FileUtility.currentFile)
            FileUtility.AddRecent(FileUtility.currentFile, FileUtility.currentFileType, FileUtility.currentFileExt)
            spnSyntax.SetText(FileUtility.currentFileType);
            if (isEdtA == true) {
               edtA.SetText(app.ReadFile(FileUtility.GetCurrent));
               return;
            }
            if (isEdtB == true) {
               edtB.SetText(app.ReadFile(FileUtility.GetCurrent));
               return;
            }
            edtTxt.SetText(app.ReadFile(FileUtility.GetCurrent));
            break;
         case "text":
            FileUtility.SetCurrent(FileUtility.currentFile)
            FileUtility.AddRecent(FileUtility.currentFile, FileUtility.currentFileType, FileUtility.currentFileExt)
            spnSyntax.SetText(FileUtility.currentFileType);
            if (isEdtA == true) {
               edtA.SetText(app.ReadFile(FileUtility.GetCurrent));
               return;
            }
            if (isEdtB == true) {
               edtB.SetText(app.ReadFile(FileUtility.GetCurrent));
               return;
            }
            edtTxt.SetText(app.ReadFile(FileUtility.GetCurrent));
            break;
            break;
         case "markdown":
            FileUtility.SetCurrent(FileUtility.currentFile)
            FileUtility.AddRecent(FileUtility.currentFile, FileUtility.currentFileType, FileUtility.currentFileExt)
            spnSyntax.SetText(FileUtility.currentFileType);
            if (isEdtA == true) {
               edtA.SetText(app.ReadFile(FileUtility.GetCurrent));
               return;
            }
            if (isEdtB == true) {
               edtB.SetText(app.ReadFile(FileUtility.GetCurrent));
               return;
            }
            edtTxt.SetText(app.ReadFile(FileUtility.GetCurrent));
            break;
         case "web":
            break;
         case "other":
            FileUtility.OtherViewer()
            break;
         default:
      } //end.switch
   } //end.FileUtility.ProcessInput()
FileUtility.GetExtension = function(file) {
      FileUtility.file = file
      FileUtility.format = "none"
      FileUtility.ext = FileUtility.file.substring(FileUtility.file.lastIndexOf("."), FileUtility.file.length)
      return FileUtility.ext
   } //end.FileUtility.GetExtension()
FileUtility.GetType = function(ext) {
      this.ext = ext || FileUtility.ext;
      FileUtility.imageFormats = "jpg,jpeg,exif,tiff,png,psd,gif,bmp,svg"
      for (i = 0; i < FileUtility.imageFormats.split(",").length; i++) {
         if (this.ext.indexOf(FileUtility.imageFormats.split(",")[i]) > -1) {
            FileUtility.format = "image"
         }
      }
      FileUtility.videoFormats = "mp4,avi,mpg,mpeg,mkv,x264,mov,webm"
      for (i = 0; i < FileUtility.videoFormats.split(",").length; i++) {
         if (this.ext.indexOf(FileUtility.videoFormats.split(",")[i]) > -1) {
            FileUtility.format = "video"
         }
      }
      FileUtility.audioFormats = "mp3,wav,m4a,aiff,flac,wmv,aac,3gp,aiff,raw,wma"
      for (i = 0; i < FileUtility.audioFormats.split(",").length; i++) {
         if (this.ext.indexOf(FileUtility.audioFormats.split(",")[i]) > -1) {
            FileUtility.format = "audio"
         }
      }
      if (this.ext.indexOf("js") > -1) {
         FileUtility.format = "javascript"
      }
      if (this.ext.indexOf("php") > -1) {
         FileUtility.format = "php"
      }
      if ((this.ext.indexOf("java") > -1) | (this.ext.indexOf("class") > -1) | (this.ext.indexOf("jar") > -1) | (this.ext.indexOf("jnlp") > -1)) {
         FileUtility.format = "java"
      }
      if (this.ext.indexOf("py") > -1) {
         FileUtility.format = "python"
      }
      if (this.ext.indexOf("css") > -1) {
         FileUtility.format = "css"
      }
      if (this.ext.indexOf("c") > -1) {
         FileUtility.format = "c"
      }
      if (this.ext.indexOf("json") > -1) {
         FileUtility.format = "json"
      }
      if ((this.ext.indexOf("txt") > -1) | (this.ext.indexOf("text") > -1)) {
         FileUtility.format = "text"
      }
      if (this.ext.indexOf("md") > -1) {
         FileUtility.format = "markdown"
      }
      if ((this.ext.indexOf("html") > -1) | (this.ext.indexOf("htm") > -1)) {
         FileUtility.format = "web"
      }
      return FileUtility.format;
   } //end.FileUtility.GetExtension()
} //end.FileUtility()