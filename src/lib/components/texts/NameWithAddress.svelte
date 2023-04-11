<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import Text from '$lib/atoms/texts/Text.svelte';
	import { addToast } from '$lib/data-stores/toastStore';
	import { shortenText } from '$lib/utils/conversion';
	import { copyTextToClipboard } from '$lib/utils/helpers/commonHelper';
	import { staticImages } from '../images/staticImages';

	export let name: string = '';
	export let address: string = '';

	const onCopyAddress = () => {
		copyTextToClipboard(address);
		addToast({
			message: `Address copied to clipboard`,
			variant: 'success'
		});
	};
</script>

<div class="flex gap-4 items-center">
	<div class="w-8 h-8 bg-primary rounded" />
	<div>
		<Text variant="body" fontWeight="font-medium" text={name} />
		<div class="flex gap-1">
			<Text variant="tiny" styleClass="text-grey" text={shortenText(address, 6, 3)} />
			<div on:keypress={onCopyAddress} on:click={onCopyAddress} class="cursor-pointer">
				<img src={staticImages.CopyGrey} alt="Copy" width="12px" />
			</div>
		</div>
	</div>
</div>
