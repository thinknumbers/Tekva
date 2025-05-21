export interface Deal {
  id: string;
  name: string;
  originator: string;
  assetType?: string; // Added
  amount: number;
  currency: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Funded' | 'Under Review' | 'Draft' | 'Expired'; // Extended statuses for dashboard
  submittedDate: string;
  creditScore?: number; 
  facilityId?: string;
  riskScore?: number; // Added for Deal Pipeline
}

export interface Facility {
  id: string;
  name: string;
  type: 'Revolving' | 'Term Loan' | 'Warehouse';
  limit: number;
  utilized: number;
  currency: string;
  originator: string;
  status: 'Active' | 'Pending Approval' | 'Closed';
  covenants?: Covenant[];
}

export interface Covenant {
  id: string;
  name: string;
  description: string;
  status: 'Compliant' | 'Breached' | 'Warning';
  thresholdValue?: string;
  currentValue?: string;
}

export interface UserProfile {
  name: string;
  role: string;
  avatarUrl?: string;
  location?: string; // Added
}

export type ThemeName = 'light' | 'dark';

export interface ThemeOption {
  name: string;
  primaryColor: string; // hex code
  label: string;
}

export interface ThemeContextType {
  themeName: ThemeName;
  primaryColor: string;
  themeOptions: ThemeOption[];
  setThemeName: (name: ThemeName) => void;
  setPrimaryColor: (color: string) => void;
  setSelectedThemeOption: (theme: ThemeOption) => void;
}

// For Dashboard Recent Activity
export interface ActivityItem {
  id: string;
  type: 'new_deal' | 'assessment_complete' | 'cash_reconciliation' | 'covenant_alert';
  title: string;
  description: string;
  time: string;
  dealId?: string;
  icon?: React.ReactNode;
  iconBgColor?: string;
}

// For Dashboard Portfolio Composition Donut Chart
export interface PortfolioSegment {
  name: string;
  value: number;
  color: string;
}

// For Header Dropdowns
export interface NotificationItem {
  id: string;
  // FIX: Change icon type to allow className prop for React.cloneElement
  icon: React.ReactElement<{ className?: string }>;
  title: string;
  description: string;
  time: string;
  read: boolean;
  bgColorClass?: string;
}

export interface MessageItem {
  id: string;
  senderAvatarUrl: string;
  senderName: string;
  messageSnippet: string;
  time: string;
  unread: boolean;
}

// For API Explorer
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface ApiParameter {
  name: string;
  value: string;
}

export interface ApiRequestData {
  method: HttpMethod;
  path: string;
  pathParams: Record<string, string>;
  queryParams: ApiParameter[];
  headers: ApiParameter[];
  body: string | null; // JSON string
}

export interface ApiResponseData {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: unknown; // Parsed JSON or error object
  size?: number; // size in bytes
  time?: number; // time in ms
}

export type MockApiHandler = (request: ApiRequestData, mockData: { deals: Deal[], facilities: Facility[]}) => Promise<ApiResponseData>;

export interface ApiEndpointDefinition {
  id: string;
  method: HttpMethod;
  pathTemplate: string; // e.g., /api/deals/{dealId}
  description: string;
  handler: MockApiHandler;
  defaultPath?: string; // For pre-filling path input
  defaultBody?: string; // For pre-filling body for POST/PUT
}