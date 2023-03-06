<script lang="ts">
	import InfoButtonLink from '$lib/atoms/buttons/InfoButtonLink.svelte';
	import ContainerCard from '$lib/atoms/cards/ContainerCard.svelte';
	import { Tab, TabList, TabPanel, Tabs } from '$lib/atoms/tabs/tabs';
	import Text from '$lib/atoms/texts/Text.svelte';
	import MPondTopond from './MPondTopond.svelte';
	import PondToMpond from './PondToMpond.svelte';
	import ConversionHistoryButton from './sub-components/ConversionHistoryButton.svelte';
	import TabPondMpond from './sub-components/TabPondMpond.svelte';

	const styles = {
		conversionHistory: 'flex flex-col w-72 sm:w-130 mx-auto mt-8'
	};
	$: activeTabValue = '1';
	const handleClick = (tabValue: string) => () => {
		activeTabValue = tabValue;
	};
</script>

<ContainerCard>
	<Text variant="h3" text="Bridge" styleClass="text-center" />
	<Tabs divClass="mt-4">
		<TabList>
			<Tab id={'1'} on:click={handleClick('1')}>
				<TabPondMpond
					firstText="POND"
					secondText="MPond"
					variant={activeTabValue === '1' ? 'primary' : 'secondary'}
				/>
			</Tab>
			<Tab id={'2'} on:click={handleClick('2')}>
				<TabPondMpond
					firstText="MPond"
					secondText="POND"
					variant={activeTabValue === '2' ? 'primary' : 'secondary'}
				/>
			</Tab>
		</TabList>

		<TabPanel id={'1'} {activeTabValue}>
			<PondToMpond />
		</TabPanel>

		<TabPanel id={'2'} {activeTabValue}>
			<MPondTopond />
		</TabPanel>
	</Tabs>
</ContainerCard>
<div class={styles.conversionHistory}>
	<TabPanel id={'1'} {activeTabValue}>
		<a href="/bridge/pondToMpondHistory">
			<ConversionHistoryButton firstText="POND" secondText="MPond" />
		</a>
	</TabPanel>

	<TabPanel id={'2'} {activeTabValue}>
		<a href="/bridge/mPondtoPondHistory">
			<ConversionHistoryButton firstText="MPond" secondText="POND" />
		</a>
	</TabPanel>
	<InfoButtonLink href="https://docs.marlin.org/docs/User%20Guides/Oyster/" text="Documentation" />
</div>
