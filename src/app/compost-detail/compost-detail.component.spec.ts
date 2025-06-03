import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompostDetailComponent } from './compost-detail.component';

describe('CompostDetailComponent', () => {
  let component: CompostDetailComponent;
  let fixture: ComponentFixture<CompostDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompostDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
