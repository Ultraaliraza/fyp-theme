import { Component, OnInit } from '@angular/core';
import { UploadfilesService } from '../service/uploadfiles.service';
import { AuthenticationService } from '../service/auth-service/authentication.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  password: string;
  constructor(
    public uploadfilesService: UploadfilesService,
    private authService: AuthenticationService,
  ) { }

  ngOnInit() {
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


  submitFrom() {
    // const time = this.datePipe.transform(new Date(), 'MM/dd/yyyy hh:mm:ss a');
    // this.myhomeform.controls.date.setValue(time);

    this.uploadfilesService.uploadFile()
      .then((fileMeta) => {
        // this.myhomeform.controls.PostImage.setValue(fileMeta);
        // this.authService.home(this.myhomeform.value)
        // .subscribe((data: any) => {

        // });
      });
  }

}
