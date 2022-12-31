<script lang="ts">
	import { walletAddress, disconnect } from '../../stores/provider';
	import Modal from '$lib/components/Modal/Modal.svelte';
	import { showLogoutModal } from '../../components/Modal/provider';

	async function disconnectWalletHandler() {
		await disconnect();
		showLogoutModal.set(false);
	}
</script>

<Modal bind:value={$showLogoutModal} modalWidth="max-w-[610px]" persistent>
	<p slot="title" class="modal-title my-auto font-[Poppins] font-bold text-neutral-800 text-2xl">
		Your wallet
	</p>

	<div class="body mt-6 mb-[40px] font-[Poppins]">
		<div class="address-wrapper py-3.5 px-4 bg-gray-100 rounded-lg mb-5">
			<div class="flex">
				<div class="text-sm font-normal">My Address</div>
				<!-- TODO: implement tooltip and integrate here -->
				<img
					class="ml-1"
					src="./images/infoSecondary.svg"
					alt="You may optionally delegate the tokens in this stash to an operator address now or leave it for later."
				/>
			</div>
			<div class="text-xl font-semibold truncate">{$walletAddress}</div>
		</div>
		<div class="row flex">
			<!-- TODO: extract these buttons to a seperate component -->
			<button class="font-medium text-sm text-primary py-3 px-4 flex bg-gray-100 rounded-lg mr-4">
				<img src="./images/copyicon.svg" alt="copy" />
				<div class="ml-3.5">Copy Address</div>
			</button>
			<button class="font-medium text-sm text-primary py-3 px-4 flex bg-gray-100 rounded-lg">
				<img src="./images/openIcon.svg" alt="etherscan" />
				<div class="ml-3.5">View on Etherscan</div>
			</button>
		</div>
	</div>

	<button
		slot="actions"
		class="connect-wallet-btn bg-primary text-center text-white font-bold p-4 w-full text-base bg-primaryBlue rounded-lg"
		on:click|preventDefault={disconnectWalletHandler}
	>
		LOGOUT
	</button>
</Modal>
