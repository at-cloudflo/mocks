import { Injectable } from '@angular/core';
import {
  AccessRequest,
  ApprovalItem,
  BusinessFunction,
  Collection,
  Domain,
  GlossaryTerm,
  Product,
} from './models';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  readonly stats = {
    products: '1,248',
    functions: '16',
    certified: '98%',
    owners: '450+',
  };

  readonly functions: BusinessFunction[] = [
    { slug: 'finance', name: 'Finance', icon: 'bank', description: 'Finance function enables financial control, planning, governance and value optimization across Qatar Airways Group.', products: 48, domains: 6, certified: '92%', owners: 23, featured: true },
    { slug: 'commercial', name: 'Commercial', icon: 'diamond', description: 'Revenue management, sales, distribution and network planning data for the commercial organization.', products: 82, domains: 5, certified: '95%', owners: 41, featured: true },
    { slug: 'operations', name: 'Operations', icon: 'gear', description: 'Flight operations, crew, fuel and on-time performance data across the operations control center.', products: 104, domains: 8, certified: '97%', owners: 58, featured: true },
    { slug: 'cargo', name: 'Cargo', icon: 'box', description: 'Cargo revenue, capacity, bookings and lane performance across QR Cargo.', products: 27, domains: 2, certified: '90%', owners: 12, featured: true },
    { slug: 'customer-experience', name: 'Customer Experience', icon: 'users', description: 'Loyalty, customer profiles, service recovery and voice-of-customer data.', products: 61, domains: 4, certified: '96%', owners: 28, featured: true },
    { slug: 'human-resources', name: 'Human Resources', icon: 'users', description: 'Workforce, recruitment, learning and organizational data.', products: 34, domains: 4, certified: '91%', owners: 18 },
    { slug: 'information-technology', name: 'Information Technology', icon: 'gear', description: 'IT service, infrastructure, security and application portfolio data.', products: 45, domains: 5, certified: '94%', owners: 21 },
    { slug: 'procurement', name: 'Procurement', icon: 'receipt', description: 'Sourcing, contracts, supplier performance and spend analytics.', products: 22, domains: 3, certified: '88%', owners: 9 },
    { slug: 'legal', name: 'Legal & Compliance', icon: 'shield', description: 'Regulatory, contract and compliance reporting data.', products: 11, domains: 2, certified: '85%', owners: 5 },
    { slug: 'corporate-safety', name: 'Corporate Safety & Security', icon: 'shield', description: 'Safety reporting, audits and security operations data.', products: 19, domains: 3, certified: '99%', owners: 8 },
    { slug: 'engineering', name: 'Engineering & MRO', icon: 'gear', description: 'Aircraft maintenance, reliability and technical records.', products: 57, domains: 6, certified: '96%', owners: 26 },
    { slug: 'marketing', name: 'Marketing', icon: 'chart', description: 'Campaign, brand, digital and market research data.', products: 29, domains: 3, certified: '89%', owners: 13 },
    { slug: 'strategy', name: 'Group Strategy', icon: 'chart', description: 'Corporate planning, performance and market intelligence.', products: 14, domains: 2, certified: '93%', owners: 6 },
    { slug: 'qas', name: 'Qatar Aviation Services', icon: 'box', description: 'Ground handling, ramp and passenger services data.', products: 31, domains: 4, certified: '90%', owners: 15 },
    { slug: 'hia', name: 'Hamad International Airport', icon: 'plane', description: 'Airport operations, retail and passenger flow data.', products: 43, domains: 5, certified: '95%', owners: 20 },
    { slug: 'qdf', name: 'Qatar Duty Free', icon: 'receipt', description: 'Retail sales, inventory and concession performance data.', products: 25, domains: 3, certified: '87%', owners: 11 },
  ];

  readonly domains: Domain[] = [
    { slug: 'gbs', fnSlug: 'finance', name: 'GBS', icon: 'org', description: 'Provides end-to-end business services and operational excellence across key financial processes.', products: 23, subDomains: ['Accounts Payable', 'Accounts Receivable', 'Vendor Management', 'General Ledger', 'Fixed Assets', 'Intercompany', 'Payroll Accounting', 'Master Data'] },
    { slug: 'business-finance', fnSlug: 'finance', name: 'Business Finance', icon: 'kpi', description: 'Financial planning, reporting and controlling.', products: 12, subDomains: ['Reporting', 'Controlling', 'Budgeting', 'Forecasting'] },
    { slug: 'treasury', fnSlug: 'finance', name: 'Treasury', icon: 'bank', description: 'Treasury operations, risk and liquidity management.', products: 13, subDomains: ['Cash Management', 'FX & Hedging', 'Debt', 'Investments', 'Bank Relations'] },
    { slug: 'tax', fnSlug: 'finance', name: 'Tax', icon: 'receipt', description: 'Tax planning, compliance and reporting.', products: 6, subDomains: ['Direct Tax', 'Indirect Tax'] },
    { slug: 'internal-audit', fnSlug: 'finance', name: 'Internal Audit', icon: 'shield', description: 'Internal audit and assurance.', products: 4, subDomains: ['Assurance'] },
    { slug: 'fpa', fnSlug: 'finance', name: 'FP&A', icon: 'doc', description: 'Financial planning and analysis.', products: 6, subDomains: ['Planning', 'Analysis'] },
    { slug: 'sales', fnSlug: 'commercial', name: 'Sales & Distribution', icon: 'chart', description: 'Agency and direct sales, channels and distribution.', products: 24, subDomains: ['Agency Sales', 'Direct Channels', 'NDC'] },
    { slug: 'revenue-management', fnSlug: 'commercial', name: 'Revenue Management', icon: 'kpi', description: 'Pricing, inventory and demand forecasting.', products: 21, subDomains: ['Pricing', 'Inventory', 'Forecasting'] },
    { slug: 'network-planning', fnSlug: 'commercial', name: 'Network Planning', icon: 'plane', description: 'Route profitability and schedule planning.', products: 15, subDomains: ['Routes', 'Schedules'] },
    { slug: 'trade-finance', fnSlug: 'commercial', name: 'Trade Finance', icon: 'receipt', description: 'Trade documentation and settlement for commercial partners.', products: 12, subDomains: ['Documentation', 'Settlement'] },
    { slug: 'alliances', fnSlug: 'commercial', name: 'Alliances & Partnerships', icon: 'users', description: 'Codeshare and partnership performance.', products: 10, subDomains: ['Codeshare', 'Interline'] },
    { slug: 'flight-ops', fnSlug: 'operations', name: 'Flight Operations', icon: 'plane', description: 'Flight movements, delays and OTP.', products: 32, subDomains: ['Movements', 'OTP', 'Disruption'] },
    { slug: 'fuel', fnSlug: 'operations', name: 'Fuel', icon: 'gear', description: 'Fuel uplift, burn and efficiency programs.', products: 14, subDomains: ['Uplift', 'Efficiency'] },
    { slug: 'crew', fnSlug: 'operations', name: 'Crew', icon: 'users', description: 'Crew rostering, utilization and training compliance.', products: 18, subDomains: ['Rostering', 'Training'] },
    { slug: 'ground-ops', fnSlug: 'operations', name: 'Ground Operations', icon: 'box', description: 'Turnaround, baggage and ramp performance.', products: 16, subDomains: ['Turnaround', 'Baggage'] },
    { slug: 'revenue', fnSlug: 'cargo', name: 'Revenue', icon: 'kpi', description: 'Cargo revenue by lane, product and customer.', products: 15, subDomains: ['Lanes', 'Products'] },
    { slug: 'capacity', fnSlug: 'cargo', name: 'Capacity', icon: 'box', description: 'Freighter and belly capacity utilization.', products: 12, subDomains: ['Freighters', 'Belly'] },
    { slug: 'loyalty', fnSlug: 'customer-experience', name: 'Loyalty', icon: 'star', description: 'Privilege Club members, tiers, accruals and redemptions.', products: 19, subDomains: ['Members', 'Accruals', 'Redemptions'] },
    { slug: 'flights-cx', fnSlug: 'customer-experience', name: 'Flights', icon: 'plane', description: 'Customer flight activity and journey data.', products: 17, subDomains: ['Journeys', 'Disruptions'] },
    { slug: 'service-recovery', fnSlug: 'customer-experience', name: 'Service Recovery', icon: 'shield', description: 'Complaints, compensation and recovery cases.', products: 13, subDomains: ['Cases', 'Compensation'] },
    { slug: 'voice-of-customer', fnSlug: 'customer-experience', name: 'Voice of Customer', icon: 'users', description: 'Surveys, NPS and sentiment.', products: 12, subDomains: ['NPS', 'Surveys'] },
  ];

  readonly products: Product[] = [
    {
      slug: 'gbs-vendor-master',
      name: 'GBS Vendor Master',
      certified: true,
      description: 'Master data for approved vendors used across GBS procurement and AP processes.',
      publishedBy: 'GBS Data Office',
      publishedOn: '12 Jun 2026',
      type: 'BigQuery Table',
      subscriptions: 6,
      likes: 9,
      fnSlug: 'finance', fnName: 'Finance',
      domainSlug: 'gbs', domainName: 'GBS',
      classification: 'Confidential — Restricted',
      assetType: 'DATASET',
      updated: '17 Aug 2026',
      sizeInfo: '184K rows',
      quality: [
        { kind: 'ok', text: 'Certified for business use' },
        { kind: 'ok', text: 'Refreshed weekly — Sundays, 10 AM' },
        { kind: 'ok', text: 'Complete — no missing fields' },
        { kind: 'owner', text: 'Owner — GBS Finance Team' },
      ],
      kv: [
        { k: 'UID', v: 'c37f6b48-6190-4934-951b-886a83d244fa', mono: true },
        { k: 'Display Name', v: 'GBS Vendor Master' },
        { k: 'Name', v: 'projects/qr-gbs-prod/datasets/gbs/tables/vendor_master', mono: true },
        { k: 'Create Time', v: '2025-06-12 · 09:40 AST' },
        { k: 'Update Time', v: '2026-08-17 · 10:00 AST' },
        { k: 'Rows · Columns', v: '184,206 rows · 42 columns' },
      ],
      sample: {
        columns: ['VENDOR_ID', 'VENDOR_NAME', 'COUNTRY', 'CATEGORY', 'PAYMENT_TERMS', 'STATUS', 'UPDATED_AT'],
        rows: [
          [{ value: 'V-104281' }, { value: 'Al Rayyan Catering Co.' }, { value: 'QA' }, { value: 'Catering' }, { value: 'NET 30' }, { value: 'ACTIVE', tone: 'ok' }, { value: '2026-08-17' }],
          [{ value: 'V-104282' }, { value: 'Gulf Ground Services LLC' }, { value: 'AE' }, { value: 'Ground Ops' }, { value: 'NET 45' }, { value: 'ACTIVE', tone: 'ok' }, { value: '2026-08-17' }],
          [{ value: 'V-104283' }, { value: '████████ Fuel Trading' }, { value: 'SG' }, { value: 'Fuel' }, { value: 'NET 60' }, { value: 'ACTIVE', tone: 'ok' }, { value: '2026-08-16' }],
          [{ value: 'V-104284' }, { value: 'Doha Tech Supplies WLL' }, { value: 'QA' }, { value: 'IT Hardware' }, { value: 'NET 30' }, { value: 'ON HOLD', tone: 'warn' }, { value: '2026-08-14' }],
          [{ value: 'V-104285' }, { value: '████████ Logistics FZE' }, { value: 'AE' }, { value: 'Cargo' }, { value: 'NET 45' }, { value: 'ACTIVE', tone: 'ok' }, { value: '2026-08-12' }],
          [{ value: 'V-104286' }, { value: 'Hamad Aviation Parts' }, { value: 'QA' }, { value: 'MRO' }, { value: 'NET 60' }, { value: 'ACTIVE', tone: 'ok' }, { value: '2026-08-10' }],
          [{ value: 'V-104287' }, { value: 'Skyline Media Group' }, { value: 'GB' }, { value: 'Marketing' }, { value: 'NET 30' }, { value: 'INACTIVE', tone: 'bad' }, { value: '2026-08-02' }],
          [{ value: 'V-104288' }, { value: '████████ Facilities Mgmt' }, { value: 'QA' }, { value: 'Facilities' }, { value: 'NET 30' }, { value: 'ACTIVE', tone: 'ok' }, { value: '2026-07-28' }],
          [{ value: 'V-104289' }, { value: 'Oryx Office Interiors' }, { value: 'QA' }, { value: 'Facilities' }, { value: 'NET 45' }, { value: 'ACTIVE', tone: 'ok' }, { value: '2026-07-21' }],
          [{ value: 'V-104290' }, { value: 'Jetstream Training Ltd' }, { value: 'GB' }, { value: 'Training' }, { value: 'NET 30' }, { value: 'ACTIVE', tone: 'ok' }, { value: '2026-07-18' }],
        ],
        totalColumns: 42,
        sampleRows: 100,
      },
      profiling: [
        { column: 'VENDOR_ID', type: 'STRING', completeness: 100, distinct: '184,206', min: 'V-000018', max: 'V-104290', top: '—' },
        { column: 'VENDOR_NAME', type: 'STRING', completeness: 100, distinct: '183,988', min: '—', max: '—', top: '—' },
        { column: 'COUNTRY', type: 'STRING', completeness: 99.8, distinct: '94', min: '—', max: '—', top: 'QA (41%)' },
        { column: 'CATEGORY', type: 'STRING', completeness: 98.4, distinct: '38', min: '—', max: '—', top: 'Facilities (14%)' },
        { column: 'PAYMENT_TERMS', type: 'STRING', completeness: 100, distinct: '6', min: '—', max: '—', top: 'NET 30 (52%)' },
        { column: 'STATUS', type: 'STRING', completeness: 100, distinct: '4', min: '—', max: '—', top: 'ACTIVE (87%)' },
        { column: 'CREDIT_LIMIT_QAR', type: 'NUMERIC', completeness: 91.2, distinct: '12,408', min: '0', max: '48,000,000', top: '—' },
        { column: 'ONBOARDED_AT', type: 'DATE', completeness: 100, distinct: '3,214', min: '2011-03-02', max: '2026-08-15', top: '—' },
        { column: 'UPDATED_AT', type: 'TIMESTAMP', completeness: 100, distinct: '9,911', min: '2024-01-04', max: '2026-08-17', top: '—' },
      ],
      lineage: {
        upstream: [
          { name: 'Oracle ERP — AP Suppliers', type: 'SOURCE SYSTEM · ORACLE' },
          { name: 'SAP Ariba — Supplier Network', type: 'SOURCE SYSTEM · SAP' },
          { name: 'stg_vendor_unified', type: 'STAGING · BIGQUERY' },
        ],
        downstream: [
          { name: 'GBS AP Aging Summary', type: 'KPI · LOOKER' },
          { name: 'GBS Cost Allocation Report', type: 'VISUALIZATION · LOOKER' },
          { name: 'Spend Analytics Model', type: 'ANALYTICAL MODEL · VERTEX AI' },
        ],
      },
      contract: {
        sla: [
          { k: 'Refresh schedule', v: 'Weekly — Sundays, 10:00 AST' },
          { k: 'Freshness guarantee', v: 'Data no older than 8 days' },
          { k: 'Availability', v: '99.5% monthly uptime' },
          { k: 'Support window', v: 'Sun–Thu, 08:00–17:00 AST' },
          { k: 'Incident response', v: 'P1 within 2 business hours' },
        ],
        schema: [
          { k: 'Schema evolution', v: 'Additive changes only — columns are never removed or renamed without a major version' },
          { k: 'Breaking changes', v: '30-day notice via Data Souq announcements' },
          { k: 'Primary key', v: 'VENDOR_ID — unique, never reused' },
          { k: 'Deprecation policy', v: '90-day sunset period with dual-run' },
        ],
        terms: [
          'Access is granted for internal Qatar Airways Group business purposes only.',
          'Sensitive vendor banking columns require a separate elevated-access request.',
          'Do not re-share extracts outside the approved consuming application.',
          'Usage is monitored; access is revoked after 90 days of inactivity.',
        ],
        versions: [
          { version: 'v2.3', date: '17 Aug 2026', author: 'GBS Data Office', change: 'Added ESG_RATING and LOCAL_CONTENT_PCT columns' },
          { version: 'v2.2', date: '02 May 2026', author: 'GBS Data Office', change: 'Payment terms normalized to ISO buckets' },
          { version: 'v2.0', date: '12 Jan 2026', author: 'GBS Data Office', change: 'Major — unified Oracle + Ariba sources' },
          { version: 'v1.4', date: '20 Sep 2025', author: 'GBS Data Office', change: 'Added masking policy for banking fields' },
        ],
      },
      discussions: [
        { author: 'Noora Al-Kuwari', initials: 'NK', time: '2 days ago', text: 'Is CREDIT_LIMIT_QAR converted at a fixed rate for non-QAR vendors, or spot rate at onboarding? The totals don’t reconcile with the Oracle AP view.', replies: 3 },
        { author: 'James Whitfield', initials: 'JW', time: '5 days ago', text: 'FYI — the ON HOLD status now also covers vendors pending ESG re-certification, not just payment disputes. Updated the column description accordingly.', replies: 1 },
        { author: 'Fatima Rashid', initials: 'FR', time: '2 weeks ago', text: 'Could we get VENDOR_TIER added to the sample preview? It’s non-sensitive and would help consumers evaluate fit before requesting access.', replies: 4 },
      ],
    },
    {
      slug: 'gbs-ap-aging-summary',
      name: 'GBS AP Aging Summary',
      certified: true,
      description: 'Accounts-payable aging buckets by vendor, entity and cost center.',
      publishedBy: 'GBS Data Office',
      publishedOn: '03 Mar 2026',
      type: 'Looker KPI',
      subscriptions: 14,
      likes: 22,
      fnSlug: 'finance', fnName: 'Finance',
      domainSlug: 'gbs', domainName: 'GBS',
      classification: 'Internal',
      assetType: 'KPI',
      updated: '21 Aug 2026',
      sizeInfo: 'Refreshed daily',
      quality: [
        { kind: 'ok', text: 'Certified for business use' },
        { kind: 'ok', text: 'Refreshed daily — 06:00 AST' },
        { kind: 'owner', text: 'Owner — GBS Finance Team' },
      ],
      kv: [
        { k: 'UID', v: '8b1f2c90-77aa-4f1e-9c33-51a09e7d4a10', mono: true },
        { k: 'Display Name', v: 'GBS AP Aging Summary' },
        { k: 'Name', v: 'looker/qr-finance/dashboards/ap_aging_summary', mono: true },
        { k: 'Create Time', v: '2026-03-03 · 11:20 AST' },
        { k: 'Update Time', v: '2026-08-21 · 06:00 AST' },
        { k: 'Granularity', v: 'Vendor × Entity × Cost Center · daily' },
      ],
    },
    {
      slug: 'gbs-cost-allocation-report',
      name: 'GBS Cost Allocation Report',
      certified: true,
      description: 'Monthly cost allocation summary across GBS cost centers.',
      publishedBy: 'GBS Data Office',
      publishedOn: '15 Jan 2026',
      type: 'Looker Dashboard',
      subscriptions: 9,
      likes: 11,
      fnSlug: 'finance', fnName: 'Finance',
      domainSlug: 'gbs', domainName: 'GBS',
      classification: 'Internal',
      assetType: 'VISUALIZATION',
      updated: '01 Aug 2026',
      sizeInfo: 'Looker',
      quality: [
        { kind: 'ok', text: 'Certified for business use' },
        { kind: 'ok', text: 'Refreshed monthly — 1st business day' },
        { kind: 'owner', text: 'Owner — GBS Finance Team' },
      ],
      kv: [
        { k: 'UID', v: 'f4a7d1e2-3b58-4c96-8d07-2e91b6c53f88', mono: true },
        { k: 'Display Name', v: 'GBS Cost Allocation Report' },
        { k: 'Name', v: 'looker/qr-finance/dashboards/gbs_cost_allocation', mono: true },
        { k: 'Create Time', v: '2026-01-15 · 09:05 AST' },
        { k: 'Update Time', v: '2026-08-01 · 07:30 AST' },
        { k: 'Granularity', v: 'Cost center × month' },
      ],
    },
    {
      slug: 'gbs-trade-documentation',
      name: 'GBS A — Trade Documentation',
      certified: false,
      description: "Trade finance documentation set used by Commercial's GBS A shared-services pod.",
      publishedBy: 'Commercial Data Office',
      publishedOn: '28 Apr 2026',
      type: 'BigQuery Dataset',
      subscriptions: 3,
      likes: 4,
      fnSlug: 'commercial', fnName: 'Commercial',
      domainSlug: 'trade-finance', domainName: 'Trade Finance',
      classification: 'Confidential',
      assetType: 'DATASET',
      updated: '15 Aug 2026',
      sizeInfo: '62K rows',
      quality: [
        { kind: 'ok', text: 'Refreshed daily — 05:00 AST' },
        { kind: 'owner', text: 'Owner — Commercial Trade Finance Team' },
      ],
      kv: [
        { k: 'UID', v: 'a91c3e57-0d24-48fb-b6a1-77c50d9e2b43', mono: true },
        { k: 'Display Name', v: 'GBS A — Trade Documentation' },
        { k: 'Name', v: 'projects/qr-comm-prod/datasets/trade/tables/documentation', mono: true },
        { k: 'Create Time', v: '2026-04-28 · 14:12 AST' },
        { k: 'Update Time', v: '2026-08-15 · 05:00 AST' },
        { k: 'Rows · Columns', v: '62,410 rows · 28 columns' },
      ],
    },
    {
      slug: 'treasury-cash-position',
      name: 'Treasury Cash Position',
      certified: true,
      description: 'Daily consolidated group cash position across banks, entities and currencies.',
      publishedBy: 'Treasury Data Office',
      publishedOn: '09 Feb 2026',
      type: 'Looker KPI',
      subscriptions: 18,
      likes: 27,
      fnSlug: 'finance', fnName: 'Finance',
      domainSlug: 'treasury', domainName: 'Treasury',
      classification: 'Confidential — Restricted',
      assetType: 'KPI',
      updated: '21 Aug 2026',
      sizeInfo: 'Refreshed daily',
      quality: [
        { kind: 'ok', text: 'Certified for business use' },
        { kind: 'ok', text: 'Refreshed daily — 07:00 AST' },
        { kind: 'owner', text: 'Owner — Treasury Data Office' },
      ],
      kv: [
        { k: 'UID', v: 'd25e8f13-6a47-4b02-91cd-30e8a5f7c261', mono: true },
        { k: 'Display Name', v: 'Treasury Cash Position' },
        { k: 'Name', v: 'looker/qr-finance/dashboards/cash_position', mono: true },
        { k: 'Create Time', v: '2026-02-09 · 08:45 AST' },
        { k: 'Update Time', v: '2026-08-21 · 07:00 AST' },
        { k: 'Granularity', v: 'Bank account × currency · daily' },
      ],
    },
    {
      slug: 'customer-loyalty-history',
      name: 'Customer Loyalty History',
      certified: true,
      description: 'Privilege Club member tier history, accruals and redemptions over time.',
      publishedBy: 'CX Data Office',
      publishedOn: '22 Nov 2025',
      type: 'BigQuery Table',
      subscriptions: 21,
      likes: 35,
      fnSlug: 'customer-experience', fnName: 'Customer Experience',
      domainSlug: 'loyalty', domainName: 'Loyalty',
      classification: 'Confidential — PII',
      assetType: 'DATASET',
      updated: '20 Aug 2026',
      sizeInfo: '12.4M rows',
      quality: [
        { kind: 'ok', text: 'Certified for business use' },
        { kind: 'ok', text: 'Refreshed daily — 04:00 AST' },
        { kind: 'ok', text: 'PII columns masked by default' },
        { kind: 'owner', text: 'Owner — CX Data Office' },
      ],
      kv: [
        { k: 'UID', v: '73b0a9c4-15dd-4e86-a2f9-88c1d4e60b57', mono: true },
        { k: 'Display Name', v: 'Customer Loyalty History' },
        { k: 'Name', v: 'projects/qr-cx-prod/datasets/loyalty/tables/member_history', mono: true },
        { k: 'Create Time', v: '2025-11-22 · 10:30 AST' },
        { k: 'Update Time', v: '2026-08-20 · 04:00 AST' },
        { k: 'Rows · Columns', v: '12,431,908 rows · 36 columns' },
      ],
    },
    {
      slug: 'customer-flight-activity',
      name: 'Customer Flight Activity',
      certified: true,
      description: 'Flight-level activity per customer journey, including segments, cabin and disruption events.',
      publishedBy: 'CX Data Office',
      publishedOn: '30 Oct 2025',
      type: 'BigQuery Table',
      subscriptions: 17,
      likes: 24,
      fnSlug: 'customer-experience', fnName: 'Customer Experience',
      domainSlug: 'flights-cx', domainName: 'Flights',
      classification: 'Confidential — PII',
      assetType: 'DATASET',
      updated: '21 Aug 2026',
      sizeInfo: '48.9M rows',
      quality: [
        { kind: 'ok', text: 'Certified for business use' },
        { kind: 'ok', text: 'Refreshed hourly' },
        { kind: 'owner', text: 'Owner — CX Data Office' },
      ],
      kv: [
        { k: 'UID', v: '5e6c2d81-940b-47a3-bc15-6f2a8d90e734', mono: true },
        { k: 'Display Name', v: 'Customer Flight Activity' },
        { k: 'Name', v: 'projects/qr-cx-prod/datasets/flights/tables/customer_activity', mono: true },
        { k: 'Create Time', v: '2025-10-30 · 13:00 AST' },
        { k: 'Update Time', v: '2026-08-21 · 15:00 AST' },
        { k: 'Rows · Columns', v: '48,902,113 rows · 51 columns' },
      ],
    },
    {
      slug: 'fuel-uplift-transactions',
      name: 'Fuel Uplift Transactions',
      certified: true,
      description: 'Per-flight fuel uplift transactions by station, supplier and aircraft.',
      publishedBy: 'Ops Data Office',
      publishedOn: '18 Dec 2025',
      type: 'BigQuery Table',
      subscriptions: 8,
      likes: 12,
      fnSlug: 'operations', fnName: 'Operations',
      domainSlug: 'fuel', domainName: 'Fuel',
      classification: 'Internal',
      assetType: 'DATASET',
      updated: '21 Aug 2026',
      sizeInfo: '3.1M rows',
      quality: [
        { kind: 'ok', text: 'Certified for business use' },
        { kind: 'ok', text: 'Refreshed daily — 03:00 AST' },
        { kind: 'owner', text: 'Owner — Ops Data Office' },
      ],
      kv: [
        { k: 'UID', v: '2c48b7f0-8e11-4d6a-9b52-c07f3a61d985', mono: true },
        { k: 'Display Name', v: 'Fuel Uplift Transactions' },
        { k: 'Name', v: 'projects/qr-ops-prod/datasets/fuel/tables/uplift_txn', mono: true },
        { k: 'Create Time', v: '2025-12-18 · 09:00 AST' },
        { k: 'Update Time', v: '2026-08-21 · 03:00 AST' },
        { k: 'Rows · Columns', v: '3,104,556 rows · 24 columns' },
      ],
    },
    {
      slug: 'cargo-revenue-by-lane',
      name: 'Cargo Revenue by Lane',
      certified: false,
      description: 'Cargo revenue and yield by origin-destination lane, product and month.',
      publishedBy: 'Cargo Data Office',
      publishedOn: '05 May 2026',
      type: 'Looker Dashboard',
      subscriptions: 5,
      likes: 7,
      fnSlug: 'cargo', fnName: 'Cargo',
      domainSlug: 'revenue', domainName: 'Revenue',
      classification: 'Internal',
      assetType: 'VISUALIZATION',
      updated: '18 Aug 2026',
      sizeInfo: 'Looker',
      quality: [
        { kind: 'ok', text: 'Refreshed weekly — Mondays' },
        { kind: 'owner', text: 'Owner — Cargo Data Office' },
      ],
      kv: [
        { k: 'UID', v: '90d3f6a2-1b7c-4e58-8a04-5dc2e97b1f36', mono: true },
        { k: 'Display Name', v: 'Cargo Revenue by Lane' },
        { k: 'Name', v: 'looker/qr-cargo/dashboards/revenue_by_lane', mono: true },
        { k: 'Create Time', v: '2026-05-05 · 12:00 AST' },
        { k: 'Update Time', v: '2026-08-18 · 06:30 AST' },
        { k: 'Granularity', v: 'O&D lane × product × month' },
      ],
    },
  ];

  readonly myRequests: AccessRequest[] = [
    { productSlug: 'gbs-vendor-master', productName: 'GBS Vendor Master', path: 'Finance › GBS', accessType: 'Read — BigQuery', requestedOn: '18 Aug 2026', approver: 'GBS Finance Team', status: 'Pending' },
    { productSlug: 'treasury-cash-position', productName: 'Treasury Cash Position', path: 'Finance › Treasury', accessType: 'Dashboard viewer', requestedOn: '12 Aug 2026', approver: 'Treasury Data Office', status: 'Approved' },
    { productSlug: 'customer-loyalty-history', productName: 'Customer Loyalty History', path: 'Customer Experience › Loyalty', accessType: 'Read — BigQuery', requestedOn: '04 Aug 2026', approver: 'CX Data Office', status: 'Rejected' },
    { productSlug: 'fuel-uplift-transactions', productName: 'Fuel Uplift Transactions', path: 'Operations › Fuel', accessType: 'Read — BigQuery', requestedOn: '29 Jul 2026', approver: 'Ops Data Office', status: 'Approved' },
    { productSlug: 'gbs-ap-aging-summary', productName: 'GBS AP Aging Summary', path: 'Finance › GBS', accessType: 'KPI subscription', requestedOn: '22 Jul 2026', approver: 'GBS Finance Team', status: 'Pending' },
    { productSlug: 'cargo-revenue-by-lane', productName: 'Cargo Revenue by Lane', path: 'Cargo › Revenue', accessType: 'Dashboard viewer', requestedOn: '14 Jul 2026', approver: 'Cargo Data Office', status: 'Approved' },
  ];

  readonly approvals: ApprovalItem[] = [
    { requester: 'Mohammed Al-Sulaiti', initials: 'MS', department: 'Financial Planning & Analysis', productSlug: 'gbs-vendor-master', productName: 'GBS Vendor Master', path: 'Finance › GBS', accessType: 'Read — BigQuery', requestedOn: '20 Aug 2026', justification: 'Vendor spend baseline for the FY27 budgeting cycle.' },
    { requester: 'Sarah Chen', initials: 'SC', department: 'Procurement Analytics', productSlug: 'gbs-vendor-master', productName: 'GBS Vendor Master', path: 'Finance › GBS', accessType: 'Read — BigQuery', requestedOn: '19 Aug 2026', justification: 'Supplier consolidation study across GBS categories.' },
    { requester: 'Omar Haddad', initials: 'OH', department: 'Internal Audit', productSlug: 'gbs-ap-aging-summary', productName: 'GBS AP Aging Summary', path: 'Finance › GBS', accessType: 'KPI subscription', requestedOn: '17 Aug 2026', justification: 'Quarterly AP controls testing — aging trend evidence.' },
  ];

  readonly bookmarks: { productSlug: string; tag2: string }[] = [
    { productSlug: 'customer-loyalty-history', tag2: 'Loyalty' },
    { productSlug: 'customer-flight-activity', tag2: 'Flights' },
    { productSlug: 'gbs-vendor-master', tag2: 'GBS' },
    { productSlug: 'treasury-cash-position', tag2: 'Treasury' },
  ];

  readonly collections: Collection[] = [
    { slug: 'fy27-budget-pack', name: 'FY27 Budget Pack', icon: 'doc', description: 'Everything the FP&A team needs for the FY27 budgeting cycle — spend, headcount and vendor baselines.', items: 8, owner: 'You', shared: false },
    { slug: 'vendor-360', name: 'Vendor 360', icon: 'org', description: 'Vendor master, spend, aging and performance assets for supplier reviews.', items: 6, owner: 'GBS Finance Team', shared: true },
    { slug: 'loyalty-insights', name: 'Loyalty Insights', icon: 'star', description: 'Privilege Club member behavior, accrual and redemption analytics.', items: 11, owner: 'CX Data Office', shared: true },
    { slug: 'otp-review', name: 'OTP Monthly Review', icon: 'plane', description: 'On-time performance datasets and KPIs used in the monthly ops review.', items: 5, owner: 'Ops Data Office', shared: true },
    { slug: 'fuel-efficiency', name: 'Fuel Efficiency Program', icon: 'gear', description: 'Uplift, burn and route efficiency data supporting the fuel program.', items: 7, owner: 'You', shared: false },
    { slug: 'cargo-commercial', name: 'Cargo Commercial Pack', icon: 'box', description: 'Lane revenue, capacity and booking assets for cargo commercial planning.', items: 4, owner: 'Cargo Data Office', shared: true },
  ];

  readonly glossary: GlossaryTerm[] = [
    { term: 'Accrual (Loyalty)', definition: 'Qmiles or Avios earned by a Privilege Club member from a qualifying activity — flights, partner spend or promotions — credited to the member balance.', fn: 'Customer Experience', domain: 'Loyalty', steward: 'CX Data Office' },
    { term: 'AP Aging', definition: 'Classification of unpaid supplier invoices into time buckets (current, 30, 60, 90+ days) measured from the invoice due date.', fn: 'Finance', domain: 'GBS', steward: 'GBS Finance Team' },
    { term: 'Available Seat Kilometre (ASK)', definition: 'A measure of passenger carrying capacity: number of seats available multiplied by the distance flown in kilometres.', fn: 'Commercial', domain: 'Revenue Management', steward: 'Commercial Data Office' },
    { term: 'Block Hours', definition: 'The time from the moment an aircraft first moves under its own power until it comes to rest at the destination gate.', fn: 'Operations', domain: 'Flight Operations', steward: 'Ops Data Office' },
    { term: 'Cash Position', definition: 'The consolidated balance of cash and cash equivalents across all group bank accounts at a point in time, normalized to QAR.', fn: 'Finance', domain: 'Treasury', steward: 'Treasury Data Office' },
    { term: 'Certified Data Product', definition: 'A data product that has passed the Data Governance certification checklist: documented ownership, quality rules, refresh SLA and an approved data contract.', fn: 'All', domain: 'Governance', steward: 'Group Data Governance' },
    { term: 'Chargeable Weight', definition: 'The greater of actual gross weight and volumetric weight of a cargo shipment, used as the basis for freight charges.', fn: 'Cargo', domain: 'Revenue', steward: 'Cargo Data Office' },
    { term: 'Data Contract', definition: 'A versioned agreement between a data product owner and its consumers covering schema guarantees, refresh SLAs, quality thresholds and terms of use.', fn: 'All', domain: 'Governance', steward: 'Group Data Governance' },
    { term: 'Load Factor', definition: 'Revenue passenger kilometres divided by available seat kilometres — the share of capacity actually sold.', fn: 'Commercial', domain: 'Revenue Management', steward: 'Commercial Data Office' },
    { term: 'On-Time Performance (OTP)', definition: 'The percentage of flights departing (D0/D15) or arriving (A0/A15) within the defined threshold of the scheduled time.', fn: 'Operations', domain: 'Flight Operations', steward: 'Ops Data Office' },
    { term: 'Privilege Club Tier', definition: 'Membership level (Burgundy, Silver, Gold, Platinum) determined by Qpoints earned in a rolling qualification window.', fn: 'Customer Experience', domain: 'Loyalty', steward: 'CX Data Office' },
    { term: 'Turnaround Time', definition: 'The elapsed time between an aircraft arriving on-blocks and departing off-blocks for its next sector.', fn: 'Operations', domain: 'Ground Operations', steward: 'Ops Data Office' },
    { term: 'Vendor Master', definition: 'The governed, de-duplicated record of all approved suppliers, including identifiers, categories, payment terms and status.', fn: 'Finance', domain: 'GBS', steward: 'GBS Finance Team' },
    { term: 'Yield (Cargo)', definition: 'Cargo revenue divided by chargeable weight, typically expressed per kilogram for an origin-destination lane.', fn: 'Cargo', domain: 'Revenue', steward: 'Cargo Data Office' },
  ];

  functionBySlug(slug: string): BusinessFunction | undefined {
    return this.functions.find((f) => f.slug === slug);
  }

  domainsFor(fnSlug: string): Domain[] {
    return this.domains.filter((d) => d.fnSlug === fnSlug);
  }

  domainBySlug(fnSlug: string, slug: string): Domain | undefined {
    return this.domains.find((d) => d.fnSlug === fnSlug && d.slug === slug);
  }

  productBySlug(slug: string): Product | undefined {
    return this.products.find((p) => p.slug === slug);
  }

  productsInDomain(fnSlug: string, domainSlug: string): Product[] {
    return this.products.filter((p) => p.fnSlug === fnSlug && p.domainSlug === domainSlug);
  }

  get pendingApprovals(): number {
    return this.approvals.length;
  }
}
