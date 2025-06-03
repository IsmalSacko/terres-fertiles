import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTechniqueDetailComponent } from './document-technique-detail.component';

describe('DocumentTechniqueDetailComponent', () => {
  let component: DocumentTechniqueDetailComponent;
  let fixture: ComponentFixture<DocumentTechniqueDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentTechniqueDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentTechniqueDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
