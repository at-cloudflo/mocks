import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogService } from '../catalog.service';
import { IconComponent } from '../icon.component';

@Component({
  selector: 'app-function-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent],
  template: `
    @if (fn(); as fn) {
      <header class="hero">
        <div class="hero-art hero-art--narrow" aria-hidden="true">
          <div class="hero-art-bg"></div>
          <app-icon class="hero-art-plane" name="plane" [size]="320" />
          <div class="hero-fade"></div>
        </div>
        <div class="hero-content hero-content--crumbed">
          <nav class="crumbs" aria-label="Breadcrumb">
            <a routerLink="/">Home</a><span>›</span>
            <a routerLink="/functions">Business Functions</a><span>›</span>
            <span class="current">{{ fn.name }}</span>
          </nav>
          <div class="function-head">
            <span class="icon-circle icon-circle--lg"><app-icon [name]="fn.icon" [size]="24" /></span>
            <div>
              <h1 class="function-title">{{ fn.name }}</h1>
              <p class="function-lede">{{ fn.description }}</p>
            </div>
          </div>
        </div>
      </header>

      <div class="content" style="padding-top:24px;gap:28px">
        <section class="stat-band" [attr.aria-label]="fn.name + ' statistics'">
          <div class="stat" style="padding:16px 24px">
            <span class="icon-circle" style="width:40px;height:40px"><app-icon name="box" /></span>
            <span><span class="stat-num" style="font-size:20px">{{ fn.products }}</span><span class="stat-label">Data Products</span></span>
          </div>
          <div class="stat" style="padding:16px 24px">
            <span class="icon-circle" style="width:40px;height:40px"><app-icon name="grid" [size]="17" /></span>
            <span><span class="stat-num" style="font-size:20px">{{ fn.domains }}</span><span class="stat-label">Domains</span></span>
          </div>
          <div class="stat" style="padding:16px 24px">
            <span class="icon-circle" style="width:40px;height:40px"><app-icon name="shield" [size]="17" /></span>
            <span><span class="stat-num" style="font-size:20px">{{ fn.certified }}</span><span class="stat-label">Certified Data Products</span></span>
          </div>
          <div class="stat" style="padding:16px 24px">
            <span class="icon-circle" style="width:40px;height:40px"><app-icon name="users" [size]="17" /></span>
            <span><span class="stat-num" style="font-size:20px">{{ fn.owners }}</span><span class="stat-label">Data Owners</span></span>
          </div>
        </section>

        <section aria-labelledby="domains-heading">
          <div class="section-head">
            <h2 id="domains-heading">Domains in {{ fn.name }}</h2>
          </div>
          @if (domains().length) {
            <div class="grid-3">
              @for (d of domains(); track d.slug) {
                <a class="tile tile--domain" [routerLink]="['/functions', fn.slug, 'domains', d.slug]">
                  <span class="icon-circle"><app-icon [name]="d.icon" /></span>
                  <span class="tile-name">{{ d.name }}</span>
                  <span class="tile-desc">{{ d.description }}</span>
                  <span class="tile-foot">
                    <span class="big-num">{{ d.products }} <small>Data Products</small></span>
                    <span class="big-num big-num--dark">{{ d.subDomains.length }} <small>{{ d.subDomains.length === 1 ? 'Sub-Domain' : 'Sub-Domains' }}</small></span>
                  </span>
                </a>
              }
            </div>
          } @else {
            <div class="panel">
              <div class="empty-state">
                <span class="icon-circle"><app-icon name="grid" [size]="22" /></span>
                <span class="empty-title">Domains coming soon</span>
                <span class="empty-text">The {{ fn.name }} data office is onboarding its domains to Data Souq. Check back shortly.</span>
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
            <span class="empty-title">Business function not found</span>
            <a class="link-more" routerLink="/functions">Browse all business functions <app-icon name="arrow" [size]="14" /></a>
          </div>
        </div>
      </div>
    }
  `,
})
export class FunctionDetailComponent {
  private readonly catalog = inject(CatalogService);
  readonly slug = input.required<string>();

  protected readonly fn = computed(() => this.catalog.functionBySlug(this.slug()));
  protected readonly domains = computed(() => this.catalog.domainsFor(this.slug()));
}
