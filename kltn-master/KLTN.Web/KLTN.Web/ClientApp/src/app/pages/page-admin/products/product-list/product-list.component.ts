import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService, NzFormatEmitEvent } from 'ng-zorro-antd';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from 'src/app/services/product/product.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { MetadataTypeEnum } from 'src/app/enum/MetadataType.enum';
import { MetadataValueService } from 'src/app/services/metadataValue/metadata-value.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    defaultCheckedKeys = ['10020'];
    defaultSelectedKeys = ['10010'];
    defaultExpandedKeys = ['100', '1001'];
    isLoading = false;

    tableInfo = {
        loading: false,
        pageIndex: 1,
        total: 0,
        pageSize: 10,
        keyWord: '',
    }
    status = false;

    modelSearch = {
        name: '',
        ProducerId: '',
        field: '',
        menuId: '',
    }

    modelDelete = {
        id: '',
       
    }

    nodes: any[] = [];
    menus: any[] = [];

    selectedProducer = null;

    productTypes: any[] = [];
    producers: any[] = [];
    products: any[] = [];

    constructor(
        private modalService: NzModalService,
        private msg?: NzMessageService,
        private menuSv?: MenuService,
        private productSv?: ProductService,
        private metaValueSv?: MetadataValueService
    ) { }

    ngOnInit() {
        this.getDataForTree();
        this.getData();
        this.getList();
    }

    async getDataForTree() {
        try {
          this.nodes = [];
            this.isLoading = true;
            const res: any = await this.menuSv.getAll();
            this.menus = res;
            this.createTree();
        }
        catch(e) {
            console.log(e);
        }
        finally {
            this.isLoading = false;
        }
    }

    createTree() {
        this.menus.forEach(item => {
          if(item.parentId === null) {
            this.nodes = [...this.nodes, {title: item.name, key: item.id, expanded: false ,level: 0, checked: true  , children: [] }];
            this.addChildren(this.nodes[this.nodes.length - 1]);
          }
        });
    }
    
      
    addChildren(node: any) {
        this.menus.forEach(item => {
          if(node.key === item.parentId) {
            node.children = [...node.children, {title: item.name, key: item.id , children: [], expanded: true, level: node.level + 1}];
            this.addChildren(node.children[node.children.length - 1]);
          }
        });
    }

    async getList() {
        try {
            this.tableInfo.loading = true;
            const res: any = await this.productSv.getAll();
            this.products = res;
          }
          catch(e) {
            console.log(e);
          }
          finally {
            this.tableInfo.loading = false;
        }
    }

    edit(model: any = null) {
        const addModal = 'Thêm sản phẩm';
        const editModal = 'Sửa sản phẩm';
        const modal = this.modalService.create({
            nzTitle: model && model.id ? editModal : addModal,
            nzMaskClosable: false,
            nzWidth: 800,
            nzContent: ProductDetailComponent,
            nzComponentParams: {
                params: {
                    id: model ? model.id : '',
                }
            },
            nzFooter: [{
                label: 'Hủy bỏ',
                onClick: (component) => {
                    component.cancel();
                }
            },
            {
                label: 'Lưu',
                type: 'primary',
                onClick: (component) => {
                    component.save();
                }
            }]
        });
        modal.afterClose.subscribe((result) => {
            this.search();
        });
    }

    async deleteRow(id: any) {
        try {
            this.modelDelete.id = id;
            var res: any = await this.productSv.delete(this.modelDelete);
            if(res) {
                this.msg.success('Xóa thành công');
                this.refresh();
            }
        }
        catch(e){
            console.log(e);
        }
    }

    refresh() {
        if (this.tableInfo.keyWord === '' && this.selectedProducer === null) {
            this.getList(); 
        }
        else {
            this.search();
        }
    }

    async search() {
        try {
            this.tableInfo.loading = true;
            if(this.tableInfo.keyWord !== '') {
                this.modelSearch.name = this.tableInfo.keyWord.trim().toLowerCase();
                this.status = true;
            }
            if(this.selectedProducer !== null) {
                this.modelSearch.ProducerId = this.selectedProducer;
                this.status = true;
            }
            if(this.modelSearch && this.status === true) {
                const res = await this.productSv.filter(this.modelSearch);
                this.products = res;
            }
            else {
                this.getList();
            }
        }
        catch(e) {
            console.log(e);
        }
        finally {
            this.tableInfo.loading = false;
            this.modelSearch.name = '';
            this.modelSearch.ProducerId = null;
            this.status = false;
        }
    }

    async getData() {
        try {
            this.modelSearch.field = MetadataTypeEnum.PRODUCER;
            const resProvince = await this.metaValueSv.filter(this.modelSearch);
            this.producers = resProvince;
            this.producers.sort(function(a, b) {
                var textA = a.name.toUpperCase();
                var textB = b.name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
        }
        catch(e) {
            console.log(e);
        }
        finally {
            this.modelSearch.field = '';
        }
    }

    async updateTable(data: any) {
        try {
            this.tableInfo.loading = true;
            this.modelSearch.menuId = data.key;
            const res = await this.productSv.filter(this.modelSearch);
            this.products = res;
        }
        catch(e) {
            console.log(e);
        }
        finally {
            this.tableInfo.loading = false
            this.modelSearch.menuId = null;
        }
    }

    activeNode(data: NzFormatEmitEvent) {
        console.log('activeNode');
        console.log(data);
    }

    nzCheck(data: NzFormatEmitEvent): void {
        console.log('nzCheck');
    }
}
