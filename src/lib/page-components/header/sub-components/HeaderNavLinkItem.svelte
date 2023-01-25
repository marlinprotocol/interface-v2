<script lang="ts">
	import Text from '$lib/components/texts/Text.svelte';
	import type { NavLinkModel } from '$lib/types/headerTypes';
	export let navItem: NavLinkModel;
</script>

<a href={navItem.href}>
	<Text variant="h6" styleClass="font-bold" text={navItem.title} />
</a>
