<script lang="ts">
	import type { TextModel } from '$lib/types/componentTypes';

	export let variant: TextModel['variant'] = 'body';
	export let styleClass: TextModel['styleClass'] = '';
	export let text: TextModel['text'] = '';

	const getFontSize = () => {
		switch (variant) {
			case 'h1':
				return 'text-4xl';
			case 'h2':
				return 'text-3xl';
			case 'h3':
				return 'text-2xl';
			case 'h4':
				return 'text-xl';
			case 'h5':
				return 'text-lg';
			case 'h6':
			case 'body':
				return 'text-base';
			case 'small':
				return 'text-sm';
			case 'tiny':
				return 'text-xs';
			default:
				return 'text-base';
		}
	};

	const getDefaultFontWeight = () => {
		switch (variant) {
			case 'h1':
			case 'h2':
			case 'h3':
			case 'h4':
			case 'h5':
				return 'font-bold';
			case 'h6':
				return 'font-semibold';
			case 'body':
			case 'small':
			case 'tiny':
				return 'font-normal';
			default:
				return 'text-normal';
		}
	};

	const fontSize = getFontSize();
	const fontWeight = getDefaultFontWeight();

	$: textClass = `${fontSize} ${fontWeight} text-left ${styleClass}`;
</script>

<div class={textClass}>{text}</div>
