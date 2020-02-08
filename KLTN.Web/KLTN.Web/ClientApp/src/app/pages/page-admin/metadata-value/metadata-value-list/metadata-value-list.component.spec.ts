import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataValueListComponent } from './metadata-value-list.component';

describe('MetadataValueListComponent', () => {
  let component: MetadataValueListComponent;
  let fixture: ComponentFixture<MetadataValueListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetadataValueListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataValueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
