import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CatalogService } from '../../catalog.service';
import { IconComponent } from '../../icon.component';

@Component({
  selector: 'app-product-lineage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  template: `
    @if (product(); as p) {
      <div class="content content--tight">
        @if (p.lineage; as lineage) {
          <div class="note-row">
            <div class="note-left">
              <span class="chip chip--success"><app-icon name="check" [size]="12" />Lineage up to date</span>
              <span class="note-hint">Captured automatically from pipeline metadata.</span>
            </div>
            <span class="note-hint"><strong>{{ lineage.upstream.length }}</strong> upstream · <strong>{{ lineage.downstream.length }}</strong> downstream</span>
          </div>

          <div class="data-card">
            <div class="lineage-flow">
              <div class="lineage-col">
                <span class="lineage-col-label">UPSTREAM SOURCES</span>
                @for (n of lineage.upstream; track n.name) {
                  <div class="lineage-node lineage-node--source">
                    <span class="lineage-node-name">{{ n.name }}</span>
                    <span class="lineage-node-type">{{ n.type }}</span>
                  </div>
                }
              </div>
              <div class="lineage-arrow"><app-icon name="arrow" [size]="20" /></div>
              <div class="lineage-col">
                <span class="lineage-col-label">THIS DATA PRODUCT</span>
                <div class="lineage-node lineage-node--focus">
                  <span class="lineage-node-name">{{ p.name }}</span>
                  <span class="lineage-node-type">{{ p.assetType }} · {{ p.type.toUpperCase() }}</span>
                </div>
              </div>
              <div class="lineage-arrow"><app-icon name="arrow" [size]="20" /></div>
              <div class="lineage-col">
                <span class="lineage-col-label">DOWNSTREAM CONSUMERS</span>
                @for (n of lineage.downstream; track n.name) {
                  <div class="lineage-node lineage-node--consumer">
                    <span class="lineage-node-name">{{ n.name }}</span>
                    <span class="lineage-node-type">{{ n.type }}</span>
                  </div>
                }
              </div>
            </div>
          </div>
        } @else {
          <div class="panel">
            <div class="empty-state">
              <span class="icon-circle"><app-icon name="org" [size]="22" /></span>
              <span class="empty-title">Lineage not captured</span>
              <span class="empty-text">Pipeline metadata for this data product has not been connected to Data Souq yet.</span>
            </div>
          </div>
        }
      </div>
    }
  `,
})
export class ProductLineageComponent {
  private readonly catalog = inject(CatalogService);
  readonly slug = input.required<string>();
  protected readonly product = computed(() => this.catalog.productBySlug(this.slug()));
}
