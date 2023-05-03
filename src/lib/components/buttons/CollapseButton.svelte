<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import Icon from '$lib/atoms/icons/Icon.svelte';
	import chevronDown from 'svelte-awesome/icons/chevronDown';
	import chevronUp from 'svelte-awesome/icons/chevronUp';

	export let disabled = false;
	export let onclick: (() => void) | undefined = undefined;
	export let isOpen = false;
	export let styleClass = buttonClasses.iconLightBlue;
	export let id = '';

	$: chevronIcon = isOpen ? chevronUp : chevronDown;
</script>

<button on:click={onclick} {disabled} class={styleClass} {id}>
	<Icon data={chevronIcon} size={12} iconColorClass={disabled ? 'icon-disabled' : 'icon-primary'} />
</button>
