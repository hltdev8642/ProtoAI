function OnStart() {
   app.ChooseFile("pixk", "*/*", function(fileName) {
      new fop();
      var fn = FileManager.GetExtension(fileName)
      var type = FileManager.GetType(fn)
      alert(type)
   })
}

function fop() {
   FileManager.GetExtension = function(file) {
      FileManager.file = file
      FileManager.format = "none"
      FileManager.ext = FileManager.file.substring(FileManager.file.lastIndexOf("."), FileManager.file.length)
      return FileManager.ext
   }
   FileManager.GetType = function(ext) {
      this.ext = ext || FileManager.ext;
      FileManager.imageFormats = "jpg,jpeg,exif,tiff,png,psd,gif,bmp,svg"
      for (i = 0; i < FileManager.imageFormats.split(",").length; i++) {
         if (this.ext.indexOf(FileManager.imageFormats.split(",")[i]) > -1) {
            FileManager.format = "image"
         }
      }
      FileManager.videoFormats = "mp4,avi,mpg,mpeg,mkv,x264,mov,webm"
      for (i = 0; i < FileManager.videoFormats.split(",").length; i++) {
         if (this.ext.indexOf(FileManager.videoFormats.split(",")[i]) > -1) {
            FileManager.format = "video"
         }
      }
      FileManager.audioFormats = "mp3,wav,m4a,aiff,flac,wmv,aac,3gp,aiff,raw,wma"
      for (i = 0; i < FileManager.audioFormats.split(",").length; i++) {
         if (this.ext.indexOf(FileManager.audioFormats.split(",")[i]) > -1) {
            FileManager.format = "audio"
         }
      }
      if (this.ext.indexOf("js") > -1) {
         FileManager.format = "javascript"
      }
      if (this.ext.indexOf("php") > -1) {
         FileManager.format = "php"
      }
      if ((this.ext.indexOf("java") > -1) | (this.ext.indexOf("class") > -1) | (this.ext.indexOf("jar") > -1) | (this.ext.indexOf("jnlp") > -1)) {
         FileManager.format = "java"
      }
      if (this.ext.indexOf("py") > -1) {
         FileManager.format = "python"
      }
      if (this.ext.indexOf("css") > -1) {
         FileManager.format = "css"
      }
      if (this.ext.indexOf("c") > -1) {
         FileManager.format = "c"
      }
      if (this.ext.indexOf("json") > -1) {
         FileManager.format = "json"
      }
      if ((this.ext.indexOf("txt") > -1) | (this.ext.indexOf("text") > -1)) {
         FileManager.format = "text"
      }
      if (this.ext.indexOf("md") > -1) {
         FileManager.format = "markdown"
      }
      if ((this.ext.indexOf("html") > -1) | (this.ext.indexOf("htm") > -1)) {
         FileManager.format = "web"
      }
      return FileManager.format;
   }
}