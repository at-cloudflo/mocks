import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogService } from '../catalog.service';
import { IconComponent } from '../icon.component';

@Component({
  selector: 'app-glossary',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent],
  template: `
    <header class="page-head page-head--pad">
      <nav class="crumbs" aria-label="Breadcrumb">
        <a routerLink="/">Home</a><span>›</span>
        <span class="current">Data Glossary</span>
      </nav>
      <div class="title-row" style="align-items:center;margin-top:16px">
        <div>
          <h1 class="page-title">Data Glossary</h1>
          <p class="lede" style="margin-top:6px;font-size:13px">
            The shared business vocabulary behind Data Souq — {{ catalog.glossary.length }} governed terms with accountable stewards.
          </p>
        </div>
      </div>
      <form class="search-bar search-bar--inline" style="margin-top:14px;margin-bottom:22px" (submit)="$event.preventDefault()">
        <input type="search" placeholder="Search terms and definitions…" aria-label="Search glossary"
          [value]="query()" (input)="onQuery($event)" />
        <button type="submit" aria-label="Search"><app-icon name="search" [size]="17" /></button>
      </form>
    </header>

    <div class="content content--tight">
      <nav class="letter-nav" aria-label="Filter terms by first letter">
        <button type="button" [class.is-current]="letter() === null" (click)="letter.set(null)">All</button>
        @for (l of alphabet; track l) {
          <button type="button" [disabled]="!lettersInUse().has(l)" [class.is-current]="letter() === l" (click)="letter.set(l)">{{ l }}</button>
        }
      </nav>

      <div class="data-card">
        @for (t of terms(); track t.term) {
          <div class="thread" style="align-items:flex-start">
            <span class="avatar">{{ t.term.charAt(0) }}</span>
            <div class="thread-body">
              <span class="term-name">{{ t.term }}</span>
              <p class="term-def">{{ t.definition }}</p>
              <div class="term-meta">
                <span class="tag tag--primary">{{ t.fn }}</span>
                <span class="tag tag--muted">{{ t.domain }}</span>
                <span class="term-steward">Steward — {{ t.steward }}</span>
              </div>
            </div>
          </div>
        } @empty {
          <div class="empty-state">
            <span class="icon-circle"><app-icon name="glossary" [size]="22" /></span>
            <span class="empty-title">No terms match</span>
            <span class="empty-text">Try a different search term or letter.</span>
          </div>
        }
      </div>
    </div>
  `,
})
export class GlossaryComponent {
  protected readonly catalog = inject(CatalogService);
  protected readonly alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  protected readonly query = signal('');
  protected readonly letter = signal<string | null>(null);

  protected readonly lettersInUse = computed(
    () => new Set(this.catalog.glossary.map((t) => t.term.charAt(0).toUpperCase())),
  );

  protected readonly terms = computed(() => {
    const q = this.query().trim().toLowerCase();
    const l = this.letter();
    return this.catalog.glossary.filter(
      (t) =>
        (!l || t.term.charAt(0).toUpperCase() === l) &&
        (!q || t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q)),
    );
  });

  protected onQuery(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }
}
