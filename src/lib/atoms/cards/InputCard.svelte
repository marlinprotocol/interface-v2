<script lang="ts">
	import type { InputCardVariant } from '$lib/types/componentTypes';
	import { cn } from '$lib/utils/helpers/commonHelper';
	import { getInputCardVariant } from '$lib/utils/helpers/componentHelper';

	export let styleClass = '';
	export let variant: InputCardVariant | undefined = 'primary';

	$: variantClass = getInputCardVariant(variant);
</script>

<div data-testid="input-card" class={cn('w-full rounded-lg', variantClass, styleClass)}>
	<slot />
</div>
