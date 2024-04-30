<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import { cn } from '$lib/utils/helpers/commonHelper';

	export let disabled = false;
	export let onclick: (() => void) | undefined = undefined;
	export let styleClass: string = '';
</script>

<button on:click={onclick} {disabled} class={cn(buttonClasses.maxButton, styleClass)}> MAX </button>
