export interface User {
  name: string;
}
export interface Block {
  file_hash: string
  root_hash: string
  seqno: string
  shards: []
  timestamp: string
  workchain: number
  __v: number
  _id: string
}