import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubClassAttributePropertiesComponent } from './sub-class-attribute-properties.component';

describe('SubClassAttributePropertiesComponent', () => {
  let component: SubClassAttributePropertiesComponent;
  let fixture: ComponentFixture<SubClassAttributePropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubClassAttributePropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubClassAttributePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
