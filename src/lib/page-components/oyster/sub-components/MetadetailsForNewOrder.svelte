<script lang="ts">
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import TextInputWithEndButton from '$lib/components/inputs/TextInputWithEndButton.svelte';
	import SearchWithSelect from '$lib/components/search/SearchWithSelect.svelte';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import type {
		OysterFiltersModel,
		OysterInventoryDataModel,
		OysterMarketplaceDataModel
	} from '$lib/types/oysterComponentType';
	import { MEMORY_SUFFIX } from '$lib/utils/constants/constants';
	import { getInstanceMetadatDataForOperator } from '$lib/utils/data-modifiers/oysterModifiers';
	import { cn, doNothing } from '$lib/utils/helpers/commonHelper';
	import {
		getCreateOrderInstanceRegionFilters,
		getRateForProviderAndFilters
	} from '$lib/utils/helpers/oysterHelpers';

	export let allMarketplaceData: OysterMarketplaceDataModel[] | OysterInventoryDataModel[];
	export let merchant: any;
	export let instance: any;
	export let region: any;
	export let arch: any;
	export let instanceRate: bigint | undefined;
	export let vcpu: string;
	export let memory: string;
	export let providerAddress: string | undefined;
	export let handleChange = () => doNothing();
	export let notServiceable = false;

	let filters: Partial<OysterFiltersModel> = getCreateOrderInstanceRegionFilters(
		providerAddress,
		allMarketplaceData
	);

	const handleInstanceChange = async (value: string | number) => {
		instance.value = value as string;
		instance.isDirty = true;
		if (value === '') {
			instance.error = 'Instance is required';
		} else if (filters.instance?.indexOf(value.toString()) === -1) {
			instance.error = `${value} is not a valid Instance`;
		} else {
			instance.error = '';
			region.error = '';
		}
		instanceRate = getRateForProviderAndFilters(
			providerAddress,
			instance.value,
			region.value,
			allMarketplaceData
		);
		if (
			instance.error === '' &&
			instanceRate === undefined &&
			instance.value !== '' &&
			region.value !== ''
		) {
			notServiceable = true;
			instance.error = `${value} is not serviceable for the selected region, please select another instance`;
		} else if (instanceRate !== undefined && instance.value !== '' && region.value !== '') {
			notServiceable = false;
			instance.error = '';
			region.error = '';
		}
	};

	const handleRegionChange = async (value: string | number) => {
		region.value = value as string;
		region.isDirty = true;
		if (value === '') {
			region.error = 'Region is required';
		} else if (!filters.region?.some(([_, region]) => region === value)) {
			region.error = `${value} is not a valid Region`;
		} else {
			region.error = '';
			instance.error = '';
		}

		instanceRate = getRateForProviderAndFilters(
			providerAddress,
			instance.value,
			region.value,
			allMarketplaceData
		);

		if (
			region.error === '' &&
			instanceRate === undefined &&
			instance.value !== '' &&
			region.value !== ''
		) {
			notServiceable = true;
			region.error = `${value} is not serviceable for the selected instance, please select another region`;
		} else if (instanceRate !== undefined && instance.value !== '' && region.value !== '') {
			notServiceable = false;
			region.error = '';
			instance.error = '';
		}
	};

	const handleMerchantChange = async (value: string | number) => {
		merchant.value = value as string;
		merchant.name =
			allMarketplaceData.find((data) => data.provider.address === value)?.provider.name || '';
		merchant.isDirty = true;
		if (value === '') {
			merchant.error = 'Operator is required';
		} else if (merchantAddressList.indexOf(value.toString()) === -1) {
			merchant.error = `${value} is not a valid Operator`;
		} else {
			merchant.error = '';
		}
		providerAddress =
			value !== ''
				? allMarketplaceData.find(
						(data) => data.provider.name === value || data.provider.address === value
					)?.provider.address
				: undefined;
		instanceRate = undefined;
		instance = {
			...instance,
			error: '',
			isDirty: false,
			value: ''
		};
		region = {
			...region,
			error: '',
			isDirty: false,
			value: ''
		};
		filters = getCreateOrderInstanceRegionFilters(providerAddress, allMarketplaceData);
		handleChange();
	};

	function set_vcpu(val: string) {
		vcpu = val;
	}

	function set_memory(val: string) {
		memory = val;
	}

	function set_arch(val: string) {
		arch.value = val;
	}

	$: merchantAddressList = [
		...new Set(allMarketplaceData.map((data) => data.provider.address) ?? [])
	];
	$: validInstanceParameters = !merchant.error && !instance.error && !region.error;
	$: instanceData = validInstanceParameters
		? getInstanceMetadatDataForOperator(
				merchant.value,
				instance.value,
				region.value,
				$oysterStore.allMarketplaceData
			)
		: undefined;
	$: set_vcpu(!instance.value ? '' : (instanceData?.vcpu?.toString() ?? 'N/A'));
	$: set_arch(!instance.value ? '' : (instanceData?.arch?.toString() ?? 'N/A'));
	$: set_memory(!instance.value ? '' : (instanceData?.memory?.toString() ?? 'N/A'));
	$: instanceOrRegionError =
		(instance.isDirty && instance.error !== '') || (region.isDirty && region.error !== '');
</script>

<SearchWithSelect
	dataList={merchantAddressList}
	searchValue={merchant.value}
	setSearchValue={handleMerchantChange}
	title="Operator"
	label="Operator"
	showTitle={false}
	cardVariant="v2Input"
	placeholder="Enter operator name or address"
	disabled
/>
<ErrorTextCard
	showError={merchant.isDirty && merchant.error !== ''}
	errorMessage={merchant.error}
	styleClass="mt-0"
/>
<div class="my-4 flex gap-2">
	<div class="w-full">
		<SearchWithSelect
			dataList={filters?.instance ?? []}
			searchValue={instance.value}
			setSearchValue={handleInstanceChange}
			title="Instance"
			label="Instance"
			cardVariant="v2Input"
			showTitle={false}
			placeholder="Select instance"
			disabled
		/>
	</div>
	<div class="w-full">
		<SearchWithSelect
			dataList={filters?.region ?? []}
			searchValue={region.value}
			setSearchValue={handleRegionChange}
			title="Region"
			label="Region"
			cardVariant="v2Input"
			showTitle={false}
			placeholder="Select region"
			disabled
		/>
	</div>
</div>
<ErrorTextCard
	showError={instance.isDirty && instance.error !== ''}
	errorMessage={instance.error}
	styleClass="mt-0"
/>
<ErrorTextCard
	showError={region.isDirty && region.error !== ''}
	errorMessage={region.error}
	styleClass="mt-0"
/>
<div
	class={cn('flex gap-2', {
		'mt-4': instanceOrRegionError
	})}
>
	<div class="w-full">
		<TextInputWithEndButton
			showTitle={false}
			title="vCPU"
			bind:input={vcpu}
			placeholder="Select"
			label="vCPU"
			disabled
		/>
	</div>
	<div class="w-full">
		<TextInputWithEndButton
			showTitle={false}
			title="Architecture"
			label="Architecture"
			bind:input={arch.value}
			placeholder="Select"
			disabled
		/>
	</div>
	<div class="w-full">
		<TextInputWithEndButton
			title="Memory ({MEMORY_SUFFIX.trimStart()})"
			label="Memory ({MEMORY_SUFFIX.trimStart()})"
			bind:input={memory}
			showTitle={false}
			placeholder="Select"
			disabled
		/>
	</div>
</div>
