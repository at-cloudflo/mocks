import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogService } from '../catalog.service';
import { IconComponent } from '../icon.component';

@Component({
  selector: 'app-domain-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent],
  template: `
    @if (domain(); as d) {
      <header class="page-head page-head--pad">
        <nav class="crumbs" aria-label="Breadcrumb">
          <a routerLink="/">Home</a><span>›</span>
          <a routerLink="/functions">Business Functions</a><span>›</span>
          <a [routerLink]="['/functions', d.fnSlug]">{{ fn()?.name }}</a><span>›</span>
          <span class="current">{{ d.name }}</span>
        </nav>
        <div class="function-head" style="margin-top:18px">
          <span class="icon-circle icon-circle--lg"><app-icon [name]="d.icon" [size]="24" /></span>
          <div>
            <h1 class="function-title" style="font-size:26px">{{ d.name }}</h1>
            <p class="function-lede" style="max-width:560px">{{ d.description }}</p>
            <div class="meta-row" style="margin-top:10px">
              <span><strong>{{ d.products }}</strong> Data Products</span>
              <span><strong>{{ d.subDomains.length }}</strong> Sub-Domains</span>
            </div>
          </div>
        </div>
        <div style="height:22px"></div>
      </header>

      <div class="content" style="padding-top:24px;gap:28px">
        <section aria-labelledby="subdomains-heading">
          <div class="section-head">
            <h2 id="subdomains-heading">Sub-Domains</h2>
          </div>
          <div class="chip-filters">
            @for (s of d.subDomains; track s) {
              <span class="chip-filter">{{ s }}</span>
            }
          </div>
        </section>

        <section aria-labelledby="products-heading">
          <div class="section-head">
            <h2 id="products-heading">Data Products in {{ d.name }}</h2>
            <span class="results-sort">Sort by <strong>Most subscribed ▾</strong></span>
          </div>
          @if (products().length) {
            <div class="results-col">
              @for (p of products(); track p.slug) {
                <a class="result-card" [routerLink]="['/products', p.slug]">
                  <span class="result-main">
                    <span class="result-title-row">
                      <span class="result-title">{{ p.name }}</span>
                      @if (p.certified) {
                        <span class="chip chip--success chip--sm"><app-icon name="check" [size]="10" />Certified</span>
                      }
                    </span>
                    <span class="result-desc">{{ p.description }}</span>
                    <span class="result-meta">{{ typeLabel(p.assetType) }} · {{ p.sizeInfo }} · Updated {{ p.updated }}</span>
                  </span>
                  <span class="result-tag result-tag--solid">{{ p.fnName }} › {{ p.domainName }}</span>
                </a>
              }
            </div>
          } @else {
            <div class="panel">
              <div class="empty-state">
                <span class="icon-circle"><app-icon name="box" [size]="22" /></span>
                <span class="empty-title">No data products published yet</span>
                <span class="empty-text">The {{ d.name }} domain is onboarding its data products to Data Souq.</span>
              </div>
            </div>
          }
        </section>
      </div>
    } @else {
      <div class="content">
        <div class="panel">
          <div class="empty-state">
            <span class="icon-circle"><app-icon name="search" [size]="22" /></span>
            <span class="empty-title">Domain not found</span>
            <a class="link-more" routerLink="/functions">Browse all business functions <app-icon name="arrow" [size]="14" /></a>
          </div>
        </div>
      </div>
    }
  `,
})
export class DomainDetailComponent {
  private readonly catalog = inject(CatalogService);
  readonly fnSlug = input.required<string>();
  readonly domainSlug = input.required<string>();

  protected readonly fn = computed(() => this.catalog.functionBySlug(this.fnSlug()));
  protected readonly domain = computed(() => this.catalog.domainBySlug(this.fnSlug(), this.domainSlug()));
  protected readonly products = computed(() => this.catalog.productsInDomain(this.fnSlug(), this.domainSlug()));

  protected typeLabel(assetType: string): string {
    if (assetType === 'KPI') return 'KPI';
    return assetType.charAt(0) + assetType.slice(1).toLowerCase();
  }
}
