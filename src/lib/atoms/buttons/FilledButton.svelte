<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	export let onclick: (() => void) | undefined = undefined;
	export let disabled = false;
	export let loading = false;
	export let styleClass = '';
	$: buttonClass = `${styleClass} ${buttonClasses.filled} ${loading ? 'loading' : ''} `;
</script>

<button {disabled} on:click={onclick} class={buttonClass}>
	<slot />
</button>
