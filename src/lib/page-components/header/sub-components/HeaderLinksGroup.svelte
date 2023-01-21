<script lang="ts">
	import type { NavLinkModel } from '$lib/types/headerTypes';
	import HeaderNavLinkItem from './HeaderNavLinkItem.svelte';

	//nav-links list
	const navLinks: NavLinkModel[] = [
		{
			title: 'Operator',
			href: '/'
		},
		{
			title: 'Register',
			href: '/'
		},
		{
			title: 'Delegate',
			href: '/'
		}
	];
</script>

<!-- TODO: add menu drawer for mobile -->
<div class="flex gap-10 nav-links">
	{#each navLinks as navItem (navItem.title)}
		<HeaderNavLinkItem {navItem} />
	{/each}
</div>

<style>
	@media (max-width: 640px) {
		.nav-links {
			display: none;
		}
	}
</style>
