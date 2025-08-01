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
  category: 'chantiers' | 'gisements' | 'admin' | 'melanges' | 'analyses' | 'vente' | 'planning';
  description?: string;
}

interface DashboardCategory {
  name: string;
  title: string;
  description: string;
  icon: string;
  items: DashboardItem[];
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
    { title: 'Chantiers', icon: 'location_city', route: '/chantiers', category: 'chantiers', description: 'Gestion des chantiers actifs' },
    { title: 'Gisements', icon: 'landscape', route: '/gisements', category: 'gisements', description: 'Gestion des sites de collecte' },
    { title: 'Plateforme', icon: 'home_work', route: '/plateforme', category: 'admin', description: 'Configuration des plateformes' },
    { title: 'Mélanges', icon: 'tune', route: '/melanges', category: 'melanges', description: 'Composition et recettes' },
    { title: 'Labo', icon: 'science', route: '/analyses-laboratoire', category: 'analyses', description: 'Analyses de laboratoire' },
    { title: 'Produits', icon: 'shopping_cart', route: '/produits-vente', category: 'vente', description: 'Catalogue produits' },
    { title: 'Chantier de destination', icon: 'flag', route: '/chantier-final', category: 'chantiers', description: 'Sites de livraison' },
    { title: 'Planning', icon: 'calendar_month', route: '/planning', category: 'planning', description: 'Planification des interventions' },
  ];

  categories: DashboardCategory[] = [
    {
      name: 'chantiers',
      title: 'Chantiers',
      description: 'Gestion des sites et destinations',
      icon: 'location_city',
      items: this.dashboardItems.filter(item => item.category === 'chantiers')
    },
    {
      name: 'gisements',
      title: 'Gisements',
      description: 'Sites de collecte et ressources',
      icon: 'landscape',
      items: this.dashboardItems.filter(item => item.category === 'gisements')
    },
    {
      name: 'melanges',
      title: 'Production',
      description: 'Mélanges et compositions',
      icon: 'tune',
      items: this.dashboardItems.filter(item => item.category === 'melanges')
    },
    {
      name: 'planning',
      title: 'Planning',
      description: 'Planification et interventions',
      icon: 'calendar_month',
      items: this.dashboardItems.filter(item => item.category === 'planning')
    },
    {
      name: 'analyses',
      title: 'Laboratoire',
      description: 'Analyses et contrôles qualité',
      icon: 'science',
      items: this.dashboardItems.filter(item => item.category === 'analyses')
    },
    {
      name: 'vente',
      title: 'Commercial',
      description: 'Produits et ventes',
      icon: 'shopping_cart',
      items: this.dashboardItems.filter(item => item.category === 'vente')
    },
    {
      name: 'admin',
      title: 'Administration',
      description: 'Configuration et paramètres',
      icon: 'settings',
      items: this.dashboardItems.filter(item => item.category === 'admin')
    }
  ];
}
