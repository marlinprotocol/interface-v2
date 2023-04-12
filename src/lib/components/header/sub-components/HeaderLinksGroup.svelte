<script lang="ts">
	import type { NavLinkModel } from '$lib/types/headerTypes';
	import HeaderNavLinkItem from './HeaderNavLinkItem.svelte';
	export let isMobile = false;
	//nav-links list
	const navLinks: NavLinkModel[] = [
		{
			title: 'Relay',
			href: 'https://arb1.marlin.org/relay/operator',
			openInNewTab: true
		},
		{
			title: 'Bridge',
			href: '/bridge',
			openInNewTab: false
		},
		{
			title: 'Merchant',
			href: '/oyster/merchant',
			openInNewTab: false
		},
		{
			title: 'Inventory',
			href: '/oyster/inventory',
			openInNewTab: false
		},
		{
			title: 'Oyster Inventory',
			href: '/oyster/inventory',
			openInNewTab: false
		}
	];
</script>

<div class={`flex gap-10 nav-links ${isMobile ? 'flex-col' : 'flex-row'}`}>
	{#each navLinks as navItem (navItem.title)}
		<HeaderNavLinkItem {navItem} />
	{/each}
</div>

<style>
</style>
