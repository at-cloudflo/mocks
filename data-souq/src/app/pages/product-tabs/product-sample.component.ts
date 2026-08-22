import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CatalogService } from '../../catalog.service';
import { IconComponent } from '../../icon.component';

@Component({
  selector: 'app-product-sample',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  template: `
    @if (product(); as p) {
      <div class="content content--tight">
        @if (p.sample; as sample) {
          <div class="note-row">
            <div class="note-left">
              <span class="chip chip--warning"><app-icon name="lock" [size]="12" />Masked preview</span>
              <span class="note-hint">Sensitive columns are anonymized until access is granted.</span>
            </div>
            <span class="note-hint">Showing <strong>{{ sample.rows.length }}</strong> of {{ sample.sampleRows }} sample rows</span>
          </div>

          <div class="data-card">
            <div class="table-scroll">
              <table class="data data--mono">
                <thead>
                  <tr>
                    @for (col of sample.columns; track col) {
                      <th>{{ col }}</th>
                    }
                  </tr>
                </thead>
                <tbody>
                  @for (row of sample.rows; track $index) {
                    <tr>
                      @for (cell of row; track $index) {
                        <td [class.cell-ok]="cell.tone === 'ok'" [class.cell-warn]="cell.tone === 'warn'" [class.cell-bad]="cell.tone === 'bad'">{{ cell.value }}</td>
                      }
                    </tr>
                  }
                </tbody>
              </table>
            </div>
            <div class="table-foot">
              <span class="foot-note">{{ sample.totalColumns }} columns · scroll horizontally to view all</span>
              <nav class="pager" aria-label="Sample rows pagination">
                <span class="is-disabled">‹</span>
                <span class="is-current">1</span>
                <a href="#" (click)="$event.preventDefault()">2</a>
                <a href="#" (click)="$event.preventDefault()">3</a>
                <a href="#" (click)="$event.preventDefault()">›</a>
              </nav>
            </div>
          </div>
        } @else {
          <div class="panel">
            <div class="empty-state">
              <span class="icon-circle"><app-icon name="lock" [size]="22" /></span>
              <span class="empty-title">No sample published</span>
              <span class="empty-text">{{ p.publishedBy }} has not published a masked sample for this data product. Request access to explore the full data.</span>
            </div>
          </div>
        }
      </div>
    }
  `,
})
export class ProductSampleComponent {
  private readonly catalog = inject(CatalogService);
  readonly slug = input.required<string>();
  protected readonly product = computed(() => this.catalog.productBySlug(this.slug()));
}
