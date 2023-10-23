<script lang="ts">
	import Tab from '$lib/atoms/tab/Tab.svelte';
	import type { TabModel } from '$lib/types/componentTypes';

	export let tabs: TabModel[];
	export let tabIdSelected = '';
	export let handleTabSwitch: (tabId: string) => void;
</script>

<div class="tabs-boxed tabs justify-center gap-2 bg-white">
	{#if tabs?.length}
		{#each tabs as tab (tab.id)}
			<Tab onclick={() => handleTabSwitch(tab.id)} isActive={tabIdSelected === tab.id}>
				{tab.title}
			</Tab>
		{/each}
	{/if}
</div>
