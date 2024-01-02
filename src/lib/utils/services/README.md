# Overview guide for `services`

## 🕹️ What are services?

Now services can mean a lot of things in a lot of places, but in our project's context, we define a service as a way to make contract calls and update the local state of the app simultaneously. This ensures that the local state of the app that interacts with the contract is always in sync with the contract state.

## 🤔 How to write a service?

By our current definition, a service should contain two parts,

- A function that makes the contract call
- A function that updates the local state of the app

Let us take an example, we want to implement a functionality which lets the user confirm if they want to stop their running job in oyster.
Going by our definition, we will need two functions, one that makes the contract call to stop the job

```ts
// this function would be in $lib/controllers/contract/oyster.ts
export async function stopOysterJob(id: string) {
	// contract call to stop the job and return the transaction
	return txn;
}
```

and one that updates the local state of the app.

```ts
// this function would be in $lib/data-stores/oysterStore.ts
export async function stopJobInOysterStore(
	id: string,
	txn: Transaction,
	jobData: OysterInventoryDataModel
) {
	// update the local state of the app
}
```

Now, putting both of these functions together in a service, we get:

```ts
// this function would be in $lib/utils/services/oyster.ts
export async function handleConfirmJobStop(jobData: OysterInventoryDataModel) {
	const { id } = jobData;
	try {
		// put everything in a try catch block for better error handling
		const txn = await stopOysterJob(id); // make the contract call
		stopJobInOysterStore(id, txn, jobData); // update the local state of the app
	} catch (e) {
		console.log('e :>> ', e);
		return jobData;
	}
}
```

## 📋 TODO for services

There are a couple of things that we can improve in the way services are written and consumed in the app.

- [ ] refactoring other contract calls to use services instead of being called directly from components
- [ ] restricting the use of individual contract calls in components and only allowing them to be made through services
- [ ] create middleware/generic error handling for services
