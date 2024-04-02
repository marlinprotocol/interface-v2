<script lang="ts">
	import { staticImages } from '$lib/components/images/staticImages';
	import { page } from '$app/stores';
	import SidebarLinksGroup from '../header/sub-components/SidebarLinksGroup.svelte';

	let isNavOpen: Boolean = true;

	const toggleNavbar = () => (isNavOpen = !isNavOpen);
</script>

<div
	class={`nav-bg z-10 h-screen ${isNavOpen ? 'w-72' : 'w-28'} transition-all duration-300 ease-out`}
>
	<div class="mb-9 mt-8 flex items-center justify-center gap-2">
		{#if isNavOpen}
			<img src={staticImages.marlinLgLogo} alt="large logo" />
		{:else}
			<img src={staticImages.marlinSmLogo} alt="small logo" />
		{/if}
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
