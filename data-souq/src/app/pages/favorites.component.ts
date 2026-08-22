import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogService } from '../catalog.service';
import { IconComponent } from '../icon.component';

@Component({
  selector: 'app-favorites',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent],
  template: `
    <header class="page-head page-head--pad">
      <nav class="crumbs" aria-label="Breadcrumb">
        <a routerLink="/">Home</a><span>›</span>
        <span class="current">Favorites</span>
      </nav>
      <div class="title-row" style="align-items:center;margin-top:16px">
        <div>
          <h1 class="page-title">Favorites</h1>
          <p class="lede" style="margin-top:6px;font-size:13px">
            Data assets you bookmarked for quick access — {{ favorites.length }} saved.
          </p>
        </div>
      </div>
    </header>

    <div class="content">
      <section aria-label="Bookmarked data assets">
        <div class="grid-4">
          @for (f of favorites; track f.slug) {
            <a class="asset-card" [routerLink]="['/products', f.slug]">
              <span class="asset-type"><app-icon [name]="f.typeIcon" [size]="13" />{{ f.assetType }}</span>
              <span class="asset-body">
                <span class="asset-name">{{ f.name }}</span>
                <span class="tag-row"><span class="tag tag--primary">{{ f.tag1 }}</span><span class="tag tag--muted">{{ f.tag2 }}</span></span>
              </span>
            </a>
          }
        </div>
      </section>

      <section aria-labelledby="suggested-heading">
        <div class="section-head">
          <h2 id="suggested-heading">Suggested for you</h2>
          <a class="link-more" routerLink="/search">Browse the catalog <app-icon name="arrow" [size]="14" /></a>
        </div>
        <div class="results-col">
          @for (p of suggested; track p.slug) {
            <a class="result-card" [routerLink]="['/products', p.slug]">
              <span class="result-main">
                <span class="result-title-row">
                  <span class="result-title">{{ p.name }}</span>
                  @if (p.certified) {
                    <span class="chip chip--success chip--sm"><app-icon name="check" [size]="10" />Certified</span>
                  }
                </span>
                <span class="result-desc">{{ p.description }}</span>
                <span class="result-meta">Popular with users in your team · Updated {{ p.updated }}</span>
              </span>
              <span class="result-tag result-tag--tint">{{ p.fnName }} › {{ p.domainName }}</span>
            </a>
          }
        </div>
      </section>
    </div>
  `,
})
export class FavoritesComponent {
  private readonly catalog = inject(CatalogService);

  protected readonly favorites = this.catalog.bookmarks.map((b) => {
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

  protected readonly suggested = this.catalog.products.filter(
    (p) => !this.catalog.bookmarks.some((b) => b.productSlug === p.slug),
  ).slice(0, 3);
}
