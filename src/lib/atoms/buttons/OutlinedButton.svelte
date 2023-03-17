<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';

	export let onclick: (() => void) | undefined = undefined;
	export let disabled: boolean = false;
	export let loading: boolean = false;
	export let styleClass: string = '';
	$: buttonClass = `${styleClass} ${buttonClasses.outlined} ${loading ? 'loading' : ''}`;
</script>

<button on:click|preventDefault={onclick} class={buttonClass} {disabled}>
	<slot />
</button>
