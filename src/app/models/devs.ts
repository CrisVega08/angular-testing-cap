export interface Dev {
  id: number;
  category: string;
  seqNo?: number;
  info: {
    name: string;
    longDescription?: string;
    project?: string;
    role?: string;
  };
  iconUrl?: string;
}
