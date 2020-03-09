import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { MetadataTypeService } from '../../../../services/metadataType/metadata-type.service';
import { MetadataValueService } from 'src/app/services/metadataValue/metadata-value.service';

@Component({
  selector: 'app-metadata-value-detail',
  templateUrl: './metadata-value-detail.component.html',
  styleUrls: ['./metadata-value-detail.component.css']
})
export class MetadataValueDetailComponent implements OnInit {

    @Input() params: any;

    metadataValueForm: FormGroup;

    isLoading = false;
    metadataTypes: any[] = [];

    modelSearch = {
        id: ''
    }


    constructor(
        private fb: FormBuilder,
        private modal: NzModalRef,
        private msg?: NzMessageService,
        private metaTypeSv?: MetadataTypeService,
        private metaValueSv?: MetadataValueService
    ) { }

    ngOnInit() {
        this.metadataValueForm = this.fb.group({
            id: ['3761607a-a17b-40c8-bfcc-6658fac1ac8d'],
            code: [, [Validators.required]],
            name: [, [Validators.required]],
            typeId: ['', [Validators.required]]
        });
        this.getMetadataType();
        if(this.params.id !== '') {
            this.getById();
        }
    }

    async getById() {
        try {
            this.modelSearch.id = this.params.id;
            const res = await this.metaValueSv.getById(this.modelSearch);
            this.metadataValueForm.patchValue(res);
        }
        catch (e) {
            console.log(e);
        }
    }

    async getMetadataType() {
        try {
            const res: any = await this.metaTypeSv.getAll();
            this.metadataTypes = res;
        }
        catch (e) {
            console.log(e);
        }
    }

    cancel() {
        this.modal.destroy();
    }

    save() {
        if (!this.metadataValueForm.invalid) {
            if (this.params.id === '') {
                const res = this.metaValueSv.add(this.metadataValueForm.value);
                if (res) {
                    this.msg.success('Thêm thành công');
                    this.modal.destroy();
                }
            }
            else {
                const res = this.metaValueSv.update(this.metadataValueForm.value);
                if (res) {
                    this.msg.success('Sửa thành công');
                    this.modal.destroy();
                }
            }
        }
        else {
            this.validateData(this.metadataValueForm);
        }
    }

    validateData(form: any) {
        for (const i in form.controls) {
            form.controls[i].markAsDirty();
            form.controls[i].updateValueAndValidity();
        }
    }

    showExplain(formControlName: string, errorString?: string) {
        return this.metadataValueForm.get(formControlName).dirty && this.metadataValueForm.get(formControlName).errors
            && this.metadataValueForm.get(formControlName).errors[errorString];
    }

}
