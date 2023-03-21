<script lang="ts">
	import InfoButtonLink from '$lib/atoms/buttons/InfoButtonLink.svelte';
	import ContainerCard from '$lib/atoms/cards/ContainerCard.svelte';
	import { Tab, TabList, TabPanel, Tabs } from '$lib/atoms/tabs/tabs';
	import Text from '$lib/atoms/texts/Text.svelte';
	import MPondTopond from './MPondTopond.svelte';
	import PondToMPond from './PondToMPond.svelte';
	import ConversionHistoryButton from './sub-components/ConversionHistoryButton.svelte';
	import TabPondMPond from './sub-components/TabPondMPond.svelte';

	const styles = {
		conversionHistory: 'flex flex-col w-72 sm:w-130 mx-auto mt-8'
	};
	$: activeTabValue = 'pond';
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
		<a href="/bridge/pondToMPondHistory">
			<ConversionHistoryButton firstText="POND" secondText="MPond" />
		</a>
	</TabPanel>

	<TabPanel id={'mPond'} {activeTabValue}>
		<a href="/bridge/mPondtoPondHistory">
			<ConversionHistoryButton firstText="MPond" secondText="POND" />
		</a>
	</TabPanel>
	<InfoButtonLink href="https://docs.marlin.org/docs/User%20Guides/Oyster/" text="Learn More" />
</div>
