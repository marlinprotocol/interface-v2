<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import { BigNumber } from 'ethers';
	import SuccessfulConversionModal from '../modals/SuccessfulConversionModal.svelte';

	let showDialog: boolean = false;
	export let amountConverted: BigNumber = BigNumber.from(0);
	export let conversionFrom: 'pond' | 'mpond' = 'pond';
	export let loading: boolean = false;

	export let onClickHandler: () => Promise<void>;

	const handleClick = async () => {
		try {
			await onClickHandler();
			showDialog = true;
		} catch (error) {
			showDialog = false;
			console.log(error);
		}
	};
</script>

<Button size="large" variant="filled" styleClass="w-full" onclick={handleClick} {loading}>
	<slot />
</Button>
<SuccessfulConversionModal bind:showDialog {amountConverted} {conversionFrom} />
