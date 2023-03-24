<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import type { ButtonModel } from '$lib/types/componentTypes';

	export let onclick: ButtonModel['onclick'] = undefined;
	export let styleClass = '';
	$: buttonClass = `${buttonClasses.error} ${styleClass}`;
</script>

<button on:click={onclick} class={buttonClass}>
	<slot />
</button>
