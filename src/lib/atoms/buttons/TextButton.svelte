<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	export let onclick: () => void;
	export let disabled: boolean = false;
	export let loading: boolean = false;
	export let styleClass: string = '';
	$: buttonClass = `${buttonClasses.text}  ${loading ? 'loading' : ''} ${styleClass}`;
</script>

<button {disabled} on:click|preventDefault|self={onclick} class={buttonClass}>
	<slot />
</button>
