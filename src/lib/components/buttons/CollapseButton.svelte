<script lang="ts">
	import { staticImages } from '$lib/components/images/staticImages';
	import { cn } from '$lib/utils/helpers/commonHelper';

	export let disabled = false;
	export let onclick: (() => void) | undefined = undefined;
	export let isOpen = false;
	export let id = '';
</script>

<button data-testid="collapse-button" {id} on:click={onclick} {disabled} class="w-max">
	<img
		class={cn('rotate-0 transform transition duration-200', { 'rotate-180': isOpen })}
		src={staticImages.chevronDownIcon}
		alt="Collapse Icon"
	/>
</button>
