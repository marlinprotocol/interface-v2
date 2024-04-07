<script lang="ts">
	import MPondTopond from '$lib/page-components/v2/bridge/MPondTopond.svelte';
	import PondToMPond from '$lib/page-components/v2/bridge/PondToMPond.svelte';
	import { TabPanel } from '$lib/atoms/v2/tabs/tabs';

	let activeTabValue = 'pond';
</script>

<div class="mx-auto flex h-full w-[526px] flex-col items-center justify-center">
	{#if activeTabValue === 'pond'}
		<TabPanel id="pond" {activeTabValue}>
			<PondToMPond bind:activeTabValue />
		</TabPanel>
	{:else if activeTabValue === 'mPond'}
		<TabPanel id="mPond" {activeTabValue}>
			<MPondTopond bind:activeTabValue />
		</TabPanel>
	{/if}
</div>
