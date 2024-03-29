<script lang="ts">
	import { page } from '$app/stores';
	import HeaderConnectWallet from '$lib/components/headerv2/sub-components/HeaderConnectWallet.svelte';
	import HeaderLinksGroup from '$lib/components/headerv2/sub-components/HeaderLinksGroup.svelte';
	import HeaderLogo from '$lib/components/headerv2/sub-components/HeaderLogo.svelte';
	import { staticImages } from '$lib/components/images/staticImages';

	let isNavOpen: Boolean = true;

	const toggleNavbar = () => {
		isNavOpen = !isNavOpen;
	};
</script>

<div>
	<div
		class={`nav-bg fixed left-0 z-10 h-screen ${
			isNavOpen ? 'w-72' : 'w-28'
		} transition-all duration-300 ease-out`}
	>
		<div class="relative h-full w-full">
			<button
				class="absolute right-0 top-1/2 translate-x-1/2 translate-y-1/2 cursor-pointer"
				on:click={toggleNavbar}
			>
				<!--  -->
				<img
					src={staticImages.navButton}
					class={`${isNavOpen ? '' : 'rotate-180'} transition-all duration-300 ease-out`}
					alt="nav-btn"
				/>
			</button>
		</div>
	</div>
	<div class="nav-bg top-0 flex h-20 w-full items-center justify-end">
		<div class="pr-4">
			<HeaderConnectWallet />
		</div>
	</div>
</div>
