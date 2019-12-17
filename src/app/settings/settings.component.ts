import { Component, OnInit } from '@angular/core';
import { UploadfilesService } from '../service/uploadfiles.service';
import { AuthenticationService } from '../service/auth-service/authentication.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  password: string;
  settings: FormGroup;
  user;

key;
  constructor(
    public uploadfilesService: UploadfilesService,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,


  ) { }

  ngOnInit() {
    let id = localStorage.getItem('userMeta');
    this.key = id;

    this.settings = new FormGroup({
      profile_image: new FormControl(''),
      about: new FormGroup({

        aboutnote: new FormControl(''),
        city: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
        phonenumber: new FormControl('' ,[
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.maxLength(13),
        ]),

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
      .then((urls) => {
      console.log(urls['imageURL']);

        if (urls['imageURL'])
          this.settings.controls.profile_image.setValue(urls['imageURL']);
        const obj = { form: this.settings.value, id: this.key };
        console.log(obj);
        this.authService.Updatesettings(obj)
          .subscribe((data: any) => {

          });
      });

  }

}
