import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubClassAttributeComponent } from './sub-class-attribute.component';

describe('SubClassAttributeComponent', () => {
  let component: SubClassAttributeComponent;
  let fixture: ComponentFixture<SubClassAttributeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubClassAttributeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubClassAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
