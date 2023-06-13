<script lang="ts">
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import TextInputWithEndButton from '$lib/components/inputs/TextInputWithEndButton.svelte';
	import SearchWithSelect from '$lib/components/search/SearchWithSelect.svelte';
	import { addToast } from '$lib/data-stores/toastStore';
	import type {
		OysterFiltersModel,
		OysterMarketplaceDataModel
	} from '$lib/types/oysterComponentType';
	import { MEMORY_SUFFIX } from '$lib/utils/constants/constants';
	import { getvCpuMemoryData } from '$lib/utils/data-modifiers/oysterModifiers';
	import {
		getCreateOrderInstanceRegionFilters,
		getRateForProviderAndFilters
	} from '$lib/utils/helpers/oysterHelpers';
	import type { BigNumber } from 'ethers';

	export let allMarketplaceData: OysterMarketplaceDataModel[];
	export let merchant: any;
	export let instance: any;
	export let region: any;
	export let instanceRate: BigNumber | undefined;
	export let vcpu: string;
	export let memory: string;
	export let providerAddress: string | undefined;
	export let handleChange = () => {};
	export let notServiceable = false;

	let filters: Partial<OysterFiltersModel> = getCreateOrderInstanceRegionFilters(
		providerAddress,
		allMarketplaceData
	);

	$: merchantList = [
		...new Set(
			allMarketplaceData.map((data) =>
				data.provider.name && data.provider.name !== '' ? data.provider.name : data.provider.address
			) ?? []
		)
	];

	const handleInstanceChange = async (value: string | number) => {
		instance.value = value as string;
		instance.isDirty = true;
		if (value == '') {
			instance.error = 'Instance is required';
		} else if (filters.instance?.indexOf(value.toString()) == -1) {
			instance.error = `${value} is not a valid Instance`;
		} else {
			instance.error = '';
		}
		instanceRate = getRateForProviderAndFilters(
			providerAddress,
			instance.value,
			region.value,
			allMarketplaceData
		);
		if (instanceRate == undefined && region.value != '') {
			notServiceable = true;
			addToast({
				message: `${value} is not serviceable for the selected region, please select another instance`,
				variant: 'error'
			});
		} else {
			notServiceable = false;
		}
	};

	const handleRegionChange = async (value: string | number) => {
		region.value = value as string;
		region.isDirty = true;
		if (value == '') {
			region.error = 'Region is required';
		} else if (!filters.region?.some(([_, region]) => region === value)) {
			region.error = `${value} is not a valid Region`;
		} else {
			region.error = '';
		}
		instanceRate = getRateForProviderAndFilters(
			providerAddress,
			instance.value,
			region.value,
			allMarketplaceData
		);
		if (instanceRate == undefined && instance.value != '') {
			notServiceable = true;
			addToast({
				message: `${value} is not serviceable for the selected instance, please select another region`,
				variant: 'error'
			});
		} else {
			notServiceable = false;
		}
	};

	const handleMerchantChange = async (value: string | number) => {
		merchant.value = value as string;
		merchant.isDirty = true;
		if (value == '') {
			merchant.error = 'Operator is required';
		} else if (merchantList.indexOf(value.toString()) == -1) {
			merchant.error = `${value} is not a valid Operator`;
		} else {
			merchant.error = '';
		}
		providerAddress =
			value != ''
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

	$: instanceData = getvCpuMemoryData(instance.value);
	$: set_vcpu(!instance.value ? '' : instanceData.vcpu?.toString() ?? 'N/A');
	$: set_memory(!instance.value ? '' : instanceData.memory?.toString() ?? 'N/A');
</script>

<SearchWithSelect
	dataList={merchantList}
	searchValue={merchant.value}
	setSearchValue={handleMerchantChange}
	title={'Operator'}
	placeholder={'Enter operator name or address'}
	selectId={'create-order-operator-select'}
/>
<ErrorTextCard
	showError={merchant.isDirty && merchant.error != ''}
	errorMessage={merchant.error}
	styleClass={'mt-0'}
/>
<div class="flex gap-2">
	<div class="w-full">
		<SearchWithSelect
			dataList={filters?.instance ?? []}
			searchValue={instance.value}
			setSearchValue={handleInstanceChange}
			title={'Instance'}
			placeholder={'Select instance'}
			disabled={!merchant.value}
			selectId={'create-order-instance-select'}
		/>
	</div>
	<div class="w-full">
		<SearchWithSelect
			dataList={filters?.region ?? []}
			searchValue={region.value}
			setSearchValue={handleRegionChange}
			title={'Region'}
			placeholder={'Select region'}
			disabled={!merchant.value}
			selectId={'create-order-region-select'}
		/>
	</div>
</div>
<ErrorTextCard
	showError={instance.isDirty && instance.error != ''}
	errorMessage={instance.error}
	styleClass={'mt-0'}
/>
<ErrorTextCard
	showError={region.isDirty && region.error != ''}
	errorMessage={region.error}
	styleClass={'mt-0'}
/>
<div class="flex gap-2">
	<div class="w-full">
		<TextInputWithEndButton title={'vCPU'} bind:input={vcpu} placeholder={'Select'} />
	</div>
	<div class="w-full">
		<TextInputWithEndButton
			title={`Memory (${MEMORY_SUFFIX.trimStart()})`}
			bind:input={memory}
			placeholder={'Select'}
		/>
	</div>
</div>
