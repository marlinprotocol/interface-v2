<script lang="ts">
	import MPondTopond from '$lib/page-components/v2/bridge/MPondTopond.svelte';
	import PondToMPond from '$lib/page-components/v2/bridge/PondToMPond.svelte';
	import { TabPanel } from '$lib/atoms/v2/tabs/tabs';
	import Button from '$lib/atoms/v2/buttons/Button.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import { EXTERNAL_LINKS } from '$lib/utils/constants/v2/urls';

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
	<a href={EXTERNAL_LINKS.BRIDGE_LEARN_LINK} target="_blank">
		<Button variant="text" styleClass="mt-4 font-normal" size="tiny">
			<img src={staticImages.externalLinkIcon} alt="Learn more link" />
			Learn more
		</Button>
	</a>
</div>
