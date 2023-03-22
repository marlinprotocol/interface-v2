<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	export let onclick: (() => void) | undefined = undefined;
	export let disabled = false;
	export let loading = false;
	export let styleClass = '';
	$: buttonClass = `${buttonClasses.whiteFilled} ${loading ? 'loading' : ''} ${styleClass}`;
</script>

<button {disabled} on:click={onclick} class={buttonClass}>
	<slot />
</button>
