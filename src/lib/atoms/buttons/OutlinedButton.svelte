<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import type { ButtonModel } from '$lib/types/componentTypes';

	export let onclick: ButtonModel['onclick'] = undefined;
	export let disabled = false;
	export let loading = false;
	export let styleClass = '';
	$: buttonClass = `${styleClass} ${buttonClasses.outlined} ${loading ? 'loading' : ''}`;
</script>

<button on:click|preventDefault={onclick} class={buttonClass} {disabled}>
	<slot />
</button>
