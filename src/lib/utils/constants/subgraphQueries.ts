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

/**
 * Returns if a signer is present in receiver balances, if this is empty then the signer is not present
 * @queryVariables signer: Address of the signer in string format
 * @returns signer in receiver balances
 */
export const QUERY_TO_CHECK_IF_SIGNER_EXISTS = `query SignerExists($signer: String) {
  receiverBalances(
    where: {
      signer: $signer
    }
  ) {
    signer
  }
}`;

export const QUERY_TO_GET_POND_AND_MPOND_BRIDGE_ALLOWANCES = `query PondMpondAllowance($address: String, $contractAddress: String) {
  pondApprovals(
    where: { to: $contractAddress, from: $address }
  ) {
    value
  }   
  mpondApprovals(
    where: { to: $contractAddress, from: $address },
  ) {   
    value
  }
}`;

export const QUERY_TO_GET_BRIDGE_HISTORY_DATA = `query BridgeHistoryData($address: String) {
  users(
    where: { address: $address  }
  ) {
    totalMpondPlacedInRequest
    totalMpondConverted
    totalPondConverted
    requests {	
      timestamp
      transactionHash
      mpondAmount
      id
      requestEpoch
      releaseTime
      mpondConverted
      isCancelled
      cancelHash
    }
    mpondToPondConversions {
      id
      mpondToConvert
      transactionHash
    }
  }
  states {
    liquidityStartTime
    epochLength
    pondPerMpond
    liquidityBP
    liqudityReleaseEpochs
  }
}`;
