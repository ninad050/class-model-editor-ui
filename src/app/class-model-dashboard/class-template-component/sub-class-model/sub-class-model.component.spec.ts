import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubClassModelComponent } from './sub-class-model.component';

describe('SubClassModelComponent', () => {
  let component: SubClassModelComponent;
  let fixture: ComponentFixture<SubClassModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubClassModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubClassModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
