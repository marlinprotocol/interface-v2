<script lang="ts">
	import { staticImages } from '$lib/components/images/staticImages';
	import { page } from '$app/stores';
	import SidebarLinksGroup from '../header/sub-components/SidebarLinksGroup.svelte';
	import { cn } from '$lib/utils/helpers/commonHelper';

	let isNavOpen: Boolean = true;

	const toggleNavbar = () => (isNavOpen = !isNavOpen);
</script>

<div
	class={cn(
		'nav-bg z-10 h-[100dvh] transition-all duration-300 ease-out',
		isNavOpen ? 'min-w-[18rem]' : 'min-w-[112px]'
	)}
>
	<div class="flex h-20 items-center justify-center gap-2 p-4">
		{#if isNavOpen}
			<img src={staticImages.marlinLgLogo} alt="large logo" />
		{:else}
			<img src={staticImages.marlinSmLogo} alt="small logo" />
		{/if}
	</div>
	<SidebarLinksGroup activeLink={$page.url.pathname} {isNavOpen} />
	<button
		class={cn(
			'absolute top-1/2 cursor-pointer transition-all duration-300 ease-out',
			isNavOpen ? 'left-[271px]' : 'left-[95px]'
		)}
		on:click={toggleNavbar}
	>
		<img
			src={staticImages.navButton}
			class={`${isNavOpen ? '' : 'rotate-180'} min-h-[35px] min-w-[35px]`}
			alt="nav-btn"
		/>
	</button>
</div>
