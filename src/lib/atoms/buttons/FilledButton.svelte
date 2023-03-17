<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	export let onclick: (() => void) | undefined = undefined;
	export let disabled: boolean = false;
	export let loading: boolean = false;
	export let styleClass: string = '';
	$: buttonClass = `${styleClass} ${buttonClasses.filled} ${loading ? 'loading' : ''} `;
</script>

<button {disabled} on:click={onclick} class={buttonClass}>
	<slot />
</button>
