<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import ContainerCard from '$lib/atoms/cards/ContainerCard.svelte';
	import { dividerClasses, tableCellClasses } from '$lib/atoms/componentClasses';
	import Icon from '$lib/atoms/icons/Icon.svelte';
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import Table from '$lib/atoms/table/Table.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import InputCardWithEndButton from '$lib/components/inputs/InputCardWithEndButton.svelte';
	import TextInputWithEndButton from '$lib/components/inputs/TextInputWithEndButton.svelte';
	import { addToast } from '$lib/data-stores/toastStore';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import { kInstancesTableHeader } from '$lib/utils/constants/oysterConstants';
	import edit from 'svelte-awesome/icons/edit';
	import refresh from 'svelte-awesome/icons/refresh';

	let displayAddress = '';
	const styles = {
		docButton: 'text-primary font-medium',
		tableCell: tableCellClasses.rowMini
	};
	const tableData = [
		{
			instanceType: 't3.small',
			region: 'US East',
			price: '0.0001'
		},
		{
			instanceType: 't3.small',
			region: 'EMEA',
			price: '0.00013'
		},
		{
			instanceType: 't3.small',
			region: 'US West',
			price: '0.00028'
		},
		{
			instanceType: 't3.small',
			region: 'EMEA',
			price: '0.00013'
		},
		{
			instanceType: 't3.small',
			region: 'US West',
			price: '0.00028'
		},
		{
			instanceType: 't3.small',
			region: 'EMEA',
			price: '0.00013'
		},
		{
			instanceType: 't3.small',
			region: 'US West',
			price: '0.00028'
		}
	];
</script>

<ContainerCard>
	<svelte:fragment slot="header">
		<Text variant="h2" text="Infrastructure Registration" styleClass="text-left" />
		<Text
			variant="body"
			text="For providers running instances"
			styleClass="text-left text-grey-700"
		/>
		<div class="flex gap-2 items-center">
			<Text variant="body" text="Quick access:" styleClass="text-left text-grey-700" />
			<Button variant="text" styleClass={styles.docButton}>Documentation</Button>
			<div class={dividerClasses.vertical} />
			<Button variant="text" styleClass={styles.docButton}>Support</Button>
		</div>
	</svelte:fragment>
	<TextInputWithEndButton
		title={'Address'}
		tooltipText={'Tooltip text here'}
		placeholder={'Enter your address here'}
		bind:input={displayAddress}
	/>
	<TextInputWithEndButton
		styleClass="mt-4"
		title={'Control Plane URL'}
		tooltipText={'Tooltip text here'}
		placeholder={'Paste URL here'}
		bind:input={displayAddress}
	>
		<svelte:fragment slot="titleEndButton">
			{#if $connected}
				<ModalButton variant="text" size="tiniest" modalFor={''}>
					<Icon data={edit} size={18} />
				</ModalButton>
			{:else}
				<button
					type="button"
					on:click={() => {
						addToast({
							message: 'Please connect your wallet.',
							variant: 'error'
						});
					}}
				>
					<Icon data={edit} size={18} />
				</button>
			{/if}
		</svelte:fragment>
	</TextInputWithEndButton>
	<InputCardWithEndButton styleClass={'mt-4'} title={'Details'}>
		<div class="w-full max-h-40 overflow-y-auto overflow-x-hidden">
			<Table tableHeading={kInstancesTableHeader} headingStyleClass={'text-xs'} iconWidth={13}>
				<tbody slot="tableBody">
					{#each tableData as row}
						<tr>
							<td class={styles.tableCell}>{row.instanceType}</td>
							<td class={styles.tableCell}>{row.region}</td>
							<td class={styles.tableCell}>{row.price}</td>
						</tr>
					{/each}
				</tbody>
			</Table>
		</div>
		<svelte:fragment slot="titleEndButton">
			{#if $connected}
				<ModalButton variant="text" size="tiniest" modalFor={''}>
					<Icon data={refresh} size={18} />
				</ModalButton>
			{:else}
				<button
					type="button"
					on:click={() => {
						addToast({
							message: 'Please connect your wallet.',
							variant: 'error'
						});
					}}
				>
					<Icon data={refresh} size={18} />
				</button>
			{/if}
		</svelte:fragment>
	</InputCardWithEndButton>
	<Button variant="filled" styleClass="mt-4 w-44">Register</Button>
</ContainerCard>
