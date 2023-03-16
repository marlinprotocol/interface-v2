<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';

	export let onclick = () => {};
	export let styleClass: string = '';
	$: buttonClass = `${buttonClasses.error} ${styleClass}`;
</script>

<button on:click={onclick} class={buttonClass}>
	<slot />
</button>
