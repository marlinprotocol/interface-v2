<script lang="ts">
	import type { AppVariant } from '$lib/types/componentTypes';
	import { getChipVariant } from '$lib/utils/helpers/componentHelper';

	export let variant: AppVariant = 'primary';
	export let styles = '';

	$: variantClass = getChipVariant(variant);
</script>

<div
	class="flex items-center gap-1.5 rounded-3xl px-[20px] py-[9px] text-sm tracking-widest {styles} {variantClass}"
>
	<slot />
</div>
