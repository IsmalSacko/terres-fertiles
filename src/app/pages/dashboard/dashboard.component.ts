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
  category: 'chantiers' | 'gisements' | 'admin' | 'melanges' | 'analyses' | 'vente';
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
    { title: 'Gisements', icon: 'landscape', route: '/gisements', category: 'gisements' },
    { title: 'Plateforme', icon: 'home_work', route: '/plateforme', category: 'admin' },
    { title: 'Mélanges', icon: 'tune', route: '/melanges', category: 'melanges' },
    { title: 'Labo', icon: 'science', route: '/analyses-laboratoire', category: 'analyses' },
    { title: 'Produits', icon: 'shopping_cart', route: '/produits-vente', category: 'vente' },
    { title: 'Chantier de destination', icon: 'flag', route: '/chantier-final', category: 'chantiers' },
  ];
}
