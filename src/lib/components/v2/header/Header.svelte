<script lang="ts">
	import { staticImages } from '$lib/components/images/staticImages';
	import { page } from '$app/stores';
	import SidebarLinksGroup from './sub-components/SidebarLinksGroup.svelte';
	import HeaderLogo from '$lib/components/v2/header/sub-components/HeaderLogo.svelte';
	import HeaderConnectWallet from '$lib/components/v2/header/sub-components/HeaderConnectWallet.svelte';

	let isNavOpen: Boolean = true;

	const toggleNavbar = () => (isNavOpen = !isNavOpen);
</script>

<div>
	<div
		class={`nav-bg fixed left-0 z-10 h-screen ${
			isNavOpen ? 'w-72' : 'w-28'
		} transition-all duration-300 ease-out`}
	>
		<div class="relative h-full w-full">
			<div class="mb-9 mt-8 flex items-center justify-center gap-2">
				<HeaderLogo />
			</div>
			<SidebarLinksGroup activeLink={$page.url.pathname} {isNavOpen} />
			<button
				class="absolute right-0 top-1/2 translate-x-1/2 translate-y-1/2 cursor-pointer"
				on:click={toggleNavbar}
			>
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
