import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogService } from '../catalog.service';
import { IconComponent } from '../icon.component';

@Component({
  selector: 'app-collections',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent],
  template: `
    <header class="page-head page-head--pad">
      <nav class="crumbs" aria-label="Breadcrumb">
        <a routerLink="/">Home</a><span>›</span>
        <span class="current">Collections</span>
      </nav>
      <div class="title-row" style="align-items:center;margin-top:16px">
        <div>
          <h1 class="page-title">Collections</h1>
          <p class="lede" style="margin-top:6px;font-size:13px">
            Curated sets of data products grouped for a team, project or recurring business process.
          </p>
        </div>
        <button class="btn-primary" type="button">+ New Collection</button>
      </div>
    </header>

    <div class="content">
      <section aria-labelledby="my-collections-heading">
        <div class="section-head">
          <h2 id="my-collections-heading">My collections</h2>
        </div>
        <div class="grid-3">
          @for (c of mine; track c.slug) {
            <a class="tile tile--domain" routerLink="/search">
              <span class="icon-circle"><app-icon [name]="c.icon" /></span>
              <span class="tile-name">{{ c.name }}</span>
              <span class="tile-desc">{{ c.description }}</span>
              <span class="tile-foot">
                <span class="big-num">{{ c.items }} <small>Data Products</small></span>
                <span class="big-num big-num--dark"><small>Private</small></span>
              </span>
            </a>
          }
        </div>
      </section>

      <section aria-labelledby="shared-collections-heading">
        <div class="section-head">
          <h2 id="shared-collections-heading">Shared with you</h2>
        </div>
        <div class="grid-3">
          @for (c of shared; track c.slug) {
            <a class="tile tile--domain" routerLink="/search">
              <span class="icon-circle"><app-icon [name]="c.icon" /></span>
              <span class="tile-name">{{ c.name }}</span>
              <span class="tile-desc">{{ c.description }}</span>
              <span class="tile-foot">
                <span class="big-num">{{ c.items }} <small>Data Products</small></span>
                <span class="big-num big-num--dark"><small>By {{ c.owner }}</small></span>
              </span>
            </a>
          }
        </div>
      </section>
    </div>
  `,
})
export class CollectionsComponent {
  private readonly catalog = inject(CatalogService);
  protected readonly mine = this.catalog.collections.filter((c) => !c.shared);
  protected readonly shared = this.catalog.collections.filter((c) => c.shared);
}
