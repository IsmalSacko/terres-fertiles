import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTechniqueListComponent } from './document-technique-list.component';

describe('DocumentTechniqueListComponent', () => {
  let component: DocumentTechniqueListComponent;
  let fixture: ComponentFixture<DocumentTechniqueListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentTechniqueListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentTechniqueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
