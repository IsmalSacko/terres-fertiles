import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MatTabsModule } from '@angular/material/tabs';
import { ChantierService, Chantier } from '../services/chantier.service';
import { GisementService, Gisement } from '../services/gisement.service';

@Component({
  selector: 'app-chantier-detail',
  templateUrl: './chantier-detail.component.html',
  styleUrls: ['./chantier-detail.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    GoogleMapsModule,
    MatTabsModule
  ],
  standalone: true
})
export class ChantierDetailComponent implements OnInit {
  chantier: Partial<Chantier> = {};
  loading = false;
  errorMsg = '';
  successMsg = '';
  isEditMode = false;
  isViewOnly = false;
  gisements: Gisement[] = [];
  google: any;
  mapCenter: google.maps.LatLngLiteral = { lat: 48.8566, lng: 2.3522 };
  mapZoom = 16;
  markerOptions: google.maps.MarkerOptions = { draggable: true };
  markerPosition?: google.maps.LatLngLiteral;

  mapOptions: google.maps.MapOptions = {
    mapTypeControl: false,
    fullscreenControl: false,
    zoomControl: true,
    streetViewControl: true
  };

  mapTypeId: google.maps.MapTypeId = google.maps.MapTypeId.ROADMAP; // Default to 'Plan'

  viewModeMarkerOptions: google.maps.MarkerOptions = {
    icon: {
      url: 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.pn',
      scaledSize: new google.maps.Size(27, 43)
    }
  };

  editModeMarkerOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: {
      url: 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.pn',
      scaledSize: new google.maps.Size(27, 43)
    }
  };

  gisementMarkerIcon: google.maps.Icon = {
    //url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
    url: 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png',

    scaledSize: new google.maps.Size(27, 43)
  };

  @ViewChild('chantierInfoWindow') chantierInfoWindow!: MapInfoWindow;
  @ViewChild('chantierInfoWindowSatellite') chantierInfoWindowSatellite!: MapInfoWindow;
  @ViewChild('gisementInfoWindow') gisementInfoWindow!: MapInfoWindow;
  @ViewChild('gisementInfoWindowSatellite') gisementInfoWindowSatellite!: MapInfoWindow;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chantierService: ChantierService,
    private gisementService: GisementService
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state?.['viewOnly']) this.isViewOnly = true;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.loadChantier(Number(id));
      this.isEditMode = !this.isViewOnly;
    } else {
      this.chantier = {
        nom: '',
        latitude: 48.8566,
        longitude: 2.3522,
      };
      this.mapCenter = {
        lat: this.chantier.latitude!,
        lng: this.chantier.longitude!,
      };
      this.markerPosition = { ...this.mapCenter };
    }
  }

  async loadChantier(id: number): Promise<void> {
    this.loading = true;
    try {
      this.chantier = await this.chantierService.getById(id);
      if (this.chantier.latitude && this.chantier.longitude) {
        this.mapCenter = {
          lat: this.chantier.latitude,
          lng: this.chantier.longitude,
        };
        this.markerPosition = { ...this.mapCenter };
      }
      await this.loadGisements(id);
    } catch (err) {
      this.errorMsg = 'Erreur lors du chargement du chantier.';
    } finally {
      this.loading = false;
    }
  }

  private async loadGisements(chantierId: number): Promise<void> {
    try {
      this.gisements = await this.gisementService.getByChantierId(chantierId);
    } catch (err) {
      console.error('Erreur lors du chargement des gisements:', err);
    }
  }

  getGisementsCount(): number {
    return this.gisements.length;
  }

  getTotalVolume(): number {
    if (!this.gisements || this.gisements.length === 0) {
      return 0;
    }
    return this.gisements.reduce((total, gisement) => {
      let volume = 0;
      if (gisement && typeof gisement === 'object' && 'volume_terrasse' in gisement) {
        const rawVolume = (gisement as Gisement).volume_terrasse;
        if (rawVolume !== null && rawVolume !== undefined) {
          const volumeAsString = String(rawVolume).trim().replace(',', '.');
          const parsedVolume = parseFloat(volumeAsString);
          if (!isNaN(parsedVolume)) {
            volume = parsedVolume;
          }
        }
      }
      return total + volume;
    }, 0);
  }

  openGisementDetails(gisement: Gisement): void {
    if (gisement.id) {
      this.router.navigate(['/gisements', gisement.id, { mode: 'view' }]);
    }
  }

  onTabChange(event: any): void {
    if (event.index === 0) {
      this.mapTypeId = google.maps.MapTypeId.ROADMAP; // Plan
    } else {
      this.mapTypeId = google.maps.MapTypeId.SATELLITE; // Satellite
    }
  }

  toggleFullscreen(): void {
    const mapElement = document.querySelector('google-map');
    if (mapElement) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        mapElement.requestFullscreen();
      }
    }
  }

  updatePosition(event: google.maps.MapMouseEvent): void {
    if (this.isViewOnly || !event.latLng) return;
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    this.chantier.latitude = lat;
    this.chantier.longitude = lng;
    this.markerPosition = { lat, lng };
  }

  onMarkerDragEnd(event: google.maps.MapMouseEvent): void {
    if (!event.latLng) return;
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    this.chantier.latitude = lat;
    this.chantier.longitude = lng;
    this.markerPosition = { lat, lng };
  }

  openGoogleMaps(): void {
    if (this.chantier.latitude && this.chantier.longitude) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${this.chantier.latitude},${this.chantier.longitude}`;
      window.open(url, '_blank');
    }
  }

  async saveChantier(): Promise<void> {
    if (!this.chantier.nom || !this.chantier.maitre_ouvrage || !this.chantier.entreprise_terrassement || !this.chantier.localisation) {
      this.errorMsg = 'Tous les champs sont requis.';
      return;
    }

    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';
    try {
      if (this.isEditMode && this.chantier.id) {
        await this.chantierService.update(this.chantier.id, this.chantier as Chantier);
        this.successMsg = 'Chantier mis à jour avec succès.';
      } else {
        await this.chantierService.create(this.chantier as Chantier);
        this.successMsg = 'Chantier créé avec succès.';
      }
      setTimeout(() => {
        this.router.navigate(['/chantiers']);
      }, 1500);
    } catch (err) {
      this.errorMsg = 'Erreur lors de la sauvegarde.';
    } finally {
      this.loading = false;
    }
  }

  async deleteChantier(): Promise<void> {
    if (!this.chantier.id) return;

    this.loading = true;
    try {
      await this.chantierService.delete(this.chantier.id);
      this.router.navigate(['/chantiers']);
    } catch (err) {
      this.errorMsg = 'Erreur lors de la suppression.';
    } finally {
      this.loading = false;
    }
  }

  cancel(): void {
    this.router.navigate(['/chantiers']);
  }

  openChantierInfoWindow(infoWindow: MapInfoWindow, marker: MapMarker) {
    infoWindow.open(marker);
  }

  openGisementInfoWindow(infoWindow: MapInfoWindow, marker: MapMarker, gisement: Gisement) {
    infoWindow.open(marker);
  }
}
