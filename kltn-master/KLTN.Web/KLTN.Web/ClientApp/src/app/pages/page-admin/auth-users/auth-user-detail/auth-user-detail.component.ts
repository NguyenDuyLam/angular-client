import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { AuthUserService } from '../../../../services/authUser/auth-user.service';
import { MetadataValueService } from 'src/app/services/metadataValue/metadata-value.service';
import { MetadataTypeEnum } from 'src/app/enum/MetadataType.enum';
import { MetadataTypeService } from '../../../../services/metadataType/metadata-type.service';
import { Role } from 'src/app/enum/role.enum';


@Component({
  selector: 'app-auth-user-detail',
  templateUrl: './auth-user-detail.component.html',
  styleUrls: ['./auth-user-detail.component.css']
})
export class AuthUserDetailComponent implements OnInit {

    @Input() params: any;

    authUserForm: FormGroup;

    modelGetData = {
        Field: '',
        name: '',
        typeId: '',
        provinceId: '',
        id: '',
    }

    genders: any[] = [];
    provinces: any[] = [];
    districts: any[] = [];

    districtLoading = false;
    districtDisable = true;
    isLoading = false;  // loading chung
    test = new Date();

    constructor(
        private fb: FormBuilder,
        private modal: NzModalRef,
        private msg?: NzMessageService,
        private metaValueSv?: MetadataValueService,
        private authSv?: AuthUserService

    ) { }

    ngOnInit() {
        this.authUserForm = this.fb.group({
            id: ['3761607a-a17b-40c8-bfcc-6658fac1ac8d'],
            code: [, [Validators.required]],
            fullname: [, [Validators.required]],
            username: [, [Validators.required]],
            password: [, [Validators.required]],
            email: [, [Validators.required]],
            confirmPassword: [],
            birthDate: [new Date(), [Validators.required]],
            genderId: [, [Validators.required]],
            phoneNumber: [, [Validators.required]],
            address: [, [Validators.required]],
            role: [Role.Administrator],
            districtId: [, [Validators.required]],
            provinceId: [, [Validators.required]],
            isActivated: [true],
        });

        this.getData();

        if(this.params.id !== '') {
            this.getById();
        }
    }

    cancel() {
        this.modal.destroy();
    }
    onChange(result: Date): void {
        console.log('onChange: ', result);
    }


    async save() {
        if (!this.authUserForm.invalid) {
            if (this.params.id === '') {
                const res = await this.authSv.add(this.authUserForm.value);
                if (res) {
                    this.msg.success('Thêm thành công');
                    this.modal.destroy();
                }
            }
            else {
                const res = await this.authSv.update(this.authUserForm.value);
                if (res) {
                    this.msg.success('Sửa thành công');
                    this.modal.destroy();
                }
            }
        }
        else {
            this.validateData(this.authUserForm);
        }
    }

    async getById() {
        try {
            this.modelGetData.id = this.params.id;
            const res = await this.authSv.getById(this.modelGetData);
            this.authUserForm.patchValue(res);
        }
        catch (e) {
            console.log(e);
        }
    }

    async getData() {
        try {
            //Giới tính     
            this.modelGetData.Field = MetadataTypeEnum.GENDER;
            
            const resGenders = await this.metaValueSv.filter(this.modelGetData);
            this.genders = resGenders;
            this.genders.sort();
            //Tỉnh thành phố
            this.modelGetData.Field = MetadataTypeEnum.CITY;
            const resProvince = await this.metaValueSv.filter(this.modelGetData);
            this.provinces = resProvince;
            this.provinces.sort(function(a, b) {
                var textA = a.name.toUpperCase();
                var textB = b.name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
        }
        catch(e) {
            console.log(e);
        }
        finally {
            this.modelGetData.Field = '';
            this.modelGetData.name = '';
            this.modelGetData.typeId = '';
        }
    }

    async provinceOnchanges() {
        try {
            console.log(this.authUserForm.controls.provinceId.value);
            this.modelGetData.provinceId = this.authUserForm.controls.provinceId.value;
            const res = await this.metaValueSv.filter(this.modelGetData);
            this.districts = res;
            this.districts.sort(function(a, b) {
                var textA = a.name.toUpperCase();
                var textB = b.name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
        }
        catch(e) {
            console.log(e);
        }
        finally {
            this.districtDisable = false;
        }
    }

    validateData(form: any) {
        for (const i in form.controls) {
            form.controls[i].markAsDirty();
            form.controls[i].updateValueAndValidity();
        }
    }

    showExplain(formControlName: string, errorString?: string) {
        return this.authUserForm.get(formControlName).dirty && this.authUserForm.get(formControlName).errors
            && this.authUserForm.get(formControlName).errors[errorString];
    }

    // checkConfirmPassWordValidator = (control: FormControl): { [s: string]: boolean } => {
    //     if (!control.value) {
    //         return { required: true };
    //     } else if (control.value !== this.authUserForm.controls.password.value) {
    //         return { confirm: true, error: true };
    //     }
    //     return {};
    // };

    checkConfirmPassWordValidator() {
        if(this.authUserForm.controls.password.value === this.authUserForm.controls.confirmPassword.value) {
            return false;
        }
        return true;
    }

}
