import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogService } from '../../catalog.service';
import { IconComponent } from '../../icon.component';

@Component({
  selector: 'app-product-summary',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent],
  template: `
    @if (product(); as p) {
      <div class="detail-grid" style="padding:26px 48px 44px">
        <section class="panel" aria-labelledby="overview-heading">
          <div class="panel-title" id="overview-heading">Overview</div>
          <div class="band">DATASET STATISTICS</div>
          <div class="kv">
            @for (row of p.kv; track row.k) {
              <div class="k">{{ row.k }}</div>
              <div [class.mono]="row.mono">{{ row.v }}</div>
            }
          </div>
        </section>

        <div class="side-stack">
          <section class="panel panel--pad" aria-labelledby="quality-heading">
            <div class="panel-title panel-title--plain" id="quality-heading">Data Quality</div>
            <div class="q-list">
              @for (q of p.quality; track q.text) {
                <div class="q-item">
                  <span class="q-ico" [class.q-ico--ok]="q.kind === 'ok'" [class.q-ico--owner]="q.kind === 'owner'">
                    <app-icon [name]="q.kind === 'ok' ? 'check' : 'user'" [size]="11" />
                  </span>
                  {{ q.text }}
                </div>
              }
            </div>
          </section>

          <section class="panel panel--pad" aria-labelledby="classification-heading">
            <div class="panel-title panel-title--plain panel-title--tight" id="classification-heading">Classification</div>
            <span class="pill-tag">{{ p.classification }}</span>
          </section>

          <section class="panel panel--pad" aria-labelledby="function-heading">
            <div class="panel-title panel-title--plain panel-title--tight" id="function-heading">Business Function</div>
            <div class="fn-path">
              <a [routerLink]="['/functions', p.fnSlug]">{{ p.fnName }}</a>
              <span class="sep">›</span>
              <a [routerLink]="['/functions', p.fnSlug, 'domains', p.domainSlug]">{{ p.domainName }}</a>
            </div>
          </section>
        </div>
      </div>
    }
  `,
})
export class ProductSummaryComponent {
  private readonly catalog = inject(CatalogService);
  readonly slug = input.required<string>();
  protected readonly product = computed(() => this.catalog.productBySlug(this.slug()));
}
