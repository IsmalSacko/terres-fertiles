import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MelangeDetailComponent } from './melange-detail.component';

describe('MelangeDetailComponent', () => {
  let component: MelangeDetailComponent;
  let fixture: ComponentFixture<MelangeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MelangeDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MelangeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
