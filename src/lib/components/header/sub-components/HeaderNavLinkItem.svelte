<script lang="ts">
	import Text from '$lib/atoms/texts/Text.svelte';
	import type { NavLinkModel } from '$lib/types/headerTypes';
	export let navItem: NavLinkModel;
</script>

<a
	href={navItem.href}
	target={navItem.openInNewTab ? '_blank' : ''}
	data-sveltekit-preload-data={navItem.preload ? 'hover' : 'off'}
>
	<Text variant="nav" text={navItem.title} />
</a>
