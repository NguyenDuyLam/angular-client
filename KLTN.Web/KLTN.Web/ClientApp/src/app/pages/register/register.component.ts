import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MetadataValueService } from 'src/app/services/metadataValue/metadata-value.service';
import { AuthUserService } from 'src/app/services/authUser/auth-user.service';
import { MetadataTypeEnum } from 'src/app/enum/MetadataType.enum';
import { Role } from 'src/app/enum/role.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  districtDisable = true;

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

  constructor(
    private fb: FormBuilder,
    private metaValueSv?: MetadataValueService,
    private authSv?: AuthUserService,
    private router?: Router,
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      id: ['3761607a-a17b-40c8-bfcc-6658fac1ac8d'],
      fullname: [, [Validators.required]],
      username: [, [Validators.required]],
      password: [, [Validators.required]],
      email: [, [Validators.required]],
      birthDate: [new Date(), [Validators.required]],
      genderId: [, [Validators.required]],
      phoneNumber: [, [Validators.required]],
      role: [Role.Member],
      address: [, [Validators.required]],
      districtId: [, [Validators.required]],
      provinceId: [, [Validators.required]],
      isActivated: [true],
    });

    this.getData();
  }

  async submitForm() {
    const res = await this.authSv.add(this.registerForm.value);
    if (res) {
      this.router.navigate(['/login']);
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
        this.modelGetData.provinceId = this.registerForm.controls.provinceId.value;
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
    return this.registerForm.get(formControlName).dirty && this.registerForm.get(formControlName).errors
        && this.registerForm.get(formControlName).errors[errorString];
  }


}
