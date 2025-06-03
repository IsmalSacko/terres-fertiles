import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowOverviewComponent } from './workflow-overview.component';

describe('WorkflowOverviewComponent', () => {
  let component: WorkflowOverviewComponent;
  let fixture: ComponentFixture<WorkflowOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkflowOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkflowOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
