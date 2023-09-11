<script lang="ts">
	import type { NavLinkModel } from '$lib/types/headerTypes';
	import HeaderNavLinkItem from '$lib/components/header/sub-components/HeaderNavLinkItem.svelte';
	import {
		BRIDGE_URL,
		OYSTER_MARKETPLACE_URL,
		OYSTER_OPERATOR_URL,
		OYSTER_OWNER_INVENTORY_URL,
		RELAY_OPERATOR_LINK,
		RELAY_RECEIVER_STAKING_URL
	} from '$lib/utils/constants/urls';

	const navLinks: NavLinkModel[] = [
		{
			title: 'Relay',
			href: RELAY_OPERATOR_LINK,
			openInNewTab: true
		},
		{
			title: 'Bridge',
			href: BRIDGE_URL,
			openInNewTab: false
		},
		{
			title: 'Marketplace',
			href: OYSTER_MARKETPLACE_URL,
			openInNewTab: false
		},
		{
			title: 'Operator',
			href: OYSTER_OPERATOR_URL,
			openInNewTab: false
		},
		{
			title: 'Inventory',
			href: OYSTER_OWNER_INVENTORY_URL,
			openInNewTab: false
		},
		{
			title: 'Receiver Portal',
			href: RELAY_RECEIVER_STAKING_URL,
			openInNewTab: false
		}
	];
</script>

<div class={`flex gap-5 md:gap-10 nav-links flex-wrap flex-row`}>
	{#each navLinks as navItem (navItem.title)}
		<HeaderNavLinkItem {navItem} />
	{/each}
</div>
