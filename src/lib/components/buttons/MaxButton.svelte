<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';

	export let disabled = false;
	export let onclick: (() => void) | undefined = undefined;
</script>

<button on:click={onclick} {disabled} class={buttonClasses.maxButton}> MAX </button>
