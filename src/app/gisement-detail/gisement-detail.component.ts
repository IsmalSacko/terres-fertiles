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
import { GoogleMapsModule } from '@angular/google-maps';

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
    RouterModule,
    GoogleMapsModule
  ],
  templateUrl: './gisement-detail.component.html',
  styleUrls: ['./gisement-detail.component.css']
})
export class GisementDetailComponent implements OnInit {
  gisement: Partial<Gisement> = {};
  loading = false;
  errorMsg = '';
  isEditMode = false;
  isViewOnly = false;
  chantiers: Chantier[] = [];
  originalGisement: Gisement | null = null;
  documents: DocumentGisement[] = [];

  mapCenter: google.maps.LatLngLiteral = { lat: 48.8566, lng: 2.3522 };
  mapZoom = 14;
  markerOptions: google.maps.MarkerOptions = { draggable: true };
  markerPosition?: google.maps.LatLngLiteral;

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
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state?.['viewOnly']) this.isViewOnly = true;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.loadGisement(Number(id));
      this.isEditMode = !this.isViewOnly;
    } else {
      this.gisement = {
        nom: '',
        commune: '',
        periode_terrassement: '',
        volume_terrasse: 0,
        materiau: '',
        localisation: '',
        latitude: 48.8566,
        longitude: 2.3522,
        type_de_sol: 'limon'
      };
      this.mapCenter = {
        lat: this.gisement.latitude!,
        lng: this.gisement.longitude!,
      };
      this.markerPosition = { ...this.mapCenter };
    }
  }

  async loadGisement(id: number): Promise<void> {
    this.loading = true;
    try {
      const loadedGisement = await this.gisementService.getById(id);
      this.gisement = loadedGisement;
      this.originalGisement = { ...loadedGisement };
      this.documents = loadedGisement.documents || [];

      if (this.gisement.latitude && this.gisement.longitude) {
        this.mapCenter = {
          lat: this.gisement.latitude,
          lng: this.gisement.longitude,
        };
        this.markerPosition = { ...this.mapCenter };
      }

      // Charger les chantiers si on est en mode édition
      if (this.isEditMode) {
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
    if (doc.fichier.toLowerCase().endsWith('.pdf')) {
      window.open(doc.fichier, '_blank');
    } else {
      this.errorMsg = 'L\'aperçu n\'est disponible que pour les fichiers PDF.';
    }
  }

  goBack(): void {
    this.router.navigate(['/gisements']);
  }

  editGisement() {
    if (this.gisement.id) {
      this.router.navigate(['/gisements', this.gisement.id, { mode: 'edit' }]).then(() => {
        window.location.reload();
      });
    }
  }
  

  async saveGisement(): Promise<void> {
    if (!this.gisement || !this.gisement.chantier) {
      this.errorMsg = 'Veuillez remplir les champs requis.';
      return;
    }

    this.loading = true;
    this.errorMsg = '';
    try {
      if (this.isEditMode && this.gisement.id) {
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
    if (this.isEditMode && this.originalGisement) {
      this.gisement = { ...this.originalGisement };
    }
    if (this.gisement && this.gisement.id) {
      this.router.navigate(['/gisements', this.gisement.id], { queryParams: { mode: 'view' } });
    } else {
      this.router.navigate(['/gisements']);
    }
  }

  async deleteGisement(): Promise<void> {
    if (this.isEditMode && this.gisement && this.gisement.id && confirm('Confirmer la suppression de ce gisement ?')) {
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

  // Méthodes pour la carte Google Maps
  updatePosition(event: google.maps.MapMouseEvent): void {
    if (this.isViewOnly || !event.latLng) return;
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    this.gisement.latitude = lat;
    this.gisement.longitude = lng;
    this.markerPosition = { lat, lng };
  }

  onMarkerDragEnd(event: google.maps.MapMouseEvent): void {
    if (!event.latLng) return;
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    this.gisement.latitude = lat;
    this.gisement.longitude = lng;
    this.markerPosition = { lat, lng };
  }

  openGoogleMaps(): void {
    if (this.gisement.latitude && this.gisement.longitude) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${this.gisement.latitude},${this.gisement.longitude}`;
      window.open(url, '_blank');
    }
  }
}
