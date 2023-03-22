<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';

	export let onclick: () => void;
	export let styleClass = '';
	$: buttonClass = `${buttonClasses.error} ${styleClass}`;
</script>

<button on:click={onclick} class={buttonClass}>
	<slot />
</button>
