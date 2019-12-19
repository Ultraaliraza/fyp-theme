import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UploadfilesService {
  filesMeta = {
    doc: undefined,
    image: undefined,
    video: undefined,
  };
  urls = {
    docURL: undefined,
    videoURL: undefined,
    imageURL: undefined
  }

  constructor() { }

  uploadFile() {
    return new Promise((resolve) => {
      if (this.filesMeta) {
        let fileName;
        let offsetRef = firebase.database().ref(".info/serverTimeOffset");
        offsetRef.on("value", async (snap) => {
          let currentTime = Date.now() + await snap.val();
          if (this.filesMeta.doc) {
            let doc = this.filesMeta.doc;
            fileName = currentTime + '_' + doc['name'];
            console.log(doc['file'])
            let storageRef = firebase.storage().ref().child('files' + `/${fileName}`);
            storageRef
              .put(doc['file'])
              .then(async () => {
                // The file's download URL
                let downloadURL = await storageRef.getDownloadURL();
                this.urls.docURL = downloadURL;

                if (!this.filesMeta.image && !this.filesMeta.video)
                  return resolve(this.urls);
              });
          }
          if (this.filesMeta.image) {
            let image = this.filesMeta.image;
            fileName = currentTime + '_' + this.filesMeta.image['name'];
            let storageRef = firebase.storage().ref().child('files' + `/${fileName}`);
            console.log(image['file'])
            storageRef
              .put(image['file'])
              .then(async () => {
                // The file's download URL
                let downloadURL = await storageRef.getDownloadURL();
                this.urls.imageURL = downloadURL;
                console.log(this.urls)
                if (!this.filesMeta.video)
                  return resolve(this.urls);
              });
          }
          if (this.filesMeta.video) {
            let video = this.filesMeta.video;
            fileName = currentTime + '_' + this.filesMeta.video['name'];
            let storageRef = firebase.storage().ref().child('files' + `/${fileName}`);
            storageRef
              .put(video['file'])
              .then(async () => {
                // The file's download URL
                let downloadURL = await storageRef.getDownloadURL();
                this.urls.videoURL = downloadURL;
                console.log(this.urls);
                return resolve(this.urls);
              });
          }
        });
      }
      else {
        resolve();
      }
    });
  }

  //  Display selected file
  onSelectFile(event) {
    if (event.target.files) {
      const file = event.target.files[0];
      console.log(file);
      if (file.type === 'application/pdf' || file.type === 'application/msword') {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          this.filesMeta.doc = { name: file.name, url: <string>(event.target['result']), size: file.size, file: file };
        }
      }
      else if (file.type === 'image/png' || file.type === 'image/jpeg') {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          this.filesMeta.image = { name: file.name, url: <string>(event.target['result']), size: file.size, file: file };
        }
      }
      else if (
        file.type === 'video/mp4' ||
        file.type === 'video/x-matroska' ||
        file.type === 'video/3gpp') {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          this.filesMeta.video = { name: file.name, url: <string>(event.target['result']), size: file.size, file: file };
          console.log(this.filesMeta);
        }
      }
    }
    else {
      this.filesMeta = undefined;
    }
  }
}
