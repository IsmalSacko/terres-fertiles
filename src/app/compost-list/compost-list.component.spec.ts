import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompostListComponent } from './compost-list.component';

describe('CompostListComponent', () => {
  let component: CompostListComponent;
  let fixture: ComponentFixture<CompostListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompostListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
