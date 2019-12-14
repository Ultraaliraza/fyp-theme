import { Component, OnInit } from '@angular/core';
import { UploadfilesService } from '../service/uploadfiles.service';
import { AuthenticationService } from '../service/auth-service/authentication.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  password: string;
  settings: FormGroup;
  user;


  constructor(
    public uploadfilesService: UploadfilesService,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,


  ) { }

  ngOnInit() {
     this.user = localStorage.getItem('userMeta');

    this.settings = new FormGroup({
      Profile_Image: new FormControl(''),
      about: new FormGroup({

        aboutnote: new FormControl(''),
        facebook: new FormControl(''),
        instagram: new FormControl(''),
        twitter: new FormControl(''),
        google: new FormControl('')

      })
    });
  }
  updatePassword() {
    let obj = {
      newPassword: this.password
    }
    this.authService.updatePassword(obj)
      .subscribe((success) => {
        console.log(success);
      })
  }


  submitsettings() {



    this.uploadfilesService.uploadFile()
      .then((fileMeta) => {
        if (fileMeta)
          this.settings.controls.profile_image.setValue(fileMeta['url']);
        const obj = { form: this.settings.value, id: this.user };
        console.log(obj);
        this.authService.Updatesettings(obj)
          .subscribe((data: any) => {

          });
      });
  }

}
