import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CatalogService } from '../catalog.service';
import { IconComponent } from '../icon.component';
import { Product } from '../models';

interface FacetOption {
  key: string;
  label: string;
  count: number;
}

@Component({
  selector: 'app-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent],
  template: `
    <header class="page-head page-head--pad">
      <nav class="crumbs" aria-label="Breadcrumb">
        <a routerLink="/">Home</a><span>›</span>
        <span class="current">Search results</span>
      </nav>
      <form class="search-bar search-bar--inline" (submit)="submit(qInput.value); $event.preventDefault()">
        <input #qInput type="search" [value]="q() ?? ''" aria-label="Search data products" placeholder="Search business functions, domains, sub-domains or data products…" />
        <button type="submit" aria-label="Search"><app-icon name="search" [size]="17" /></button>
      </form>
    </header>

    <div class="results-layout">
      <aside class="filter-panel" aria-label="Search filters">
        <div class="filter-head">
          <span class="filter-title">Filter By</span>
          <button class="filter-clear" type="button" (click)="clearFilters()">Clear all</button>
        </div>
        <div class="filter-group">
          <span class="filter-label">FUNCTION</span>
          @for (opt of functionFacets(); track opt.key) {
            <label class="check">
              <input type="checkbox" [checked]="selectedFns().has(opt.key)" (change)="toggle(selectedFns, opt.key)" />
              {{ opt.label }} <span class="count">{{ opt.count }}</span>
            </label>
          }
        </div>
        <div class="filter-group filter-group--highlight">
          <span class="filter-label filter-label--accent">DOMAIN / SUB-DOMAIN <span class="badge-new">NEW</span></span>
          @for (opt of domainFacets(); track opt.key) {
            <label class="check">
              <input type="checkbox" [checked]="selectedDomains().has(opt.key)" (change)="toggle(selectedDomains, opt.key)" />
              {{ opt.label }} <span class="count">{{ opt.count }}</span>
            </label>
          }
        </div>
        <div class="filter-group">
          <span class="filter-label">ASSET TYPE</span>
          @for (opt of typeFacets(); track opt.key) {
            <label class="check">
              <input type="checkbox" [checked]="selectedTypes().has(opt.key)" (change)="toggle(selectedTypes, opt.key)" />
              {{ opt.label }} <span class="count">{{ opt.count }}</span>
            </label>
          }
        </div>
      </aside>

      <section class="results-col" aria-label="Search results">
        <div class="results-head">
          <span class="results-count">
            @if (q()) {
              Showing {{ results().length }} {{ results().length === 1 ? 'result' : 'results' }} for “{{ q() }}”
            } @else {
              Showing all {{ results().length }} data products
            }
          </span>
          <span class="results-sort">Sort by <strong>Relevance ▾</strong></span>
        </div>

        @for (p of results(); track p.slug) {
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
            <span class="result-tag" [class.result-tag--solid]="p.fnSlug === 'finance'" [class.result-tag--tint]="p.fnSlug !== 'finance'">
              {{ p.fnName }} › {{ p.domainName }}
            </span>
          </a>
        } @empty {
          <div class="panel">
            <div class="empty-state">
              <span class="icon-circle"><app-icon name="search" [size]="22" /></span>
              <span class="empty-title">No results found</span>
              <span class="empty-text">Try a different search term or clear the active filters.</span>
            </div>
          </div>
        }

        @if (results().length) {
          <nav class="pager pager--center" aria-label="Results pagination">
            <span class="is-disabled">‹</span>
            <span class="is-current">1</span>
            <a href="#" (click)="$event.preventDefault()">2</a>
            <a href="#" (click)="$event.preventDefault()">3</a>
            <a href="#" (click)="$event.preventDefault()">›</a>
          </nav>
        }
      </section>
    </div>
  `,
})
export class SearchComponent {
  private readonly catalog = inject(CatalogService);
  private readonly router = inject(Router);

  readonly q = input<string>();

  protected readonly selectedFns = signal(new Set<string>());
  protected readonly selectedDomains = signal(new Set<string>());
  protected readonly selectedTypes = signal(new Set<string>());

  /** Products matching the text query only (facet counts are computed against this set). */
  private readonly queryMatches = computed<Product[]>(() => {
    const q = (this.q() ?? '').trim().toLowerCase();
    if (!q) return this.catalog.products;
    return this.catalog.products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.fnName.toLowerCase().includes(q) ||
        p.domainName.toLowerCase().includes(q),
    );
  });

  protected readonly results = computed<Product[]>(() => {
    const fns = this.selectedFns();
    const domains = this.selectedDomains();
    const types = this.selectedTypes();
    return this.queryMatches().filter(
      (p) =>
        (!fns.size || fns.has(p.fnSlug)) &&
        (!domains.size || domains.has(p.domainSlug)) &&
        (!types.size || types.has(p.assetType)),
    );
  });

  protected readonly functionFacets = computed<FacetOption[]>(() =>
    this.facet(this.queryMatches(), (p) => [p.fnSlug, p.fnName]),
  );
  protected readonly domainFacets = computed<FacetOption[]>(() =>
    this.facet(this.queryMatches(), (p) => [p.domainSlug, p.domainName]),
  );
  protected readonly typeFacets = computed<FacetOption[]>(() =>
    this.facet(this.queryMatches(), (p) => [p.assetType, this.typeLabel(p.assetType) + 's']),
  );

  private facet(products: Product[], pick: (p: Product) => [string, string]): FacetOption[] {
    const map = new Map<string, FacetOption>();
    for (const p of products) {
      const [key, label] = pick(p);
      const existing = map.get(key);
      if (existing) existing.count++;
      else map.set(key, { key, label, count: 1 });
    }
    return [...map.values()].sort((a, b) => b.count - a.count);
  }

  protected toggle(setSignal: typeof this.selectedFns, key: string): void {
    const next = new Set(setSignal());
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setSignal.set(next);
  }

  protected clearFilters(): void {
    this.selectedFns.set(new Set());
    this.selectedDomains.set(new Set());
    this.selectedTypes.set(new Set());
  }

  protected submit(q: string): void {
    this.router.navigate(['/search'], { queryParams: q.trim() ? { q: q.trim() } : {} });
  }

  protected typeLabel(assetType: string): string {
    if (assetType === 'KPI') return 'KPI';
    return assetType
      .toLowerCase()
      .replace(/(^|\s)\S/g, (c) => c.toUpperCase());
  }
}
