<script lang="ts">
	import { staticImages } from '$lib/components/images/staticImages';
	import { page } from '$app/stores';
	import SidebarLinksGroup from '../header/sub-components/SidebarLinksGroup.svelte';
	import { cn } from '$lib/utils/helpers/commonHelper';
	import { isNavOpen } from '$lib/data-stores/v2/navStore';

	const toggleNavbar = () => isNavOpen.set(!$isNavOpen);
</script>

<div
	class={cn(
		'nav-bg fixed top-0 z-10 flex h-[100dvh] flex-1 flex-col transition-all duration-300 ease-out',
		$isNavOpen ? 'min-w-[18rem]' : 'min-w-[112px]'
	)}
>
	<div class="flex h-20 items-center justify-center gap-2 p-4">
		{#if $isNavOpen}
			<img src={staticImages.marlinLgLogo} alt="large logo" />
		{:else}
			<img src={staticImages.marlinSmLogo} alt="small logo" />
		{/if}
	</div>
	<SidebarLinksGroup activeLink={$page.url.pathname} />
	<button
		class={cn(
			'fixed top-1/2 cursor-pointer transition-all duration-300 ease-out',
			$isNavOpen ? 'left-[271px]' : 'left-[95px]'
		)}
		on:click={toggleNavbar}
	>
		<img
			src={staticImages.navButton}
			class={`${$isNavOpen ? '' : 'rotate-180'} min-h-[35px] min-w-[35px]`}
			alt="nav-btn"
		/>
	</button>
</div>
