<script lang="ts">
	export let activeTabValue: string;
	export let id: string;
</script>

{#if activeTabValue === id}
	<div
		class="w-full"
		id="{id}-tabitem"
		role="tabpanel"
		aria-labelledby="{id}-tab"
		data-testid="tab-panel"
	>
		<slot />
	</div>
{/if}
