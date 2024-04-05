<script lang="ts">
	import type { InputCardVariant } from '$lib/types/componentTypes';
	import { getInputCardVariant } from '$lib/utils/v2/helpers/componentHelper';

	export let styleClass = '';
	export let variant: InputCardVariant | undefined = 'primary';

	$: variantClass = getInputCardVariant(variant);
</script>

<div data-testid="input-card" class="{styleClass} w-full {variantClass}">
	<slot />
</div>
