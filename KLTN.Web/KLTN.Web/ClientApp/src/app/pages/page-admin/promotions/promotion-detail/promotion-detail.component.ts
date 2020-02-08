import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { PromotionService } from 'src/app/services/promotion/promotion.service';

@Component({
  selector: 'app-promotion-detail',
  templateUrl: './promotion-detail.component.html',
  styleUrls: ['./promotion-detail.component.css']
})
export class PromotionDetailComponent implements OnInit {

    @Input() params: any;

    modelSearch = {
        id: ''
    }

    promotionForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private modal: NzModalRef,
        private msg?: NzMessageService,
        private promotionSv?: PromotionService
    ) { }

    ngOnInit() {
        this.promotionForm = this.fb.group({
            id: ['3761607a-a17b-40c8-bfcc-6658fac1ac8d'],
            code: [, [Validators.required]],
            name: [, [Validators.required]],
            disCount: [, [Validators.required]],
            description: [, [Validators.required]],
        });
        
        if(this.params.id !== '') {
            this.getById();
        }
    }

    async save() {
        if(!this.promotionForm.invalid) {
            if (this.params.id === '') {
                const res = await this.promotionSv.add(this.promotionForm.value);
                if (res) {
                    this.msg.success('Thêm thành công');
                    this.modal.destroy();
                }
            }
            else {
                const res = this.promotionSv.update(this.promotionForm.value);
                if (res) {
                    this.msg.success('Sửa thành công');
                    this.modal.destroy();
                }
            }
        }
        else {
            this.validateData(this.promotionForm);
        }
    }

    async getById() {
        try {
            this.modelSearch.id = this.params.id;
            const res = await this.promotionSv.getById(this.modelSearch);
            this.promotionForm.patchValue(res);
        }
        catch (e) {
            console.log(e);
        }
    }


    cancel() {
        this.modal.destroy();
    }

    validateData(form: any) {
        for (const i in form.controls) {
            form.controls[i].markAsDirty();
            form.controls[i].updateValueAndValidity();
        }
    }

    showExplain(formControlName: string, errorString?: string) {
        return this.promotionForm.get(formControlName).dirty && this.promotionForm.get(formControlName).errors
            && this.promotionForm.get(formControlName).errors[errorString];
    }
}
