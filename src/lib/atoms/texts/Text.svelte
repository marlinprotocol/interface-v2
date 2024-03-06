<script lang="ts">
	import type { TextModel } from '$lib/types/componentTypes';
	import { getDefaultFontWeight, getFontSize } from '$lib/utils/helpers/componentHelper';

	export let variant: TextModel['variant'] = 'body';
	export let styleClass: TextModel['styleClass'] = '';
	export let text: TextModel['text'] = '';
	export let fontWeight: TextModel['fontWeight'] | undefined = undefined;

	const fontSize = getFontSize(variant);
	// bug-fix: earlier fontWeight was passed in getDefaultFontWeight which gave the default value of switch case in every case now it will change because the function will actually give the returned value from switch case.
	const _fontWeight = fontWeight ? fontWeight : getDefaultFontWeight(variant);

	$: textClass = `${styleClass} ${fontSize} ${_fontWeight}`;
</script>

<div class={textClass} data-testid="text">{text}</div>
