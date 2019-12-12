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
    this.authService.user.subscribe((user: any) => {
      this.user = user;
      this.settings = new FormGroup({
        profile_image: new FormControl(''),
        about: new FormGroup({

          aboutnote: new FormControl(''),
          facebook: new FormControl(''),
          instagram: new FormControl(''),
          twitter: new FormControl(''),
          google: new FormControl('')

        })
      });
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
    console.log(this.settings.value);



    this.uploadfilesService.uploadFile()
      .then((fileMeta) => {
        this.settings.controls.profile_image.setValue(fileMeta['url']);
        this.authService.Updatesettings(this.settings.value , this.user.id )
          .subscribe((data: any) => {

          });
      });
  }

}
