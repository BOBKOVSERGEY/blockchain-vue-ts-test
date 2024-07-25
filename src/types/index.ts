

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
  processed: boolean,
  out_messages: [],
  account: string,
  hash: string,
  lt: string,
  address: string,
  utime: number,
  data: string,
  fee: number,
  storage_fee: number,
  other_fee: number,
  out_msgs: [],
  __v: number
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