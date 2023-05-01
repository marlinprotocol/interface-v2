<script lang="ts">
	import type { NavLinkModel } from '$lib/types/headerTypes';
	import HeaderNavLinkItem from './HeaderNavLinkItem.svelte';
	export let isMobile = false;
	//nav-links list
	const navLinks: NavLinkModel[] = [
		{
			title: 'Marketplace',
			href: '/oyster/marketplace',
			openInNewTab: false
		},
		{
			title: 'Operator',
			href: '/oyster/operator',
			openInNewTab: false
		},
		{
			title: 'Inventory',
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
