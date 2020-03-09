import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
  selector: 'app-menu-detail',
  templateUrl: './menu-detail.component.html',
  styleUrls: ['./menu-detail.component.css']
})
export class MenuDetailComponent implements OnInit {

  @Input() params: any;
  
  isLoading = false;

  menuForm: FormGroup;

  modelSearch = {
      id: ''
  }

  menus: any[] = [];

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private msg?: NzMessageService,
    private menuSv?: MenuService
  ) { }

  ngOnInit() {
    this.menuForm = this.fb.group({
      id: ['3761607a-a17b-40c8-bfcc-6658fac1ac8d'],
      code: [, [Validators.required]],
      name: [, [Validators.required]],
      parentId: [],
    });
    this.getParent();
    if(this.params.id !== '') {
      this.getById();
    }
  }

  cancel() {
    this.modal.destroy();
  }

  async getById() {
    try {
        this.modelSearch.id = this.params.id;
        const res = await this.menuSv.getById(this.modelSearch);
        this.menuForm.patchValue(res);
    }
    catch (e) {
        console.log(e);
    }
  } 

  save() {
    if (!this.menuForm.invalid) {
      if (this.params.id === '') {
        const res = this.menuSv.add(this.menuForm.value);
        if (res) {
            this.msg.success('Thêm thành công');
            this.modal.destroy();
        }
      }
      else {
        const res = this.menuSv.update(this.menuForm.value);
        if (res) {
            this.msg.success('Sửa thành công');
            this.modal.destroy();
        }
      }
    }
    else {
        this.validateData(this.menuForm);
    }
  } 

  async getParent() {
    try {
      const res: any = await this.menuSv.getAll();
      this.menus = res;
    }
    catch(e) {
      console.log(e);
    }
  }

  validateData(form: any) {
    for (const i in form.controls) {
        form.controls[i].markAsDirty();
        form.controls[i].updateValueAndValidity();
    }
  }

  showExplain(formControlName: string, errorString?: string) {
    return this.menuForm.get(formControlName).dirty && this.menuForm.get(formControlName).errors
        && this.menuForm.get(formControlName).errors[errorString];
  }

}
