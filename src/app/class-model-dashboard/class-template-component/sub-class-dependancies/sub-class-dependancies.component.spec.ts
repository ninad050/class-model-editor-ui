import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubClassDependanciesComponent } from './sub-class-dependancies.component';

describe('SubClassDependanciesComponent', () => {
  let component: SubClassDependanciesComponent;
  let fixture: ComponentFixture<SubClassDependanciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubClassDependanciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubClassDependanciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
