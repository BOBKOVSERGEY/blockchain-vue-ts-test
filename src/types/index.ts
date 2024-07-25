

export interface User {
  name: string;
}

export interface Shard {
  _id: string,
  workchain: number,
  transactions: Transaction[]
}

export interface Transaction {
  _id: string,
  process: boolean,
  account: string,
  address: string
}


export interface Block {
  file_hash: string
  root_hash: string
  seqno: string
  shards: Shard[]
  timestamp: number
  workchain: number
  __v: number
  _id: string
}