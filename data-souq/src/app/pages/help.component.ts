import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../icon.component';

@Component({
  selector: 'app-help',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent],
  template: `
    <header class="page-head page-head--pad">
      <nav class="crumbs" aria-label="Breadcrumb">
        <a routerLink="/">Home</a><span>›</span>
        <span class="current">Help &amp; Support</span>
      </nav>
      <div class="title-row" style="align-items:center;margin-top:16px">
        <div>
          <h1 class="page-title">Help &amp; Support</h1>
          <p class="lede" style="margin-top:6px;font-size:13px">
            Guides, answers and contacts to help you get the most out of Data Souq.
          </p>
        </div>
      </div>
    </header>

    <div class="content">
      <section class="help-cards" aria-label="Support options">
        <a class="tile tile--domain" routerLink="/functions">
          <span class="icon-circle"><app-icon name="grid" /></span>
          <span class="tile-name">Getting started</span>
          <span class="tile-desc">Learn how to browse business functions, evaluate data products and request access in minutes.</span>
          <span class="tile-arrow"><app-icon name="arrow" [size]="15" /></span>
        </a>
        <a class="tile tile--domain" routerLink="/glossary">
          <span class="icon-circle"><app-icon name="glossary" /></span>
          <span class="tile-name">Data glossary</span>
          <span class="tile-desc">Understand the shared business vocabulary used across data products and KPIs.</span>
          <span class="tile-arrow"><app-icon name="arrow" [size]="15" /></span>
        </a>
        <a class="tile tile--domain" href="mailto:datasouq&#64;qatarairways.com.qa">
          <span class="icon-circle"><app-icon name="users" /></span>
          <span class="tile-name">Contact the Data Office</span>
          <span class="tile-desc">Can't find what you need? Reach the Group Data Office — we respond within one business day.</span>
          <span class="tile-arrow"><app-icon name="arrow" [size]="15" /></span>
        </a>
      </section>

      <section aria-labelledby="faq-heading">
        <div class="section-head">
          <h2 id="faq-heading">Frequently asked questions</h2>
        </div>
        <div class="accordion" id="faqAccordion">
          @for (faq of faqs; track faq.q; let i = $index) {
            <div class="accordion-item">
              <h3 class="accordion-header">
                <button class="accordion-button" [class.collapsed]="i !== 0" type="button"
                  data-bs-toggle="collapse" [attr.data-bs-target]="'#faq-' + i"
                  [attr.aria-expanded]="i === 0" [attr.aria-controls]="'faq-' + i">
                  {{ faq.q }}
                </button>
              </h3>
              <div [id]="'faq-' + i" class="accordion-collapse collapse" [class.show]="i === 0" data-bs-parent="#faqAccordion">
                <div class="accordion-body">{{ faq.a }}</div>
              </div>
            </div>
          }
        </div>
      </section>

      <section class="stat-band" aria-label="Support channels">
        <div class="stat">
          <span class="icon-circle"><app-icon name="help" /></span>
          <span><span class="stat-num" style="font-size:15px">ServiceNow</span><span class="stat-label">Raise a ticket — category "Data Souq"</span></span>
        </div>
        <div class="stat">
          <span class="icon-circle"><app-icon name="users" /></span>
          <span><span class="stat-num" style="font-size:15px">#data-souq</span><span class="stat-label">Ask the community on Teams</span></span>
        </div>
        <div class="stat">
          <span class="icon-circle"><app-icon name="requests" /></span>
          <span><span class="stat-num" style="font-size:15px">Office hours</span><span class="stat-label">Sun–Thu · 10:00–11:00 AST</span></span>
        </div>
      </section>
    </div>
  `,
})
export class HelpComponent {
  protected readonly faqs = [
    { q: 'How do I get access to a data product?', a: 'Open the data product and click "Request Access". Choose the access type (BigQuery read, dashboard viewer or KPI subscription) and provide a business justification. The request is routed to the data product owner, and you can track its status under Requests → My Requests.' },
    { q: 'What does the "Certified" badge mean?', a: 'Certified data products have passed the Data Governance certification checklist: documented ownership, published data contract, agreed refresh SLA and automated quality checks. Prefer certified products for business reporting.' },
    { q: 'Why are some columns masked in the sample dataset?', a: 'Sample previews anonymize sensitive columns (PII, banking details, commercial terms) until access is granted. Once your request is approved, you see the full data through the approved access path.' },
    { q: 'How long do access approvals take?', a: 'Most requests are decided within two business days. Restricted or PII-classified products may require an additional review by the data protection team.' },
    { q: 'Can I share a data product with my team?', a: 'Access is granted per person and must not be re-shared. Instead, add the product to a shared Collection and ask teammates to submit their own requests — approvers can bulk-approve for a team.' },
    { q: 'How do I publish my own data product?', a: 'Data products are published by your function\'s data office. Contact your data office with the dataset details, ownership and refresh schedule; they will onboard it through the publishing workflow and certification checklist.' },
  ];
}
