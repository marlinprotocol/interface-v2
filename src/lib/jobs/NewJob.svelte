<script lang="ts">
	import {
		provider,
		address,
		allFetches,
		arbNativeBalance,
		pondBalance,
		arbMPondBalance,
		pondAllowance,
		arbMPondAllowance,
		networkId
	} from '../stores/provider.js';
	import { requiredValidator, addressValidator, amountValidator, hashValidator } from '../textbox/validators.js';
	import { bnToText, textToBN } from './bnformat.js';
	import { pondContract, marketContract } from './contracts.js';
	import { constants } from './constants';

	import { BigNumber as BN, providers } from 'ethers';
	import Textbox from '../textbox/Textbox.svelte';

	$: infraProvider = undefined;
	$: tokenAmount = undefined;
	$: url = undefined;

	let infraProviderErr = true;
	let tokenAmountErr = true;
	let urlErr = true;

	$: err = infraProviderErr || tokenAmountErr || urlErr;

	function tokenBalanceValidator(v: BN) {
		console.log('bv:', v, $pondBalance);
		if (v === undefined) return undefined;
		if (v.gt($pondBalance)) return 'Not enough balance';
		return undefined;
	}

	function arbNativeBalanceValidator(v: BN) {
		console.log('bv:', v, $arbNativeBalance);
		if (v === undefined) return undefined;
		if (v.gt($arbNativeBalance)) return 'Not enough balance';
		return undefined;
	}

	$: approved = false;
	$: {
		if (!tokenAmountErr && tokenAmount && tokenAmount != '' && $pondAllowance) {
			let v = tokenAmount;
			approved = BN.from(v).lte($pondAllowance);
			console.log('approved:', approved);
		} else {
			console.log(tokenAmountErr, tokenAmount);
			approved = false;
		}
	}

	$: console.log(infraProvider, tokenAmount, $pondAllowance, err, infraProviderErr, tokenAmountErr, urlErr);

	let pond = undefined;
	let market = undefined;
	$: if ($provider) {
		pond = pondContract($provider);
		market = marketContract($provider);
	} else {
		pond = undefined;
		market = undefined;
	}

	async function approve() {
		if (!$provider) {
			alert('Please connect a wallet.');
			return;
		}

		console.log($provider.signer);

		let res = await pond.approve(
			constants.ADDRESS_MARKETV1,
			BN.from(2).pow(256).sub(1)
		);
		console.log(res);

		await res.wait(1);

		allFetches($address);
	}

	async function newJob() {
		if (!$provider) {
			alert('Please connect a wallet.');
			return;
		}

		console.log($provider.signer);

		let res = await market.jobOpen(`{"region":"ap-south-1","url":"${url}"}`, infraProvider, BN.from(10).pow(15), tokenAmount);
		console.log(res);

		await res.wait(1);

		allFetches($address);
	}

</script>

<div class="bridge my-8 mx-auto bg-white rounded-lg font-[Poppins] sm:w-[40em]">
	<div class="bridge-header flex flex-row flex-wrap justify-between p-4 sm:p-8 pb-0">
		<p class="bridge-title my-auto mr-auto ml-2 font-bold text-neutral-800 text-2xl">New Job</p>
	</div>
	<div class="bridge-body font-semibold text-neutral-800 text-lg">
		<Textbox
			title="Provider"
			type="text"
			font="font-mono"
			placeholder="0x0000000000000000000000000000000000000000"
			tooltip="Infra provider you want to deploy the enclave on."
			textValidator={addressValidator}
			bind:value={infraProvider}
			bind:isError={infraProviderErr}
		/>
		<Textbox
			title="Deposit amount"
			type="number"
			font="font-orbitron"
			tooltip="Amount of tokens to deposit against the job."
			textToValue={textToBN(18)}
			valueToText={bnToText(18)}
			textValidator={amountValidator(18)}
			valueValidator={tokenBalanceValidator}
			bind:value={tokenAmount}
			bind:isError={tokenAmountErr}
		>
			<button
				on:click={() => tokenAmount = $pondBalance}
				class="text-primary">MAX</button
			>
			<!-- <p> | Balance: {bnToText(18)(token == 'POND' ? $ethPondBalance : $ethMPondBalance)}</p> -->
		</Textbox>
		<Textbox
			title="Enclave Image URL"
			type="text"
			font="font-mono"
			placeholder="https://example.com/path/to/enclave.eif"
			tooltip="URL where the enclave image is hosted."
			textValidator={requiredValidator}
			bind:value={url}
			bind:isError={urlErr}
		/>

		<div class="px-8 py-2 m-auto">
			<button
				class="connect-wallet-btn text-center text-white font-semibold p-4 w-full bg-primary rounded-lg"
				class:bg-gray-400={tokenAmountErr}
				class:bg-green-400={approved}
				disabled={tokenAmountErr || approved}
				on:click={approve}
				>APPROVE{#if approved}D{/if}</button
			>
		</div>
		<div class="p-8 pt-2 m-auto">
			<button
				on:click={newJob}
				class="connect-wallet-btn text-center text-white font-semibold p-4 w-full bg-primary rounded-lg disabled:bg-gray-400"
				disabled={err || !approved}>CREATE JOB</button
			>
		</div>
	</div>
</div>

