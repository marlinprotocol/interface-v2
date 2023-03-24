<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import type { ButtonModel } from '$lib/types/componentTypes';
	export let onclick: ButtonModel['onclick'] = undefined;
	export let disabled = false;
	export let loading = false;
	export let styleClass = '';
	$: buttonClass = `${buttonClasses.lightblueFilled}  ${loading ? 'loading' : ''} ${styleClass}`;
</script>

<button {disabled} on:click={onclick} class={buttonClass}>
	<slot />
</button>
