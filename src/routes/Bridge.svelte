<script lang="ts">
	import { connected } from '$lib/stores/provider';
	// NOTE: using bignumber.js for conversion as BigNumber utils in ethers doesn't support float values
	// eg. BN.from(1).div(BN.from(10)) returns 0 instead of 0.1
	import BigNumber from 'bignumber.js';
	import ConnectModal from './ConnectModal.svelte';
	import { showConnectModal } from './provider';

	let conversion = { from: 'POND', to: 'MPond' };
	let formValue = {
		convertFrom: 0,
		convertTo: 0
	};
	let formErrors = null;

	// helper functions to convert between POND and MPond
	function CalculateMpond(amount: number, power: number) {
		// formula: (amount) / (10^power) using BigNumber syntax
		return new BigNumber(amount).div(new BigNumber(10).pow(new BigNumber(power)));
	}

	function CalculatePond(amount: number, power: number) {
		return new BigNumber(amount).multipliedBy(new BigNumber(10).pow(power));
	}

	// reset values when switching between POND->MPond and MPond->POND
	function resetInputFields() {
		formValue = {
			convertFrom: 0,
			convertTo: 0
		};
	}

	function handleMpondToPond() {
		conversion = { from: 'MPond', to: 'POND' };
		resetInputFields();
	}
	function handlePondToMpond() {
		conversion = { from: 'POND', to: 'MPond' };
		resetInputFields();
	}

	function convertToMpond(pondValue: number) {
		formValue.convertTo = parseFloat(CalculateMpond(pondValue, 6).toFixed());
	}
	function convertToPond(pondValue: number) {
		formValue.convertTo = parseFloat(CalculatePond(pondValue, 6).toFixed());
	}

	$: {
		// real time conversion happens on form value change
		if (conversion.from === 'POND') {
			convertToMpond(formValue.convertFrom);
		} else {
			convertToPond(formValue.convertFrom);
		}
	}
</script>

<main
	class="pt-[10px] min-[710px]:pt-[45px] min-[710px]:pb-[45px] pb-[80px] flex items-center justify-center"
>
	<div
		class="max-w-none mx-[5%] min-[710px]:mx-0 min-[710px]:max-w-[465px] w-full flex flex-col items-center justify-center font-[Poppins]"
	>
		<div
			class="bg-white rounded-lg w-full px-4 min-[400px]:px-8 py-5 h-[470px] flex flex-col justify-between"
		>
			<div class="flex flex-col items-center">
				<h1 class="flex justify-center font-bold text-2xl leading-normal">Bridge</h1>
				<div class="flex space-x-3 justify-center mt-4">
					<button
						on:click={handlePondToMpond}
						class="pill text-primary tracking-widest text-sm rounded-full py-2 px-5 flex items-center justify-center"
						style:background={conversion.from === 'POND' ? '#EBECF9' : '#F3F3F3'}
						style:font-weight={conversion.from === 'POND' ? '600' : '400'}
						style:color={conversion.from === 'POND' ? '#3840c7' : '#7E7E80'}
					>
						POND
						{#if conversion.from === 'POND'}
							<img class="mx-1" src="./images/arrowicon.svg" alt="arrowicon" />
						{:else}
							<img class="mx-1" src="./images/conversionarrow.svg" alt="conversion arrow" />
						{/if}
						MPond
					</button>
					<button
						on:click={handleMpondToPond}
						class="pill tracking-widest text-sm rounded-full py-2 px-5 flex items-center justify-center"
						style:background={conversion.from === 'MPond' ? '#EBECF9' : '#F3F3F3'}
						style:font-weight={conversion.from === 'MPond' ? '600' : '400'}
						style:color={conversion.from === 'MPond' ? '#3840c7' : '#7E7E80'}
					>
						MPond
						{#if conversion.from === 'MPond'}
							<img class="mx-1" src="./images/arrowicon.svg" alt="arrowicon" />
						{:else}
							<img class="mx-1" src="./images/conversionarrow.svg" alt="conversion arrow" />
						{/if}
						POND
					</button>
				</div>
			</div>

			<form>
				<div class="px-2">
					<label class="mt-[30px] mb-2 flex" for="from">From</label>
					<div class="flex justify-between items-center">
						<input
							class="font-[Orbitron] w-3/4 min-[710px]:w-10/12 outline-none border-none text-primary font-semibold text-xl placeholder:text-primary/20"
							type="number"
							id="from"
							name="from"
							placeholder="0.00"
							bind:value={formValue.convertFrom}
						/>
						<div class="font-medium text-base">{conversion.from}</div>
					</div>
					<div class="mt-5 flex items-center text-sm">
						<button class="text-[#3740c7]/70 font-semibold tracking-wider"> MAX </button>
						{#if conversion.from === 'POND'}
							<span class="text-black/60 ml-2"> | Balance: NaN </span>
						{:else}
							<span class="text-black/60 ml-2"> | Unrequested: 0 | Requested: 0 </span>
						{/if}
					</div>
				</div>
				<hr class="my-[25px]" />
				<div class="px-2">
					<label class="mt-[30px] mb-2 flex" for="to">To</label>
					<div class="read-only flex justify-between items-center">
						<input
							class="font-[Orbitron] w-3/4 min-[710px]:w-10/12 outline-none border-none text-primary font-semibold text-xl placeholder:text-primary/20"
							type="number"
							id="to"
							name="to"
							placeholder="0.00"
							bind:value={formValue.convertTo}
							readonly
						/>

						<div class="font-medium text-base">{conversion.to}</div>
					</div>
				</div>
				{#if $connected}
					<button
						class="flex items-center justify-center w-full bg-primary text-white rounded-lg h-14 mt-[30px] font-semibold"
						type="submit">PROCEED TO CONVERSION</button
					>
				{:else}
					<button
						on:click|preventDefault={() => showConnectModal.set(true)}
						class="flex items-center justify-center w-full bg-primary text-white rounded-lg h-14 mt-[30px] font-semibold"
						>Connect Wallet</button
					>
					<ConnectModal />
				{/if}
			</form>
		</div>
		<button
			class="relative bg-white rounded-lg w-full py-4 mt-[30px] flex items-center justify-center text-base text-primary font-semibold"
		>
			{conversion.from}<img class="mx-1" src="./images/arrowicon.svg" alt="arrowicon" />
			{conversion.to} conversion history
			<img class="absolute right-4 mx-1" src="./images/rightarrow.svg" alt="right arrow" />
		</button>
		<button
			class="bg-[#dee8f2] rounded-lg px-[18px] py-[9px] mt-[30px] flex text-primary font-medium text-sm"
		>
			<img class="mr-3" src="./images/openIcon.svg" alt="open icon" />
			<div>Learn more</div>
		</button>
	</div>
</main>

<style>
	.read-only input[type='number']::-webkit-inner-spin-button,
	.read-only input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	.read-only input[type='number'] {
		appearance: textfield;
		-moz-appearance: textfield;
		/* Firefox */
	}
</style>
