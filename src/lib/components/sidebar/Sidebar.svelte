<script lang="ts">
	import { staticImages } from '$lib/components/images/staticImages';
	import { page } from '$app/stores';
	import SidebarLinksGroup from '../header/sub-components/SidebarLinksGroup.svelte';
	import { cn } from '$lib/utils/helpers/commonHelper';
	import { isNavOpen } from '$lib/data-stores/navStore';
	import { ROUTES } from '$lib/utils/constants/urls';

	const toggleNavbar = () => isNavOpen.set(!$isNavOpen);
</script>

<div
	class={cn(
		'z-10 flex h-full flex-1 flex-col bg-base-100 transition-all duration-300 ease-out',
		$isNavOpen ? 'min-w-[18rem]' : 'min-w-[104px]'
	)}
>
	<div
		class={cn('flex h-20 items-center gap-2 py-4 transition-all', {
			'px-[38px]': $isNavOpen,
			'px-[30px]': !$isNavOpen
		})}
	>
		{#if $isNavOpen}
			<a href={ROUTES.HUB_DASHBOARD_URL}><img src={staticImages.marlinLgLogo} alt="large logo" /></a
			>
		{:else}
			<a href={ROUTES.HUB_DASHBOARD_URL}>
				<img src={staticImages.marlinSmLogo} alt="small logo" />
			</a>
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
			class={cn('icon-invert min-h-[35px] min-w-[35px]', $isNavOpen ? '' : 'rotate-180')}
			alt="nav-btn"
		/>
	</button>
</div>
