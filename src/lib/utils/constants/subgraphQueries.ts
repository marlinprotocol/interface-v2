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
