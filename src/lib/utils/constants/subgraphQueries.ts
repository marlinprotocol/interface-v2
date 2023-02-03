export const QUERY_TO_GET_POND_BALANCE_QUERY = `query PondBalance($address: String)  {
    users(where: {
      address: $address
    }) {
      balance
    }
  }`;

export const QUERY_TO_GET_MPOND_BALANCE = `query MPondBalance($id: String)  {
    balances(where: {
      id: $id
    }) {
      amount
    }
  }`;

export const QUERY_TO_GET_RECIEVER_POND_BALANCE = `query ReceiverBalances($id: String) {
    receiverBalances(where: {
      id: $id
    }) { 
      balance
      id
    }
}`;

/**
 * Return queued Data for a specific Receiver address
 * @queryVariables address: Address of the receiver in string format
 * @queryVariables epoch: Epoch cycle for which the data is required
 * @returns balance, epoch for the receiver address
 */
export const QUERY_TO_GET_RECEIVER_BALANCE_SNAPSHOT_POND = `query ReceiverBalanceSnapshots($id: String) {
  receiverBalanceSnapshots(where: {
    address: $address,
    epoch: $epoch
  }) { 
    balance
    epoch
  }
}`;

/**
 * Return queued Data for a specific Receiver address
 * @queryVariables id: Address of the receiver in string format
 * @returns balance in bigInt format
 */
export const QUERY_TO_GET_RECEIVER_STAKE_BALANCE_POND = `query ReceiverBalance($id: String) {
  receiverBalance(id: $id) { 
    balance
    id
  }
}`;
