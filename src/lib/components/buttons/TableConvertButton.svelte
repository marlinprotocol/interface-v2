<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	export let onclick: (() => void) | undefined = undefined;
	export let disabled: boolean = false;
	export let loading: boolean = false;
	export let styleClass: string = '';
	export let text: string = 'CONVERT';
</script>

<button
	{disabled}
	class={`${styleClass} ${loading ? 'loading' : ''} ${buttonClasses.tableConvertButton}`}
	on:click={onclick}
>
	{text}
</button>
