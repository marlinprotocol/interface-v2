<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	export let onclick: (() => void) | undefined = undefined;
	export let disabled = false;
	export let loading = false;
	export let styleClass = '';
	export let text = 'CONVERT';
</script>

<button
	{disabled}
	class={`${styleClass} ${loading ? 'loading' : ''} ${buttonClasses.tableConvertButton}`}
	on:click={onclick}
>
	{text}
</button>
