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
      let fileName;
      let offsetRef = firebase.database().ref(".info/serverTimeOffset");
      offsetRef.on("value", (snap) => {
        let currentTime = Date.now() + snap.val();

        // The storage path
        fileName = currentTime + '_' + this.filesMeta.name;
      });

      // Reference to storage bucket
      let storageRef = firebase.storage().ref().child(`${'files'}/${fileName}`);

      // The main task
      storageRef
        .put(this.filesMeta.files)
        .then(async () => {
          // The file's download URL
          let downloadURL = await storageRef.getDownloadURL();
          let fileMetaData = {
            name: this.filesMeta.name,
            url: downloadURL,
            size: this.filesMeta.size
          }
          return resolve(fileMetaData);
        });
    });
  }
}
