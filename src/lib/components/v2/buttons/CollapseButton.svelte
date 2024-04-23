<script lang="ts">
	import { buttonClasses } from '$lib/atoms/v2/componentClasses';
	import Icon from '$lib/atoms/icons/Icon.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import chevronDown from 'svelte-awesome/icons/chevronDown';
	import chevronUp from 'svelte-awesome/icons/chevronUp';
	import { cn } from '$lib/utils/helpers/commonHelper';

	export let disabled = false;
	export let onclick: (() => void) | undefined = undefined;
	export let isOpen = false;
	export let styleClass = '';
	export let id = '';

	$: chevronIcon = isOpen ? chevronUp : chevronDown;
</script>

<!-- class="{styleClass} {buttonClasses.iconLightBlue}" -->
<button data-testid="collapse-button" {id} on:click={onclick} {disabled} class="w-max">
	<img
		class={cn('rotate-0 transform transition duration-200', { 'rotate-180': isOpen })}
		src={staticImages.chevronDownIcon}
		alt="Collapse Icon"
	/>
	<!-- <Icon data={chevronIcon} size={12} iconColorClass={disabled ? 'icon-disabled' : 'icon-primary'} /> -->
</button>
