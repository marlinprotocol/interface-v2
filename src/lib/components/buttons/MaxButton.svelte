<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	export let onclick: (() => void) | undefined = undefined;
</script>

<button on:click={onclick} class={buttonClasses.maxButton}> MAX </button>
