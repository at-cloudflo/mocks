import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogService } from '../catalog.service';
import { IconComponent } from '../icon.component';
import { RequestStatus } from '../models';

type StatusFilter = 'All' | RequestStatus;

@Component({
  selector: 'app-requests',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent],
  template: `
    <header class="page-head">
      <nav class="crumbs" aria-label="Breadcrumb">
        <a routerLink="/">Home</a><span>›</span>
        <span class="current">Requests</span>
      </nav>
      <div class="title-row" style="align-items:center;margin-top:16px">
        <div>
          <h1 class="page-title">Requests</h1>
          <p class="lede" style="margin-top:6px;font-size:13px">Track your access requests and act on approvals assigned to you.</p>
        </div>
        <button class="btn-primary" type="button">+ New Request</button>
      </div>
      <nav class="tabs" style="margin-top:20px" aria-label="Request views">
        <a class="tab" [class.is-active]="view() !== 'approvals'" routerLink="/requests">My Requests</a>
        <a class="tab" [class.is-active]="view() === 'approvals'" routerLink="/requests/approvals">
          Approvals <span class="tab-badge">{{ catalog.approvals.length }}</span>
        </a>
      </nav>
    </header>

    <div class="content content--tight">
      @if (view() !== 'approvals') {
        <div class="chip-filters" role="group" aria-label="Filter by status">
          <button class="chip-filter" [class.is-active]="filter() === 'All'" (click)="filter.set('All')">All · {{ catalog.myRequests.length }}</button>
          <button class="chip-filter chip-filter--pending" [class.is-active]="filter() === 'Pending'" (click)="filter.set('Pending')">Pending · {{ countByStatus('Pending') }}</button>
          <button class="chip-filter chip-filter--approved" [class.is-active]="filter() === 'Approved'" (click)="filter.set('Approved')">Approved · {{ countByStatus('Approved') }}</button>
          <button class="chip-filter chip-filter--rejected" [class.is-active]="filter() === 'Rejected'" (click)="filter.set('Rejected')">Rejected · {{ countByStatus('Rejected') }}</button>
        </div>

        <div class="data-card">
          <div class="table-scroll">
            <table class="data data--requests">
              <thead>
                <tr>
                  <th style="width:26%">DATA PRODUCT</th>
                  <th>ACCESS TYPE</th>
                  <th>REQUESTED ON</th>
                  <th>APPROVER</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                @for (r of myRequests(); track r.productSlug + r.requestedOn) {
                  <tr>
                    <td>
                      <a class="row-title" [routerLink]="['/products', r.productSlug]">{{ r.productName }}</a>
                      <span class="row-sub">{{ r.path }}</span>
                    </td>
                    <td>{{ r.accessType }}</td>
                    <td>{{ r.requestedOn }}</td>
                    <td>{{ r.approver }}</td>
                    <td>
                      <span class="status"
                        [class.status--pending]="r.status === 'Pending'"
                        [class.status--approved]="r.status === 'Approved'"
                        [class.status--rejected]="r.status === 'Rejected'">{{ r.status }}</span>
                    </td>
                    <td>
                      @switch (r.status) {
                        @case ('Pending') { <button class="row-action" type="button">Withdraw</button> }
                        @case ('Approved') { <a class="row-action" [routerLink]="['/products', r.productSlug]">Open</a> }
                        @case ('Rejected') { <button class="row-action" type="button">View reason</button> }
                      }
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      } @else {
        <div class="note-row">
          <div class="note-left">
            <span class="chip chip--warning"><app-icon name="requests" [size]="12" />{{ catalog.approvals.length }} awaiting your decision</span>
            <span class="note-hint">You are the approving data owner for these requests.</span>
          </div>
        </div>

        <div class="data-card">
          <div class="table-scroll">
            <table class="data data--requests">
              <thead>
                <tr>
                  <th style="width:22%">REQUESTER</th>
                  <th style="width:22%">DATA PRODUCT</th>
                  <th>ACCESS TYPE</th>
                  <th>REQUESTED ON</th>
                  <th style="width:24%">JUSTIFICATION</th>
                  <th>DECISION</th>
                </tr>
              </thead>
              <tbody>
                @for (a of catalog.approvals; track a.requester + a.productSlug) {
                  <tr>
                    <td>
                      <span style="display:flex;align-items:center;gap:10px">
                        <span class="avatar" style="width:30px;height:30px;font-size:11px">{{ a.initials }}</span>
                        <span>
                          <span class="row-title" style="display:block">{{ a.requester }}</span>
                          <span class="row-sub" style="margin-top:0">{{ a.department }}</span>
                        </span>
                      </span>
                    </td>
                    <td>
                      <a class="row-title" [routerLink]="['/products', a.productSlug]">{{ a.productName }}</a>
                      <span class="row-sub">{{ a.path }}</span>
                    </td>
                    <td>{{ a.accessType }}</td>
                    <td>{{ a.requestedOn }}</td>
                    <td style="color:var(--qr-text-body)">{{ a.justification }}</td>
                    <td>
                      <span style="display:flex;gap:8px">
                        <button class="btn btn-sm btn-success" type="button" style="font-size:11.5px;padding:4px 12px">Approve</button>
                        <button class="btn btn-sm btn-outline-danger" type="button" style="font-size:11.5px;padding:4px 12px">Reject</button>
                      </span>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  `,
})
export class RequestsComponent {
  protected readonly catalog = inject(CatalogService);
  readonly view = input<string>();

  protected readonly filter = signal<StatusFilter>('All');

  protected readonly myRequests = computed(() => {
    const f = this.filter();
    return f === 'All' ? this.catalog.myRequests : this.catalog.myRequests.filter((r) => r.status === f);
  });

  protected countByStatus(status: RequestStatus): number {
    return this.catalog.myRequests.filter((r) => r.status === status).length;
  }
}
