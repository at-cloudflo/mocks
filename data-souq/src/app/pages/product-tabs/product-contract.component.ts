import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CatalogService } from '../../catalog.service';
import { IconComponent } from '../../icon.component';

@Component({
  selector: 'app-product-contract',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  template: `
    @if (product(); as p) {
      @if (p.contract; as contract) {
        <div class="detail-grid" style="padding:26px 48px 44px">
          <div class="side-stack">
            <section class="panel" aria-labelledby="sla-heading">
              <div class="panel-title" id="sla-heading">Service Level Agreement</div>
              <div class="kv">
                @for (row of contract.sla; track row.k) {
                  <div class="k">{{ row.k }}</div>
                  <div>{{ row.v }}</div>
                }
              </div>
            </section>

            <section class="panel" aria-labelledby="schema-heading">
              <div class="panel-title" id="schema-heading">Schema Guarantees</div>
              <div class="kv">
                @for (row of contract.schema; track row.k) {
                  <div class="k">{{ row.k }}</div>
                  <div>{{ row.v }}</div>
                }
              </div>
            </section>

            <section class="panel" aria-labelledby="versions-heading">
              <div class="panel-title" id="versions-heading">Version History</div>
              <div class="table-scroll">
                <table class="data">
                  <thead>
                    <tr><th>VERSION</th><th>DATE</th><th>AUTHOR</th><th>CHANGE</th></tr>
                  </thead>
                  <tbody>
                    @for (v of contract.versions; track v.version) {
                      <tr>
                        <td style="font-weight:700">{{ v.version }}</td>
                        <td>{{ v.date }}</td>
                        <td>{{ v.author }}</td>
                        <td>{{ v.change }}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <div class="side-stack">
            <section class="panel panel--pad" aria-labelledby="terms-heading">
              <div class="panel-title panel-title--plain" id="terms-heading">Terms of Use</div>
              <div class="q-list">
                @for (t of contract.terms; track t) {
                  <div class="q-item">
                    <span class="q-ico q-ico--ok"><app-icon name="check" [size]="11" /></span>
                    {{ t }}
                  </div>
                }
              </div>
            </section>

            <section class="panel panel--pad" aria-labelledby="contract-owner-heading">
              <div class="panel-title panel-title--plain panel-title--tight" id="contract-owner-heading">Contract Owner</div>
              <div class="q-list">
                <div class="q-item">
                  <span class="q-ico q-ico--owner"><app-icon name="user" [size]="11" /></span>
                  {{ p.publishedBy }}
                </div>
              </div>
            </section>
          </div>
        </div>
      } @else {
        <div class="content content--tight">
          <div class="panel">
            <div class="empty-state">
              <span class="icon-circle"><app-icon name="doc" [size]="22" /></span>
              <span class="empty-title">No data contract published</span>
              <span class="empty-text">{{ p.publishedBy }} has not published a data contract for this product yet.</span>
            </div>
          </div>
        </div>
      }
    }
  `,
})
export class ProductContractComponent {
  private readonly catalog = inject(CatalogService);
  readonly slug = input.required<string>();
  protected readonly product = computed(() => this.catalog.productBySlug(this.slug()));
}
