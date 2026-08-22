import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CatalogService } from '../catalog.service';
import { IconComponent } from '../icon.component';

@Component({
  selector: 'app-product-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, IconComponent],
  template: `
    @if (product(); as p) {
      <header class="page-head">
        <nav class="crumbs" aria-label="Breadcrumb">
          <a routerLink="/">Home</a><span>›</span>
          <a routerLink="/functions">Business Functions</a><span>›</span>
          <a [routerLink]="['/functions', p.fnSlug]">{{ p.fnName }}</a><span>›</span>
          <a [routerLink]="['/functions', p.fnSlug, 'domains', p.domainSlug]">{{ p.domainName }}</a><span>›</span>
          <span class="current">{{ p.name }}</span>
        </nav>
        <div class="title-row">
          <div>
            <div class="title-line">
              <h1 class="page-title">{{ p.name }}</h1>
              @if (p.certified) {
                <span class="chip chip--success"><app-icon name="check" [size]="12" />Certified</span>
              }
            </div>
            <p class="lede">{{ p.description }}</p>
            <div class="meta-row">
              <span>Published by <strong>{{ p.publishedBy }}</strong></span>
              <span>Published on <strong>{{ p.publishedOn }}</strong></span>
              <span>Type <strong>{{ p.type }}</strong></span>
              <span>Subscriptions <strong>{{ p.subscriptions }}</strong></span>
              <span>Likes <strong>{{ p.likes }}</strong></span>
            </div>
          </div>
          <button class="btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#requestAccessModal">Request Access</button>
        </div>
        <nav class="tabs" aria-label="Product sections">
          <a class="tab" routerLink="summary" routerLinkActive="is-active">Summary</a>
          <a class="tab" routerLink="sample" routerLinkActive="is-active">Sample Dataset</a>
          <a class="tab" routerLink="profiling" routerLinkActive="is-active">Data Profiling</a>
          <a class="tab" routerLink="lineage" routerLinkActive="is-active">Lineage</a>
          <a class="tab" routerLink="contract" routerLinkActive="is-active">Data Contract</a>
          <a class="tab" routerLink="discussions" routerLinkActive="is-active">
            Discussions
            @if (p.discussions?.length) {
              <span class="tab-badge">{{ p.discussions!.length }}</span>
            }
          </a>
        </nav>
      </header>

      <router-outlet />

      <div class="modal fade" id="requestAccessModal" tabindex="-1" aria-labelledby="requestAccessLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title fs-6 fw-bold" id="requestAccessLabel">Request access — {{ p.name }}</h2>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label" for="accessType" style="font-size:12.5px;font-weight:600">Access type</label>
                <select class="form-select form-select-sm" id="accessType">
                  <option>Read — BigQuery</option>
                  <option>Dashboard viewer</option>
                  <option>KPI subscription</option>
                </select>
              </div>
              <div class="mb-1">
                <label class="form-label" for="justification" style="font-size:12.5px;font-weight:600">Business justification</label>
                <textarea class="form-control form-control-sm" id="justification" rows="3"
                  placeholder="Why do you need access to this data product?"></textarea>
              </div>
              <p class="note-hint mb-0">Your request will be routed to {{ p.publishedBy }} for approval.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-sm btn-primary" data-bs-dismiss="modal" style="padding:6px 16px">Submit request</button>
            </div>
          </div>
        </div>
      </div>
    } @else {
      <div class="content">
        <div class="panel">
          <div class="empty-state">
            <span class="icon-circle"><app-icon name="search" [size]="22" /></span>
            <span class="empty-title">Data product not found</span>
            <a class="link-more" routerLink="/search">Search the catalog <app-icon name="arrow" [size]="14" /></a>
          </div>
        </div>
      </div>
    }
  `,
})
export class ProductDetailComponent {
  private readonly catalog = inject(CatalogService);
  readonly slug = input.required<string>();

  protected readonly product = computed(() => this.catalog.productBySlug(this.slug()));
}
