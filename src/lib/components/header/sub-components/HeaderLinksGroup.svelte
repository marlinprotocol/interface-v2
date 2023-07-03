<script lang="ts">
	import type { NavLinkModel } from '$lib/types/headerTypes';
	import HeaderNavLinkItem from './HeaderNavLinkItem.svelte';
	//nav-links list
	const navLinks: NavLinkModel[] = [
		// {
		// 	title: 'Relay',
		// 	href: 'https://arb1.marlin.org/relay/operator',
		// 	openInNewTab: true
		// },
		// {
		// 	title: 'Bridge',
		// 	href: '/bridge',
		// 	openInNewTab: false
		// },
		{
			title: 'Marketplace',
			href: '/oyster/marketplace',
			openInNewTab: false,
			preload: true
		},
		{
			title: 'Operator',
			href: '/oyster/operator',
			openInNewTab: false,
			preload: true
		},
		{
			title: 'Inventory',
			href: '/oyster/inventory',
			openInNewTab: false,
			preload: false
		}
	];
</script>

<div class={`flex gap-5 md:gap-10 nav-links flex-wrap flex-row`}>
	{#each navLinks as navItem (navItem.title)}
		<HeaderNavLinkItem {navItem} />
	{/each}
</div>

<style>
</style>
