import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataValueDetailComponent } from './metadata-value-detail.component';

describe('MetadataValueDetailComponent', () => {
  let component: MetadataValueDetailComponent;
  let fixture: ComponentFixture<MetadataValueDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetadataValueDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataValueDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
