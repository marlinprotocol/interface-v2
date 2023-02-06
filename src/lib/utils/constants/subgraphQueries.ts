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
 * Return balance, balance snapshots for a specific Receiver address
 * @queryVariables address: Address of the receiver in string format
 * @queryVariables epoch: Epoch cycle for which the data is required
 * @returns receiverBalanceSnapshots, receiverBalance, pondUser
 */
export const QUERY_TO_GET_RECEIVER_STAKING_DATA = `query ReceiverStakingData($address: String, $epoch:String) {
  receiverBalanceSnapshots(
    where: {
      address: $address,
      epoch: $epoch
    },
    first: 1, 
    orderBy: epoch, 
    orderDirection: desc
  ) { 
    balance
    epoch
  }
  receiverBalance(id: $address) { 
    balance
    id
  }
  pondUser(
    id: $address,
  ) {
    balance
  }
}`;

/**
 * Return start time and epoch length from subgraph API
 * @returns id EPOCH_LENGTH, START_TIME and value
 */
export const QUERY_TO_GET_EPOCH_START_TIME_AND_LENGTH_QUERY = `query Params($first: Int) {
  params(
    first: $first,
  ) {
    id
    value
  }
}`;
