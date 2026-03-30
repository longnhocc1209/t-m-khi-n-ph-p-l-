export enum ToolType {
  LEGAL_DOCS = 'legal_docs',
  DOC_DECODER = 'doc_decoder',
  RESPONSE_SIM = 'response_sim',
  FINANCIAL_ROADMAP = 'financial_roadmap',
  ADVISOR_CHAT = 'advisor_chat'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  sources?: Array<{ uri: string; title: string }>;
}

export interface RoadmapData {
  month: string;
  remainingDebt: number;
  savings: number;
  note: string;
}

export interface RoadmapResponse {
  analysis: string;
  data: RoadmapData[];
}