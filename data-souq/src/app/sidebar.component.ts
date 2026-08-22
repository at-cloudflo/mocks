import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './auth.service';
import { CatalogService } from './catalog.service';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, IconComponent],
  template: `
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-word">QATAR</div>
        <div class="brand-sub"><span class="latin">AIRWAYS</span><span class="ar">القطرية</span></div>
        <div class="brand-pill"><span class="latin">Data Souq</span><span class="ar">سوق البيانات</span></div>
      </div>
      <nav class="side-nav">
        <a class="side-nav-item" routerLink="/" routerLinkActive="is-active" [routerLinkActiveOptions]="{ exact: true }">
          <app-icon name="home" />Home
        </a>
        <a class="side-nav-item" routerLink="/functions" routerLinkActive="is-active">
          <app-icon name="grid" />Business Functions
        </a>
        <a class="side-nav-item" routerLink="/favorites" routerLinkActive="is-active">
          <app-icon name="star" />Favorites
        </a>
        <a class="side-nav-item" routerLink="/requests" routerLinkActive="is-active">
          <app-icon name="requests" />Requests<span class="side-nav-badge">{{ catalog.pendingApprovals }}</span>
        </a>
        <a class="side-nav-item" routerLink="/collections" routerLinkActive="is-active">
          <app-icon name="collections" />Collections
        </a>
        <a class="side-nav-item" routerLink="/glossary" routerLinkActive="is-active">
          <app-icon name="glossary" />Data Glossary
        </a>
      </nav>
      <a class="side-nav-item nav-help" routerLink="/help" routerLinkActive="is-active">
        <app-icon name="help" />Help &amp; Support
      </a>
      @if (auth.user(); as user) {
        <div class="side-user">
          <span class="side-user-avatar">{{ user.initials }}</span>
          <span class="side-user-info">
            <span class="side-user-name">{{ user.name }}</span>
            <span class="side-user-role">{{ user.role }}</span>
          </span>
          <button class="side-user-logout" type="button" title="Log out" aria-label="Log out" (click)="logout()">
            <app-icon name="logout" [size]="16" />
          </button>
        </div>
      }
    </aside>
  `,
})
export class SidebarComponent {
  protected readonly catalog = inject(CatalogService);
  protected readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
