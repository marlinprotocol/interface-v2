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

export const QUERY_TO_GET_RECEIVER_POND_BALANCE = `query ReceiverBalances($id: String) {
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
 * @queryVariables contractAddress: Contract address of Pond contract
 * @returns receiverBalanceSnapshots, receiverBalance, pondUser, params
 */
export const QUERY_TO_GET_RECEIVER_STAKING_DATA = `query ReceiverStakingData($address: String, $contractAddress: String) {
  receiverBalanceSnapshots(
    where: {
      address: $address,
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
    signer
  }
  pondUser(
    id: $address,
  ) {
    approvals (
      where: { to: $contractAddress, from: $address },
    ) {
      value
    }
  }
  params (
    where: { id_in: ["EPOCH_LENGTH", "START_TIME"] },
  ) {
    id
    value
  }
}`;
