import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubClassTriggerActionComponent } from './sub-class-trigger-action.component';

describe('SubClassTriggerActionComponent', () => {
  let component: SubClassTriggerActionComponent;
  let fixture: ComponentFixture<SubClassTriggerActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubClassTriggerActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubClassTriggerActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
