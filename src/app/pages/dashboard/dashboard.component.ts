import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterLink } from '@angular/router';

interface DashboardItem {
  title: string;
  icon: string;
  route: string;
  category: 'chantiers' | 'analyses' | 'vente' | 'gisements' | 'composts' | 'melanges' | 'documents' | 'admin';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatGridListModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  dashboardItems: DashboardItem[] = [
    { title: 'Chantiers', icon: 'location_city', route: '/chantiers', category: 'chantiers' },
    { title: 'Analyses Laboratoire', icon: 'science', route: '/analyses-laboratoire', category: 'analyses' },
    { title: 'Produits de Vente', icon: 'shopping_cart', route: '/produits-vente', category: 'vente' },
    { title: 'Gisements', icon: 'landscape', route: '/gisements', category: 'gisements' },
    { title: 'Composts', icon: 'grass', route: '/composts', category: 'composts' },
    { title: 'Mélanges', icon: 'tune', route: '/melanges', category: 'melanges' },
    { title: 'Documents Techniques', icon: 'description', route: '/documents-techniques', category: 'documents' },
    { title: 'Documents de gisement', icon: 'folder', route: '/documents-gisement', category: 'documents' },
    { title: 'Utilisateurs Admin', icon: 'people', route: '/users', category: 'admin' },
    
    // Ajoutez d'autres sections si nécessaire en fonction de vos routes
  ];
}
