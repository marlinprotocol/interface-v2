<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import type { ButtonModel } from '$lib/types/componentTypes';
	export let onclick: ButtonModel['onclick'] = undefined;
	export let disabled = false;
	export let loading = false;
	export let styleClass = '';
	$: buttonClass = `${styleClass} ${buttonClasses.tableConvertButton} ${loading ? 'loading' : ''} `;
</script>

<button {disabled} on:click={onclick} class={buttonClass}>
	<slot />
</button>
