import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubClassRelationPropertiesComponent } from './sub-class-relation-properties.component';

describe('SubClassRelationPropertiesComponent', () => {
  let component: SubClassRelationPropertiesComponent;
  let fixture: ComponentFixture<SubClassRelationPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubClassRelationPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubClassRelationPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
