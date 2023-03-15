<script lang="ts">
	import type { TextModel } from '$lib/types/componentTypes';

	export let variant: TextModel['variant'] = 'body';
	export let styleClass: TextModel['styleClass'] = '';
	export let text: TextModel['text'] = '';
	export let fontWeight: TextModel['fontWeight'] | undefined = undefined;

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
			case 'nav':
				return 'text-sm';
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
			case 'nav':
				return 'font-semibold';
			default:
				return 'font-normal';
		}
	};

	const fontSize = getFontSize();
	const _fontWeight = fontWeight ? fontWeight : getDefaultFontWeight();

	$: textClass = `${fontSize} ${_fontWeight} text-left ${styleClass}`;
</script>

<div class={textClass}>{text}</div>
