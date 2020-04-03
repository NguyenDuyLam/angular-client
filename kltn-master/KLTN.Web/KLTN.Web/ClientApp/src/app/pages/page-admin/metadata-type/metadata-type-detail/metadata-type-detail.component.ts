import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { MetadataTypeService } from '../../../../services/metadataType/metadata-type.service';

@Component({
  selector: 'app-metadata-type-detail',
  templateUrl: './metadata-type-detail.component.html',
  styleUrls: ['./metadata-type-detail.component.css']
})
export class MetadataTypeDetailComponent implements OnInit {

    @Input() params: any;

    modelSearch = {
        id: ''
    }

    metadataTypeForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private modal: NzModalRef,
        private msg?: NzMessageService,
        private metaTypeSv?: MetadataTypeService
    )
    { }

    ngOnInit() {
        this.metadataTypeForm = this.fb.group({
            id: ['3761607a-a17b-40c8-bfcc-6658fac1ac8d'],
            code: [, [Validators.required]],
            name: [, [Validators.required]],
        });

        if (this.params.id !== '') {
            this.getById();
        }
    }

    cancel() {
        this.modal.destroy();
    }

    save() {
        if (!this.metadataTypeForm.invalid) {
            if (this.params.id === '') {
                const res = this.metaTypeSv.add(this.metadataTypeForm.value);
                if (res) {
                    this.msg.success('Thêm thành công');
                    this.modal.destroy();
                }
            }
            else {
                const res = this.metaTypeSv.update(this.metadataTypeForm.value);
                if (res) {
                    this.msg.success('Sửa thành công');
                    this.modal.destroy();
                }
            }
        }
        else {
            this.validateData(this.metadataTypeForm);
        }
    }

    async getById() {
        try {
            this.modelSearch.id = this.params.id;
            const res = await this.metaTypeSv.getById(this.modelSearch);
            this.metadataTypeForm.patchValue(res);
        }
        catch (e) {
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
        return this.metadataTypeForm.get(formControlName).dirty && this.metadataTypeForm.get(formControlName).errors
            && this.metadataTypeForm.get(formControlName).errors[errorString];
    }

}
