<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';

	export let firstText = 'POND';
	export let secondText = 'MPond';
</script>

<Button variant="whiteFilled" onclick={() => {}} size={'large'} styleClass="w-full">
	<div class="flex justify-between w-full">
		<div class="w-full flex justify-center gap-1">
			{firstText}
			<img src="/images/arrowicon.svg" alt="Copy" width="8px" />
			{`${secondText} conversion History`}
		</div>
		<img src="/images/rightarrow.svg" alt="Copy" />
	</div>
</Button>
