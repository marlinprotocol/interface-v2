<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import { addToast } from '$lib/data-stores/toastStore';
	import { MESSAGES } from '$lib/utils/constants/messages';
	import { BigNumber } from 'ethers';
	import SuccessfulConversionModal from '../modals/SuccessfulConversionModal.svelte';

	let showSuccessConversionDialog: boolean = false;
	export let amountConverted: BigNumber = BigNumber.from(0);
	export let conversionFrom: 'pond' | 'mpond' = 'pond';
	export let loading: boolean = false;

	export let onClickHandler: () => Promise<void>;

	const handleClick = async () => {
		try {
			await onClickHandler();
			showSuccessConversionDialog = true;
		} catch (error) {
			console.log(error);
			addToast({
				variant: 'error',
				message: MESSAGES.TOAST.TRANSACTION.FAILED
			});
		}
	};
</script>

<Button size="large" variant="filled" styleClass="w-full" onclick={handleClick} {loading}>
	<slot />
</Button>
<SuccessfulConversionModal bind:showSuccessConversionDialog {amountConverted} {conversionFrom} />
