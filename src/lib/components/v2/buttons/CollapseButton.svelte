<script lang="ts">
	import { buttonClasses } from '$lib/atoms/v2/componentClasses';
	import Icon from '$lib/atoms/icons/Icon.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import chevronDown from 'svelte-awesome/icons/chevronDown';
	import chevronUp from 'svelte-awesome/icons/chevronUp';

	export let disabled = false;
	export let onclick: (() => void) | undefined = undefined;
	export let isOpen = false;
	export let styleClass = '';
	export let id = '';

	$: chevronIcon = isOpen ? chevronUp : chevronDown;
</script>

<!-- class="{styleClass} {buttonClasses.iconLightBlue}" -->
<button data-testid="collapse-button" {id} on:click={onclick} {disabled}>
	<img
		class="{isOpen ? 'rotate-180' : 'rotate-0'} transform transition duration-200"
		src={staticImages.chevronDownIcon}
		alt="Collapse Icon"
	/>
	<!-- <Icon data={chevronIcon} size={12} iconColorClass={disabled ? 'icon-disabled' : 'icon-primary'} /> -->
</button>
