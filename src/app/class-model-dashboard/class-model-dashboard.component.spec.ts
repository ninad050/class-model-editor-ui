import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassModelDashboardComponent } from './class-model-dashboard.component';

describe('ClassModelDashboardComponent', () => {
  let component: ClassModelDashboardComponent;
  let fixture: ComponentFixture<ClassModelDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassModelDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassModelDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
