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
		}
	];
</script>

<!-- TODO: add menu drawer for mobile -->
<div class={`flex gap-10 nav-links ${isMobile ? 'flex-col' : 'flex-row'}`}>
	{#each navLinks as navItem (navItem.title)}
		<HeaderNavLinkItem {navItem} />
	{/each}
</div>

<style>
</style>
