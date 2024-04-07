<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import { doNothing } from '$lib/utils/helpers/commonHelper';

	export let firstText = 'POND';
	export let secondText = 'MPond';
</script>

<Button
	variant="whiteFilled"
	onclick={() => {
		doNothing();
	}}
	size="large"
	styleClass="w-full"
>
	<div class="flex w-full justify-between">
		<div class="flex w-full justify-center gap-1">
			{firstText}
			<img src={staticImages.Arrow} alt="Copy" width="8px" />
			{secondText} conversion history
		</div>
		<img src={staticImages.RightArrow} alt="Copy" />
	</div>
</Button>
