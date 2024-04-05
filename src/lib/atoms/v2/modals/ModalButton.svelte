<script lang="ts">
	import type { ButtonModel } from '$lib/types/componentTypes';
	import { openModal } from '$lib/utils/helpers/commonHelper';
	import type { IconData } from 'svelte-awesome/components/Icon.svelte';
	import Icon from '$lib/atoms/icons/Icon.svelte';
	import { getButtonSize, getButtonStyles } from '$lib/utils/helpers/componentHelper';

	export let modalFor: string;
	export let disabled = false;
	export let variant: ButtonModel['variant'] = 'filled';
	export let size: ButtonModel['size'] = 'medium';
	export let styleClass = '';
	export let onClick: ButtonModel['onclick'] = undefined;
	export let icon: Record<string, IconData> | undefined = undefined;
	export let iconSrc: string | undefined = undefined;

	const keydownHandler = (e: any) => {
		if (e.key === 'Enter') {
			openModal(modalFor);
		}
	};

	const labelSize = getButtonSize(size);
	const labelStyleClass = getButtonStyles(variant);

	$: disabledClass = disabled ? 'pointer-events-none opacity-60' : '';
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<label
	tabindex="0"
	on:click={onClick}
	on:keydown={keydownHandler}
	for={modalFor}
	class="{labelStyleClass} {labelSize} {styleClass} {disabledClass} gap-1.5"
>
	{#if icon}
		<Icon data={icon} size={14} iconColorClass="icon-white" />
	{/if}
	{#if !!iconSrc}
		<img src={iconSrc} alt="Icon" width={16} />
	{/if}
	<slot />
</label>
