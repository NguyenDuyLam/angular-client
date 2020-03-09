import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataTypeDetailComponent } from './metadata-type-detail.component';

describe('MetadataTypeDetailComponent', () => {
  let component: MetadataTypeDetailComponent;
  let fixture: ComponentFixture<MetadataTypeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetadataTypeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataTypeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
