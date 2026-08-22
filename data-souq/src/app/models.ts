export type AssetType = 'DATASET' | 'KPI' | 'VISUALIZATION' | 'ANALYTICAL MODEL';

export interface BusinessFunction {
  slug: string;
  name: string;
  icon: string;
  description: string;
  products: number;
  domains: number;
  certified: string;
  owners: number;
  featured?: boolean;
}

export interface Domain {
  slug: string;
  fnSlug: string;
  name: string;
  icon: string;
  description: string;
  products: number;
  subDomains: string[];
}

export interface KvRow {
  k: string;
  v: string;
  mono?: boolean;
}

export interface QualityItem {
  kind: 'ok' | 'owner';
  text: string;
}

export interface ProfilingRow {
  column: string;
  type: string;
  completeness: number;
  distinct: string;
  min: string;
  max: string;
  top: string;
}

export interface LineageNode {
  name: string;
  type: string;
}

export interface ContractClause {
  k: string;
  v: string;
}

export interface ContractVersion {
  version: string;
  date: string;
  author: string;
  change: string;
}

export interface Thread {
  author: string;
  initials: string;
  time: string;
  text: string;
  replies: number;
}

export interface SampleCell {
  value: string;
  tone?: 'ok' | 'warn' | 'bad';
}

export interface Product {
  slug: string;
  name: string;
  certified: boolean;
  description: string;
  publishedBy: string;
  publishedOn: string;
  type: string;
  subscriptions: number;
  likes: number;
  fnSlug: string;
  fnName: string;
  domainSlug: string;
  domainName: string;
  classification: string;
  assetType: AssetType;
  updated: string;
  sizeInfo: string;
  quality: QualityItem[];
  kv: KvRow[];
  sample?: {
    columns: string[];
    rows: SampleCell[][];
    totalColumns: number;
    sampleRows: number;
  };
  profiling?: ProfilingRow[];
  lineage?: { upstream: LineageNode[]; downstream: LineageNode[] };
  contract?: {
    sla: ContractClause[];
    schema: ContractClause[];
    terms: string[];
    versions: ContractVersion[];
  };
  discussions?: Thread[];
}

export type RequestStatus = 'Pending' | 'Approved' | 'Rejected';

export interface AccessRequest {
  productSlug: string;
  productName: string;
  path: string;
  accessType: string;
  requestedOn: string;
  approver: string;
  status: RequestStatus;
}

export interface ApprovalItem {
  requester: string;
  initials: string;
  department: string;
  productSlug: string;
  productName: string;
  path: string;
  accessType: string;
  requestedOn: string;
  justification: string;
}

export interface Collection {
  slug: string;
  name: string;
  icon: string;
  description: string;
  items: number;
  owner: string;
  shared: boolean;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  fn: string;
  domain: string;
  steward: string;
}
