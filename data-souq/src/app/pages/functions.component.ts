import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogService } from '../catalog.service';
import { IconComponent } from '../icon.component';

@Component({
  selector: 'app-functions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent],
  template: `
    <header class="page-head page-head--pad">
      <nav class="crumbs" aria-label="Breadcrumb">
        <a routerLink="/">Home</a><span>›</span>
        <span class="current">Business Functions</span>
      </nav>
      <div class="title-row" style="align-items:center;margin-top:16px">
        <div>
          <h1 class="page-title">Business Functions</h1>
          <p class="lede" style="margin-top:6px;font-size:13px">
            All {{ catalog.functions.length }} business functions publishing data products on Data Souq.
          </p>
        </div>
      </div>
    </header>

    <div class="content">
      <section class="stat-band" aria-label="Marketplace statistics">
        <div class="stat">
          <span class="icon-circle"><app-icon name="box" [size]="19" /></span>
          <span><span class="stat-num">{{ catalog.stats.products }}</span><span class="stat-label">Data Products</span></span>
        </div>
        <div class="stat">
          <span class="icon-circle"><app-icon name="grid" /></span>
          <span><span class="stat-num">{{ catalog.stats.functions }}</span><span class="stat-label">Business Functions</span></span>
        </div>
        <div class="stat">
          <span class="icon-circle"><app-icon name="shield" /></span>
          <span><span class="stat-num">{{ catalog.stats.certified }}</span><span class="stat-label">Certified Data Products</span></span>
        </div>
        <div class="stat">
          <span class="icon-circle"><app-icon name="users" /></span>
          <span><span class="stat-num">{{ catalog.stats.owners }}</span><span class="stat-label">Data Owners</span></span>
        </div>
      </section>

      <section aria-label="All business functions">
        <div class="grid-4">
          @for (fn of catalog.functions; track fn.slug) {
            <a class="tile" [routerLink]="['/functions', fn.slug]">
              <span class="icon-circle"><app-icon [name]="fn.icon" /></span>
              <span class="tile-name">{{ fn.name }}</span>
              <span class="tile-stats">
                <span class="big-num">{{ fn.products }} <small>Data Products</small></span>
                <span class="big-num big-num--dark">{{ fn.domains }} <small>Domains</small></span>
              </span>
              <span class="tile-arrow"><app-icon name="arrow" [size]="15" /></span>
            </a>
          }
        </div>
      </section>
    </div>
  `,
})
export class FunctionsComponent {
  protected readonly catalog = inject(CatalogService);
}
