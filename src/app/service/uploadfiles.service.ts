import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UploadfilesService {
  filesMeta;

  constructor() { }

  uploadFile() {
    return new Promise((resolve) => {
      if (this.filesMeta) {
        let fileName;
        let offsetRef = firebase.database().ref(".info/serverTimeOffset");
        offsetRef.on("value", async (snap) => {
          console.log("1" + snap.val());
          let currentTime = Date.now() + await snap.val();
          fileName = currentTime + '_' + this.filesMeta.name;

          let storageRef = firebase.storage().ref().child('files' + `/${fileName}`);

          storageRef
            .put(this.filesMeta.file)
            .then(async () => {
              // The file's download URL
              let downloadURL = await storageRef.getDownloadURL();
              let fileMetaData = {
                name: fileName,
                url: downloadURL,
                size: this.filesMeta.size
              }
              return resolve(fileMetaData);
            });
        });
      }
      else {
        resolve();
      }
    });
  }
}
