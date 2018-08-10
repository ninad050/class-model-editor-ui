import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubClassTriggerActionPropertiesComponent } from './sub-class-trigger-action-properties.component';

describe('SubClassTriggerActionPropertiesComponent', () => {
  let component: SubClassTriggerActionPropertiesComponent;
  let fixture: ComponentFixture<SubClassTriggerActionPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubClassTriggerActionPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubClassTriggerActionPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
