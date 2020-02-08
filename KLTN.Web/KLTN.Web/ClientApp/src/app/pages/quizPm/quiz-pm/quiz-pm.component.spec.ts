import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizPmComponent } from './quiz-pm.component';

describe('QuizPmComponent', () => {
  let component: QuizPmComponent;
  let fixture: ComponentFixture<QuizPmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizPmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizPmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
