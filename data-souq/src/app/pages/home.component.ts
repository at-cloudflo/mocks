import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CatalogService } from '../catalog.service';
import { IconComponent } from '../icon.component';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent],
  template: `
    <header class="hero">
      <div class="hero-art" aria-hidden="true">
        <div class="hero-art-bg"></div>
        <app-icon class="hero-art-plane" name="plane" [size]="360" />
        <div class="hero-fade"></div>
      </div>
      <div class="hero-content">
        <div class="hero-title-line">
          <h1 class="hero-title">Data Souq</h1>
          <span class="ar">سوق البيانات</span>
        </div>
        <p class="hero-lede">Discover, access and unlock trusted enterprise data products across Qatar Airways Group.</p>
        <form class="search-bar" (submit)="search(q.value); $event.preventDefault()">
          <input #q type="search" placeholder="Search business functions, domains, sub-domains or data products…" aria-label="Search data products" />
          <button type="submit" aria-label="Search"><app-icon name="search" [size]="17" /></button>
        </form>
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

      <section aria-labelledby="browse-heading">
        <div class="section-head">
          <h2 id="browse-heading">Browse by Business Function</h2>
          <a class="link-more" routerLink="/functions">View all business functions <app-icon name="arrow" [size]="14" /></a>
        </div>
        <div class="grid-5">
          @for (fn of featured; track fn.slug) {
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

      <section aria-labelledby="bookmarks-heading">
        <div class="section-head">
          <h2 id="bookmarks-heading">Bookmarked data assets</h2>
          <a class="link-more" routerLink="/favorites">Manage bookmarks</a>
        </div>
        <div class="grid-4">
          @for (b of bookmarks; track b.slug) {
            <a class="asset-card" [routerLink]="['/products', b.slug]">
              <span class="asset-type"><app-icon [name]="b.typeIcon" [size]="13" />{{ b.assetType }}</span>
              <span class="asset-body">
                <span class="asset-name">{{ b.name }}</span>
                <span class="tag-row"><span class="tag tag--primary">{{ b.tag1 }}</span><span class="tag tag--muted">{{ b.tag2 }}</span></span>
              </span>
            </a>
          }
        </div>
      </section>
    </div>
  `,
})
export class HomeComponent {
  protected readonly catalog = inject(CatalogService);
  private readonly router = inject(Router);

  protected readonly featured = this.catalog.functions.filter((f) => f.featured);

  protected readonly bookmarks = this.catalog.bookmarks
    .map((b) => {
      const p = this.catalog.productBySlug(b.productSlug)!;
      return {
        slug: p.slug,
        name: p.name,
        assetType: p.assetType,
        typeIcon: p.assetType === 'KPI' ? 'kpi' : 'dataset',
        tag1: p.fnName === 'Customer Experience' ? 'Cust. Experience' : p.fnName,
        tag2: b.tag2,
      };
    });

  protected search(q: string): void {
    this.router.navigate(['/search'], { queryParams: q.trim() ? { q: q.trim() } : {} });
  }
}
