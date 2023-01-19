<script lang="ts">
	import type { NavLinkModel } from '$lib/types/headerTypes';
	export let navItem: NavLinkModel;

	const navStyle = 'font-sm font-medium';
</script>

<a href={navItem.href}><h5 class={navStyle}>{navItem.title}</h5></a>
