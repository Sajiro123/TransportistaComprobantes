import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // ── Login ──────────────────────────────────────────────
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then(m => m.LoginComponent),
  },

  // ── Shell (layout con sidebar) ─────────────────────────
  {
    path: '',
    loadComponent: () =>
      import('./components/shell/shell.component').then(m => m.ShellComponent),
    canActivate: [authGuard],
    children: [
      // Perfil
      {
        path: 'perfil',
        loadComponent: () =>
          import('./pages/perfil/perfil-info.component').then(m => m.PerfilInfoComponent),
      },
      // Redirect vacío → perfil
      { path: '', redirectTo: 'perfil', pathMatch: 'full' },
    ],
  },

  // ── Wildcard ───────────────────────────────────────────
  { path: '**', redirectTo: 'login' },
];
