import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { AuthService } from '../../auth.service';
import { CatalogService } from '../../catalog.service';
import { IconComponent } from '../../icon.component';

@Component({
  selector: 'app-product-discussions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  template: `
    @if (product(); as p) {
      <div class="content content--tight">
        <div class="note-row">
          <div class="note-left">
            <span class="chip chip--success"><app-icon name="users" [size]="12" />{{ p.discussions?.length ?? 0 }} open threads</span>
            <span class="note-hint">Questions and answers between consumers and the data product owner.</span>
          </div>
        </div>

        <div class="data-card">
          @if (p.discussions?.length) {
            @for (t of p.discussions; track t.author + t.time) {
              <div class="thread">
                <span class="avatar">{{ t.initials }}</span>
                <div class="thread-body">
                  <div class="thread-head">
                    <span class="thread-author">{{ t.author }}</span>
                    <span class="thread-time">{{ t.time }}</span>
                  </div>
                  <p class="thread-text">{{ t.text }}</p>
                  <div class="thread-actions">
                    <a href="#" (click)="$event.preventDefault()">Reply</a>
                    <a href="#" (click)="$event.preventDefault()">{{ t.replies }} {{ t.replies === 1 ? 'reply' : 'replies' }}</a>
                  </div>
                </div>
              </div>
            }
          } @else {
            <div class="empty-state">
              <span class="icon-circle"><app-icon name="users" [size]="22" /></span>
              <span class="empty-title">No discussions yet</span>
              <span class="empty-text">Be the first to ask {{ p.publishedBy }} a question about this data product.</span>
            </div>
          }
          <div class="composer">
            <span class="avatar avatar--alt">{{ auth.user()?.initials ?? 'AT' }}</span>
            <textarea placeholder="Ask a question or share a note with the data product owner…" aria-label="New discussion message"></textarea>
            <button class="btn-primary" type="button" style="align-self:flex-end;padding:9px 18px;font-size:12.5px">Post</button>
          </div>
        </div>
      </div>
    }
  `,
})
export class ProductDiscussionsComponent {
  private readonly catalog = inject(CatalogService);
  protected readonly auth = inject(AuthService);
  readonly slug = input.required<string>();
  protected readonly product = computed(() => this.catalog.productBySlug(this.slug()));
}
