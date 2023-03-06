<script lang="ts">
	import Text from '$lib/atoms/texts/Text.svelte';
	import type { NavLinkModel } from '$lib/types/headerTypes';
	export let navItem: NavLinkModel;
</script>

<a href={navItem.href} target={navItem.openInNewTab ? '_blank' : '_self'}>
	<Text variant="nav" text={navItem.title} />
</a>
