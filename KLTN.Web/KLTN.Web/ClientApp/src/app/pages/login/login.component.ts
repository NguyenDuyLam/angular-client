import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/common/authentication.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import StorageHelper from '../../services/common/storage-helper';
import { Role } from '../../enum/role.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    validateForm: FormGroup;

  

    constructor(
        private fb: FormBuilder,
        private msg?: NzMessageService,
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

}
