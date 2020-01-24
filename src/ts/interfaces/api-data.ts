export default interface ItemData {
  id: number;
  deleted?: boolean;
  type: string;
  by?: string;
  time: number;
  text?: string;
  dead?: boolean;
  parent?: number;
  poll?: number;
  kids?: number[];
  url?: string;
  score?: number;
  title?: string;
  parts?: number[];
  descedants?: number[];
}

export interface UserData {
  about: string;
  created: number;
  delay: number;
  id: string;
  karma: number;
  submitted: number[];
}
