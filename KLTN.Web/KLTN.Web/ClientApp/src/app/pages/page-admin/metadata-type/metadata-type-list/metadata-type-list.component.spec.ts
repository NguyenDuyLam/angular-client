import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataTypeListComponent } from './metadata-type-list.component';

describe('MetadataTypeListComponent', () => {
  let component: MetadataTypeListComponent;
  let fixture: ComponentFixture<MetadataTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetadataTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
