<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import type { ButtonModel } from '$lib/types/componentTypes';
	import { openModal } from '$lib/utils/helpers/commonHelper';

	export let modalFor: string;
	export let disabled = false;
	export let variant: ButtonModel['variant'] = 'filled';
	export let size: ButtonModel['size'] = 'medium';
	export let styleClass = '';
	export let onClick: ButtonModel['onclick'] = undefined;

	const keydownHandler = (e: any) => {
		if (e.key === 'Enter') {
			openModal(modalFor);
		}
	};

	const labelClass = () => {
		switch (variant) {
			case 'filled':
				return buttonClasses.filled;
			case 'outlined':
				return buttonClasses.outlined;
			case 'error':
				return buttonClasses.error;
			case 'text':
				return buttonClasses.text;
			case 'info':
				return buttonClasses.lightblueFilled;
			case 'greyFilled':
				return buttonClasses.greyFilled;
			case 'whiteFilled':
				return buttonClasses.whiteFilled;
			case 'tableConvertButton':
				return buttonClasses.tableConvertButton;
			default:
				return buttonClasses.filled;
		}
	};
	const getLabelSize = () => {
		switch (size) {
			case 'tiniest':
				return '';
			case 'tiny':
				return 'h-8';
			case 'small':
				return 'h-11';
			case 'medium':
				return 'h-12';
			case 'large':
				return 'h-14 text-base font-semibold w-full';
			default:
				return 'h-12';
		}
	};

	const labelSize = getLabelSize();
	const labelStyleClass = labelClass();

	$: disabledClass = disabled ? 'pointer-events-none opacity-60' : '';
</script>

<label
	on:click={onClick}
	on:keydown={keydownHandler}
	for={modalFor}
	class={`${labelStyleClass} ${labelSize} ${styleClass} ${disabledClass}`}
>
	<slot />
</label>
