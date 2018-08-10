import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubClassRelationComponent } from './sub-class-relation.component';

describe('SubClassRelationComponent', () => {
  let component: SubClassRelationComponent;
  let fixture: ComponentFixture<SubClassRelationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubClassRelationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubClassRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
