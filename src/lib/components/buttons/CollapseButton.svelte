<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import chevronDown from 'svelte-awesome/icons/chevronDown';
	import chevronUp from 'svelte-awesome/icons/chevronUp';

	import Icon from '$lib/atoms/icons/Icon.svelte';

	export let disabled = false;
	export let onclick: (() => void) | undefined = undefined;
	export let isOpen = false;

	$: chevronIcon = isOpen ? chevronUp : chevronDown;
</script>

<button on:click={onclick} {disabled} class={`${buttonClasses.icon}`}>
	<Icon data={chevronIcon} size={20} iconColorClass={'icon-info'} />
</button>
