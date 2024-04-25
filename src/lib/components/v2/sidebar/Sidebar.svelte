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
		'nav-bg z-10 flex h-full flex-1 flex-col transition-all duration-300 ease-out',
		$isNavOpen ? 'min-w-[18rem]' : 'min-w-[104px]'
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
			$isNavOpen ? 'left-[271px]' : 'left-[87px]'
		)}
		on:click={toggleNavbar}
	>
		<img
			src={staticImages.navButton}
			class={cn('min-h-[35px] min-w-[35px]', $isNavOpen ? '' : 'rotate-180')}
			alt="nav-btn"
		/>
	</button>
</div>
