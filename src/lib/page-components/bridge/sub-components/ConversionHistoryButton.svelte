<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';

	export let firstText: string = 'POND';
	export let secondText: string = 'MPond';
</script>

<Button variant="whiteFilled" onclick={() => {}} size={'large'} styleClass="w-full">
	<div class="flex justify-between w-full">
		<div class="w-full flex justify-center gap-1">
			{firstText}
			<img src="./images/arrowicon.svg" alt="Copy" />
			{`${secondText} Conversion History`}
		</div>
		<img src="./images/rightarrow.svg" alt="Copy" />
	</div>
</Button>
