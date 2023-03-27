<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	export let disabled = false;
	export let loading = false;
	export let styleClass = '';
	export let text = 'CONVERT';
	export let modalFor: string;
</script>

<!-- TODO: add disabled state for label -->
<label
	for={modalFor}
	class={`${styleClass} ${loading ? 'loading' : ''} ${buttonClasses.tableConvertButton}`}
	on:click={onclick}
>
	{text}
</label>
