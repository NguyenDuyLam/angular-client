import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/common/authentication.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import StorageHelper from '../../services/common/storage-helper';
import { Role } from '../../enum/role.enum';
import { AuthService, SocialUser, GoogleLoginProvider, FacebookLoginProvider } from "ng4-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    validateForm: FormGroup;
    isVisible = false;
    isConfirmLoading = false;

    user: any =  SocialUser;
    keyGoogle = "userGoogle";
    keyFacebook = "userFacebook";



    constructor(
        private fb: FormBuilder,
        private msg?: NzMessageService,
        private socialAuthService?: AuthService,
        private router?: Router,

    ) { }

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            userName: [null, [Validators.required]],
            password: [null, [Validators.required]],
        });
        // var check = this.auth.isLogin();
        // if (check) {
        //     if (this.auth.currentUser.role === Role.Administrator) {
        //         this.router.navigate(['/admin']);
        //     }
        //     if (this.auth.currentUser.role === Role.Member) {
        //         this.router.navigate(['/index']);
        //     }
        // }
        // else {
        //     this.router.navigate(['/login']);
        // }
    }



    async submitForm() {
        // if (!this.validateForm.invalid) {
        //     var res: any = await this.auth.login(this.validateForm.controls.userName.value, this.validateForm.controls.password.value);

        //     if (res) {
        //         if (this.auth.currentUser.role === Role.Administrator) {
        //             this.router.navigate(['/admin']);
        //         }
        //         if (this.auth.currentUser.role === Role.Member) {
        //             this.router.navigate(['/index']);
        //         }
        //     }
        //     else {
        //         this.msg.error('Đăng nhập thất bại');
        //     }
        // }
        // else {
        //     this.validateData(this.validateForm);
        // }
    }

    // facebookLogin() {
    //   this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(async (userData) => {
    //     this.user = userData;
    //     var userJson = JSON.stringify(this.user);
    //     console.log(userJson)
    //     StorageHelper.setStorageValue(this.keyFacebook, userJson);
    //     this.router.navigate(['/products']);
    //     console.log("aa")

    //   })
    // }
    facebookLogin() {
      this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData) => {
        this.user = userData;

        var userJsons = JSON.stringify(this.user);
        console.log(userJsons)
        console.log(userJsons)
        StorageHelper.setStorageValue(this.keyFacebook, userJsons);
        this.router.navigate(['/landingPage']);


      })
    }

     googleLogin() {
       this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(async (userData) =>  {
        this.user = userData;
        var userJson = JSON.stringify(this.user);
        console.log(userJson);
        StorageHelper.setStorageValue(this.keyGoogle, userJson);
        this.router.navigate(['/products'], );
      });
    }


    validateData(form: any) {
        for (const i in form.controls) {
            form.controls[i].markAsDirty();
            form.controls[i].updateValueAndValidity();
        }
    }

    showExplain(formControlName: string, errorString?: string) {
        return this.validateForm.get(formControlName).dirty && this.validateForm.get(formControlName).errors
            && this.validateForm.get(formControlName).errors[errorString];
    }


    google() {
        console.log('google');
    }

    facebook() {
        console.log('facebook');
    }

    forgotPassword() {
        console.log('forgot password');
    }

    register() {
        this.router.navigate(['/register']);
    }

    showModal(): void {
      this.isVisible = true;
    }

    handleOk(): void {
      this.isConfirmLoading = true;
      setTimeout(() => {
        this.isVisible = false;
        this.isConfirmLoading = false;
      }, 3000);
    }

    handleCancel(): void {
      this.isVisible = false;
    }
    // showModal(): void {
    //   this.isVisible = true;
    // }

    // handleOk(): void {
    //   console.log('Button ok clicked!');
    //   this.isVisible = false;
    // }

    // handleCancel(): void {
    //   console.log('Button cancel clicked!');
    //   this.isVisible = false;
    // }

}
