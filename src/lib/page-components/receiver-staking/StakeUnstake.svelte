<script lang="ts">
	import ContainerCard from '$lib/components/cards/ContainerCard.svelte';
	import TabsGroup from '$lib/components/tab/TabsGroup.svelte';
	import type { TabModel } from '$lib/types/atomTypes';

	//tabs list
	const tabs: TabModel[] = [
		{
			id: 'stake',
			name: 'Stake'
		},
		{
			id: 'unstake',
			name: 'Un-stake'
		}
	];
	//intial tab selected
	let tabIdSelected: string = 'stake';

	//update tabIdSelected
	function handleTabSwitch(tabId: string) {
		console.log('handleTabSwitch tabId :>>', tabId);
		tabIdSelected = tabId;
	}

	$: tabSelected = tabs.find((a) => a.id === tabIdSelected);
</script>

<ContainerCard>
	<TabsGroup {tabs} {tabIdSelected} {handleTabSwitch} />
	{#if !!tabSelected}
		<h1>{tabSelected.name} Tab Selected</h1>
	{/if}
</ContainerCard>
