<script lang="ts">
	import InfoButtonLink from '$lib/atoms/buttons/InfoButtonLink.svelte';
	import ContainerCard from '$lib/atoms/cards/ContainerCard.svelte';
	import { Tab, TabList, TabPanel, Tabs } from '$lib/atoms/tabs/tabs';
	import Text from '$lib/atoms/texts/Text.svelte';
	import {
		POND_HISTORY_PAGE_URL,
		MPOND_HISTORY_PAGE_URL,
		BRIDGE_LEARN_MORE_DOC_LINK
	} from '$lib/utils/constants/urls';
	import MPondTopond from '$lib/page-components/bridge/MPondTopond.svelte';
	import PondToMPond from '$lib/page-components/bridge/PondToMPond.svelte';
	import ConversionHistoryButton from '$lib/page-components/bridge/sub-components/ConversionHistoryButton.svelte';
	import TabPondMPond from '$lib/page-components/bridge/sub-components/TabPondMPond.svelte';

	let activeTabValue = 'pond';

	const styles = {
		conversionHistory: 'flex flex-col w-full sm:w-130 mx-auto mt-4'
	};

	const handleClick = (tabValue: string) => () => {
		activeTabValue = tabValue;
	};
</script>

<ContainerCard>
	<Text variant="h3" text="Bridge" styleClass="text-center" />
	<Tabs divClass="mt-4">
		<TabList>
			<Tab id={'pond'} on:click={handleClick('pond')}>
				<TabPondMPond
					firstText="POND"
					secondText="MPond"
					variant={activeTabValue === 'pond' ? 'primary' : 'secondary'}
				/>
			</Tab>
			<Tab id={'mPond'} on:click={handleClick('mPond')}>
				<TabPondMPond
					firstText="MPond"
					secondText="POND"
					variant={activeTabValue === 'mPond' ? 'primary' : 'secondary'}
				/>
			</Tab>
		</TabList>
		<TabPanel id={'pond'} {activeTabValue}>
			<PondToMPond />
		</TabPanel>

		<TabPanel id={'mPond'} {activeTabValue}>
			<MPondTopond />
		</TabPanel>
	</Tabs>
</ContainerCard>
<div class={styles.conversionHistory}>
	<TabPanel id={'pond'} {activeTabValue}>
		<a href={POND_HISTORY_PAGE_URL}>
			<ConversionHistoryButton firstText="POND" secondText="MPond" />
		</a>
	</TabPanel>

	<TabPanel id={'mPond'} {activeTabValue}>
		<a href={MPOND_HISTORY_PAGE_URL}>
			<ConversionHistoryButton firstText="MPond" secondText="POND" />
		</a>
	</TabPanel>
	<InfoButtonLink href={BRIDGE_LEARN_MORE_DOC_LINK} text="Learn More" />
</div>
