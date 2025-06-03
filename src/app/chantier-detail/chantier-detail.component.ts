import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChantierService, Chantier } from '../services/chantier.service';
import {
  MapOptions,
  tileLayer,
  LatLngExpression,
  marker,
  latLngBounds,
  LatLngBounds,
  Map,
  LeafletMouseEvent
} from 'leaflet';
import * as L from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Subject } from 'rxjs';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png',
  iconRetinaUrl: 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png',
  shadowUrl: '', // Pas d’ombre disponible sur CDN Google Maps
});


@Component({
  selector: 'app-chantier-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    LeafletModule
  ],
  templateUrl: './chantier-detail.component.html',
  styleUrl: './chantier-detail.component.css'
})
export class ChantierDetailComponent implements OnInit, OnDestroy {
  chantier: Partial<Chantier> = {};
  loading = false;
  errorMsg = '';
  isEditMode = false;
  isViewOnly = false;

  // Define the base layers
  private openStreetMap = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 13,
    attribution: '© OpenStreetMap contributors'
  });

  private esriWorldImagery = tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 13,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  });

  mapOptions: MapOptions = {
    layers: [
      this.openStreetMap // Set OpenStreetMap as the default layer
    ],
    zoom: 6,
    center: [48.8566, 2.3522],
    zoomControl: true,
    attributionControl: true
  };

  // Define the layers control object
  leafletLayersControl = {
    baseLayers: {
      'Plan OpenStreetMap': this.openStreetMap,
      'Vue Satellite': this.esriWorldImagery
    },
    overlays: {}
  };

  mapLayers: L.Layer[] = [];
  mapFitBounds?: LatLngBounds;
  private map?: Map;
  private chantierMarker?: L.Marker;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chantierService: ChantierService
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['viewOnly']) {
      this.isViewOnly = true;
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.loadChantier(Number(id));
      this.isEditMode = !this.isViewOnly;
    } else {
      this.chantier = {
        nom: '',
        maitre_ouvrage: '',
        entreprise_terrassement: '',
        localisation: '',
        latitude: 48.8566,
        longitude: 2.3522
      };
      this.mapOptions.center = [this.chantier.latitude!, this.chantier.longitude!];
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onMapReady(map: Map): void {
    this.map = map;
    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
        if (this.mapFitBounds) {
          
          this.map.fitBounds(this.mapFitBounds);
        } else if (this.chantier?.latitude !== undefined && this.chantier?.longitude !== undefined) {
          this.map.setView([this.chantier.latitude, this.chantier.longitude], this.mapOptions.zoom);
        }
      }
    }, 0);
  }

  // onMapClick(event: LeafletMouseEvent): void {
  //   const lat = event.latlng.lat;
  //   const lng = event.latlng.lng;
  //   this.chantier.latitude = lat;
  //   this.chantier.longitude = lng;

  //   if (this.chantierMarker) {
  //     this.chantierMarker.setLatLng(event.latlng);
  //   } else {
  //     this.chantierMarker = marker(event.latlng, { draggable: true });
  //     this.chantierMarker.on('dragend', (e: any) => {
  //       const pos = e.target.getLatLng();
  //       this.chantier.latitude = pos.lat;
  //       this.chantier.longitude = pos.lng;
  //     });
  //     this.mapLayers.push(this.chantierMarker);
  //   }
  // }
  onMapClick(event: LeafletMouseEvent): void {
    if (this.isViewOnly) return; // 🔒 Ne rien faire en mode lecture seule
  
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;
    this.chantier.latitude = lat;
    this.chantier.longitude = lng;
  
    if (this.chantierMarker) {
      this.chantierMarker.setLatLng(event.latlng);
    } else {
      this.chantierMarker = marker(event.latlng, { draggable: true });
      this.chantierMarker.on('dragend', (e: any) => {
        const pos = e.target.getLatLng();
        this.chantier.latitude = pos.lat;
        this.chantier.longitude = pos.lng;
      });
      this.mapLayers.push(this.chantierMarker);
    }
  }
  

  async loadChantier(id: number): Promise<void> {
    this.loading = true;
    this.errorMsg = '';
    try {
      this.chantier = await this.chantierService.getById(id);

      if (this.chantier.latitude !== undefined && this.chantier.longitude !== undefined) {
        const latLng = this.normalizeCoordinates(this.chantier.latitude, this.chantier.longitude);
        
        this.mapOptions = {
          ...this.mapOptions,
          center: latLng,
          zoom: 6 
        };

        this.mapLayers = [];
        this.chantierMarker = marker(latLng, {
          draggable: !this.isViewOnly,
          title: this.chantier.nom || 'Chantier'
        });

        // Add click event to open Google Maps directions
        this.chantierMarker.on('click', () => {
          const url = `https://www.google.com/maps/dir/?api=1&destination=${this.chantier.latitude},${this.chantier.longitude}`;
          window.open(url, '_blank');
        });

       this.chantierMarker.bindPopup(`
  <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333; padding: 5px 8px;">
    <strong style="display: block; margin-bottom: 4px;">
      ${this.chantier.nom || 'Chantier'}
    </strong>
    <a href="https://www.google.com/maps/dir/?api=1&destination=${this.chantier.latitude},${this.chantier.longitude}" 
       target="_blank" 
       style="display: inline-block; color: #1976d2; text-decoration: none; font-weight: 500; margin-top: 4px;">
      🗺️ Obtenir l'itinéraire
    </a>
  </div>
`);

        // add hover event 
        
        this.chantierMarker.on('mouseover',()=>{
          this.chantierMarker?.openPopup()
        })
        
        this.chantierMarker.on('mouseout', () => {
          this.chantierMarker?.closePopup();
        });


        if (!this.isViewOnly) {
          this.chantierMarker.on('dragend', (e: any) => {
            const pos = e.target.getLatLng();
            this.chantier.latitude = pos.lat;
            this.chantier.longitude = pos.lng;
          });
        }

        this.mapLayers.push(this.chantierMarker);

        setTimeout(() => {
          if (this.map) {
            this.map.invalidateSize();
            this.map.setView(latLng, 15); // Zoom plus proche
          }
        });
        

      }
    } catch (err) {
      this.errorMsg = 'Erreur lors du chargement du chantier.';
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  async saveChantier(): Promise<void> {
    const chantierToSave: Omit<Chantier, 'id'> = {
      nom: this.chantier.nom || '',
      maitre_ouvrage: this.chantier.maitre_ouvrage || '',
      entreprise_terrassement: this.chantier.entreprise_terrassement || '',
      localisation: this.chantier.localisation || '',
      latitude: this.chantier.latitude || 0,
      longitude: this.chantier.longitude || 0
    };

    this.loading = true;
    this.errorMsg = '';
    try {
      if (this.isEditMode && this.chantier.id !== undefined) {
        await this.chantierService.update(this.chantier.id, { ...chantierToSave, id: this.chantier.id });
      } else {
        await this.chantierService.create(chantierToSave as Chantier);
      }
      this.router.navigate(['/chantiers']);
    } catch (err: any) {
      this.errorMsg = err.response?.data?.message || 'Erreur lors de l\'enregistrement du chantier.';
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  async deleteChantier(): Promise<void> {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce chantier ?') && this.chantier.id !== undefined) {
      this.loading = true;
      this.errorMsg = '';
      try {
        await this.chantierService.delete(this.chantier.id);
        this.router.navigate(['/chantiers']);
      } catch (err) {
        this.errorMsg = 'Erreur lors de la suppression du chantier.';
        console.error(err);
      } finally {
        this.loading = false;
      }
    }
  }

  cancel(): void {
    this.router.navigate(['/chantiers']);
  }

  private normalizeCoordinates(lat: number, lng: number): LatLngExpression {
    const correctedLat = Math.abs(lat) > 90 ? lat / 1_000_000 : lat;
    const correctedLng = Math.abs(lng) > 180 ? lng / 1_000_000 : lng;
    return [correctedLat, correctedLng];
  }
}
