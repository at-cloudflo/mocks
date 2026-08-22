import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CatalogService } from '../../catalog.service';
import { IconComponent } from '../../icon.component';

@Component({
  selector: 'app-product-profiling',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  template: `
    @if (product(); as p) {
      <div class="content content--tight">
        @if (p.profiling; as profiling) {
          <div class="note-row">
            <div class="note-left">
              <span class="chip chip--success"><app-icon name="check" [size]="12" />Profiled {{ p.updated }}</span>
              <span class="note-hint">Column statistics computed on the latest refresh.</span>
            </div>
            <span class="note-hint">Showing <strong>{{ profiling.length }}</strong> key columns</span>
          </div>

          <div class="data-card">
            <div class="table-scroll">
              <table class="data">
                <thead>
                  <tr>
                    <th>COLUMN</th>
                    <th>TYPE</th>
                    <th style="min-width:170px">COMPLETENESS</th>
                    <th>DISTINCT</th>
                    <th>MIN</th>
                    <th>MAX</th>
                    <th>TOP VALUE</th>
                  </tr>
                </thead>
                <tbody>
                  @for (row of profiling; track row.column) {
                    <tr>
                      <td style="font-family:var(--qr-mono);font-weight:600">{{ row.column }}</td>
                      <td>{{ row.type }}</td>
                      <td>
                        <span class="meter">
                          <span class="meter-track">
                            <span class="meter-fill" [class.meter-fill--warn]="row.completeness < 95" [style.width.%]="row.completeness"></span>
                          </span>
                          <span class="meter-val">{{ row.completeness }}%</span>
                        </span>
                      </td>
                      <td>{{ row.distinct }}</td>
                      <td>{{ row.min }}</td>
                      <td>{{ row.max }}</td>
                      <td>{{ row.top }}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
            <div class="table-foot">
              <span class="foot-note">Statistics are indicative and computed on a 10% sample.</span>
            </div>
          </div>
        } @else {
          <div class="panel">
            <div class="empty-state">
              <span class="icon-circle"><app-icon name="kpi" [size]="22" /></span>
              <span class="empty-title">Profiling not available</span>
              <span class="empty-text">Column-level profiling has not been enabled for this data product yet.</span>
            </div>
          </div>
        }
      </div>
    }
  `,
})
export class ProductProfilingComponent {
  private readonly catalog = inject(CatalogService);
  readonly slug = input.required<string>();
  protected readonly product = computed(() => this.catalog.productBySlug(this.slug()));
}
