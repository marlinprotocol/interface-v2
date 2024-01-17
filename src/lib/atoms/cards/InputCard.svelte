<script lang="ts">
	import type { InputCardVariant } from '$lib/types/componentTypes';
	import { getInputCardVariant } from '$lib/utils/helpers/componentHelper';

	export let styleClass = '';
	export let variant: InputCardVariant | undefined = 'primary';

	$: variantClass = getInputCardVariant(variant);
</script>

<div class="{styleClass} w-full rounded-lg {variantClass}">
	<slot />
</div>
