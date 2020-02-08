import { Component, OnInit, ViewChild } from '@angular/core';
import { NzTreeComponent, NzFormatEmitEvent, NzTreeNode, NzModalService, NzMessageService } from 'ng-zorro-antd';
import { MetadataValueService } from 'src/app/services/metadataValue/metadata-value.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { MenuDetailComponent } from '../menu-detail/menu-detail.component';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {

 
  defaultCheckedKeys = ['10020'];
  defaultSelectedKeys = ['10010'];
  defaultExpandedKeys = ['100', '1001'];
  isLoading = false;

  nodes: any[] = [];
  menus: any[] = [];
  dataTable: any[] =[];
  levelNodes: any[] = [];
  dataTree: any[] = [];
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
      code: '',
      typeId: '',
      id: '',
  }
  
  modelDelete = {
      id: ''
  }
  //this.nodes = [...this.nodes, {title: data[i].name, key: data[i].id , isActive: data[i].isActive , expanded: true , checked: true  , children: [] }];
  //node.children = [...node.children, {title: this.salesOrganizationStructures[i].name, key: this.salesOrganizationStructures[i].id , isActive: this.salesOrganizationStructures[i].isActive , children: [], expanded: true}];
  
  
  constructor(
    private modalService: NzModalService,
    private msg?: NzMessageService,
    private metaValueSv?: MetadataValueService,
    private menuSv?: MenuService
  ) { }

  ngOnInit() {
    this.getDataForTree();
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

  async getList() {
    try {
      this.tableInfo.loading = true;
      const res: any = await this.menuSv.getAll();
      this.dataTable = res;
    }
    catch(e) {
      console.log(e);
    }
    finally {
      this.tableInfo.loading = false;
    }
  }


  createTree() {
    this.menus.forEach(item => {
      if(item.parentId === null) {
        this.nodes = [...this.nodes, {title: item.name, key: item.id, expanded: false ,level: 0, checked: true  , children: [] }];
        this.levelNodes = [...this.levelNodes, {level: 0}];
        this.dataTree = [...this.dataTree,{title: item.name, key: item.id, level: 0} ]
        this.addChildren(this.nodes[this.nodes.length - 1]);
      }
    });
  }

  
  addChildren(node: any) {
    this.menus.forEach(item => {
      if(node.key === item.parentId) {
        node.children = [...node.children, {title: item.name, key: item.id , children: [], expanded: false, level: node.level + 1}];
        this.levelNodes = [...this.levelNodes, {level: node.level + 1}];
        this.dataTree = [...this.dataTree,{title: item.name, key: item.id, level: node.level + 1} ]
        this.addChildren(node.children[node.children.length - 1]);
      }
    });
    
  }

  async deleteRow(id: any) {
    try {
        var menu: any = this.dataTree.find(x => x.key === id);
        var flag = false;
        this.menus.forEach(item => {
            if (item.parentId === menu.key) {
                flag = true;
            }
        });
        if(flag === false) {
          this.modelDelete.id = id;
          var res: any = await this.menuSv.delete(this.modelDelete);
          if(res) {
              this.msg.success('Xóa thành công');
              this.refresh();
              this.getDataForTree();
          }
        }
        else {
          this.msg.warning('Chỉ được xóa Node con');
        }
    }
    catch(e){
        console.log(e);
    }
  }

  findMax() {
    var max = 0;
    this.levelNodes.forEach(item => {
      if(item.level > max) {
        max = item.level;
      }
    });
    return max;
  }

  async getById(id: any) {
    try {
        console.log(this.nodes[0].level);
        var result = this.nodes.find(x => x.id === id);
        return result;
    }
    catch (e) {
        console.log(e);
    }
  } 

  async search() {
    try {
        this.tableInfo.loading = true;
        if(this.tableInfo.keyWord !== '') {
            this.modelSearch.name = this.tableInfo.keyWord.trim().toLowerCase();
            this.status = true;
        }
        if(this.modelSearch && this.status === true) {
            const res = await this.menuSv.filter(this.modelSearch);
            this.dataTable = res;
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
        this.modelSearch.typeId = '';
        this.status = false;
    }
  }

  refresh() {
    if (this.tableInfo.keyWord === '') {
        this.getList(); 
    }
    else {
        this.search();
    }
  }

  edit(model: any = null) {
    const addModal = 'Thêm Metadata';
    const editModal = 'Sửa Metadata';
    const modal = this.modalService.create({
        nzTitle: model && model.id ? editModal : addModal,
        nzMaskClosable: false,
        nzWidth: 800,
        nzContent: MenuDetailComponent,
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
        this.refresh();
        this.getDataForTree();
    });
}

  nzCheck(data: NzFormatEmitEvent): void {
    console.log(data);
  }

  updateTable(data: NzTreeNode) {

  }

  openFolder(data: NzTreeNode | Required<NzFormatEmitEvent>) {

  }

  activeNode(data: NzFormatEmitEvent) {
    console.log(data);
  }

}
