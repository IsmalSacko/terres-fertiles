import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { GisementService, Gisement, DocumentGisement } from '../services/gisement.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { ChantierService, Chantier } from '../services/chantier.service';

@Component({
  selector: 'app-gisement-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    RouterModule
  ],
  templateUrl: './gisement-detail.component.html',
  styleUrls: ['./gisement-detail.component.css']
})
export class GisementDetailComponent implements OnInit {
  gisement: Gisement = {
    id: 0,
    chantier: 0,
    documents: [],
    commune: '',
    periode_terrassement: '',
    volume_terrasse: 0,
    materiau: '',
    localisation: '',
    latitude: null,
    longitude: null,
    type_de_sol: 'limon'
  };
  loading = false;
  errorMsg = '';
  mode: 'view' | 'edit' = 'view';
  chantiers: Chantier[] = [];
  originalGisement: Gisement | null = null;
  documents: DocumentGisement[] = [];

  typeSolOptions = [
    { value: 'limon', viewValue: 'Limon' },
    { value: 'sableux', viewValue: 'Sableux' },
    { value: 'argileux', viewValue: 'Argileux' },
    { value: 'caillouteux', viewValue: 'Caillouteux' },
    { value: 'autre', viewValue: 'Autre' },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gisementService: GisementService,
    private chantierService: ChantierService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const mode = this.route.snapshot.paramMap.get('mode');
    
    if (mode === 'edit' || mode === 'view') {
      this.mode = mode;
    }
    
    if (id && id !== 'new') {
      this.loadGisement(Number(id));
    }
  }

  private async loadGisement(id: number): Promise<void> {
    this.loading = true;
    this.errorMsg = '';
    try {
      const loadedGisement = await this.gisementService.getById(id);
      this.gisement = loadedGisement;
      this.originalGisement = { ...loadedGisement };
      this.documents = loadedGisement.documents || [];

      // Charger les chantiers si on est en mode édition
      if (this.mode === 'edit') {
        await this.loadChantiers();
      }
    } catch (err) {
      console.error('Erreur lors du chargement du gisement:', err);
      this.errorMsg = 'Erreur lors du chargement du gisement.';
    } finally {
      this.loading = false;
    }
  }

  private async loadChantiers(): Promise<void> {
    try {
      this.chantiers = await this.chantierService.getAll();
    } catch (err) {
      console.error('Erreur lors du chargement des chantiers:', err);
      this.errorMsg = 'Erreur lors du chargement des chantiers.';
    }
  }

  downloadDocument(doc: DocumentGisement): void {
    window.open(doc.fichier, '_blank');
  }

  previewDocument(doc: DocumentGisement): void {
    // Pour les PDF, on peut utiliser un viewer intégré ou ouvrir dans un nouvel onglet
    if (doc.fichier.toLowerCase().endsWith('.pdf')) {
      window.open(doc.fichier, '_blank');
    } else {
      // Pour les autres types de fichiers, on peut afficher un message
      this.errorMsg = 'L\'aperçu n\'est disponible que pour les fichiers PDF.';
    }
  }

  goBack(): void {
    this.router.navigate(['/gisements']);
  }

  editGisement() {
    this.router.navigate(['/gisements', this.gisement.id, { mode: 'edit' }]).then(() => {
      window.location.reload();
    });
  }
  

  async saveGisement(): Promise<void> {
    if (!this.gisement || !this.gisement.chantier) {
      this.errorMsg = 'Veuillez remplir les champs requis.';
      return;
    }

    this.loading = true;
    this.errorMsg = '';
    try {
      if (this.mode === 'edit' && this.gisement.id !== null) {
        await this.gisementService.update(this.gisement.id, this.gisement);
      } else if (this.gisement) {
        await this.gisementService.create(this.gisement);
      }
      this.router.navigate(['/gisements']);
    } catch (err: any) {
      this.errorMsg = err.response?.data?.message || 'Erreur lors de la sauvegarde du gisement.';
    } finally {
      this.loading = false;
    }
  }

  cancelEdit(): void {
    if (this.mode === 'edit' && this.originalGisement) {
      this.gisement = { ...this.originalGisement };
    }
    if (this.gisement && this.gisement.id) {
      this.router.navigate(['/gisements', this.gisement.id], { queryParams: { mode: 'view' } });
    } else {
      this.router.navigate(['/gisements']);
    }
  }

  async deleteGisement(): Promise<void> {
    if (this.mode === 'edit' && this.gisement && this.gisement.id !== null && confirm('Confirmer la suppression de ce gisement ?')) {
      this.loading = true;
      try {
        await this.gisementService.delete(this.gisement.id);
        this.router.navigate(['/gisements']);
      } catch (err: any) {
        this.errorMsg = err.response?.data?.message || 'Erreur lors de la suppression du gisement.';
        this.loading = false;
      }
    }
  }

  getChantierNom(chantierId: number | null): string {
    if (chantierId === null) {
      return 'N/A';
    }
    const chantier = this.chantiers.find(c => c.id === chantierId);
    return chantier ? chantier.nom : 'Chantier inconnu';
  }

  getSolTypeName(typeDeSolValue: string): string {
    const option = this.typeSolOptions.find(opt => opt.value === typeDeSolValue);
    return option ? option.viewValue : typeDeSolValue;
  }
}
