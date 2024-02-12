<script lang="ts">
	import type { TextModel } from '$lib/types/componentTypes';
	import { getDefaultFontWeight, getFontSize } from '$lib/utils/helpers/componentHelper';

	export let variant: TextModel['variant'] = 'body';
	export let styleClass: TextModel['styleClass'] = '';
	export let text: TextModel['text'] = '';
	export let fontWeight: TextModel['fontWeight'] | undefined = undefined;

	const fontSize = getFontSize(variant);
	const _fontWeight = fontWeight ? fontWeight : getDefaultFontWeight(fontWeight);

	$: textClass = `${styleClass} ${fontSize} ${_fontWeight}`;
</script>

<div class={textClass}>{text}</div>
