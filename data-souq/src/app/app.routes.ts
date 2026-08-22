import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./pages/login.component').then((m) => m.LoginComponent), title: 'Data Souq — Sign in' },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', loadComponent: () => import('./pages/home.component').then((m) => m.HomeComponent), title: 'Data Souq — Home' },
      { path: 'functions', loadComponent: () => import('./pages/functions.component').then((m) => m.FunctionsComponent), title: 'Data Souq — Business Functions' },
      { path: 'functions/:slug', loadComponent: () => import('./pages/function-detail.component').then((m) => m.FunctionDetailComponent), title: 'Data Souq — Business Function' },
      { path: 'functions/:fnSlug/domains/:domainSlug', loadComponent: () => import('./pages/domain-detail.component').then((m) => m.DomainDetailComponent), title: 'Data Souq — Domain' },
      {
        path: 'products/:slug',
        loadComponent: () => import('./pages/product-detail.component').then((m) => m.ProductDetailComponent),
        title: 'Data Souq — Data Product',
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'summary' },
          { path: 'summary', loadComponent: () => import('./pages/product-tabs/product-summary.component').then((m) => m.ProductSummaryComponent) },
          { path: 'sample', loadComponent: () => import('./pages/product-tabs/product-sample.component').then((m) => m.ProductSampleComponent) },
          { path: 'profiling', loadComponent: () => import('./pages/product-tabs/product-profiling.component').then((m) => m.ProductProfilingComponent) },
          { path: 'lineage', loadComponent: () => import('./pages/product-tabs/product-lineage.component').then((m) => m.ProductLineageComponent) },
          { path: 'contract', loadComponent: () => import('./pages/product-tabs/product-contract.component').then((m) => m.ProductContractComponent) },
          { path: 'discussions', loadComponent: () => import('./pages/product-tabs/product-discussions.component').then((m) => m.ProductDiscussionsComponent) },
        ],
      },
      { path: 'search', loadComponent: () => import('./pages/search.component').then((m) => m.SearchComponent), title: 'Data Souq — Search results' },
      { path: 'requests', loadComponent: () => import('./pages/requests.component').then((m) => m.RequestsComponent), title: 'Data Souq — Requests' },
      { path: 'requests/approvals', loadComponent: () => import('./pages/requests.component').then((m) => m.RequestsComponent), data: { view: 'approvals' }, title: 'Data Souq — Approvals' },
      { path: 'favorites', loadComponent: () => import('./pages/favorites.component').then((m) => m.FavoritesComponent), title: 'Data Souq — Favorites' },
      { path: 'collections', loadComponent: () => import('./pages/collections.component').then((m) => m.CollectionsComponent), title: 'Data Souq — Collections' },
      { path: 'glossary', loadComponent: () => import('./pages/glossary.component').then((m) => m.GlossaryComponent), title: 'Data Souq — Data Glossary' },
      { path: 'help', loadComponent: () => import('./pages/help.component').then((m) => m.HelpComponent), title: 'Data Souq — Help & Support' },
    ],
  },
  { path: '**', redirectTo: '' },
];
