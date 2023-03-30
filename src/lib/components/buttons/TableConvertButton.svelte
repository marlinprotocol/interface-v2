<script lang="ts">
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	export let disabled = false;
	export let loading = false;
	export let styleClass = '';
	export let text = 'CONVERT';
	export let modalFor: string;
</script>

<ModalButton
	{disabled}
	variant="tableConvertButton"
	{modalFor}
	styleClass={`${styleClass} ${loading ? 'loading' : ''}`}
>
	{text}
</ModalButton>
