<script lang="ts">
	import type { AppVariant } from '$lib/types/componentTypes';

	export let variant: AppVariant = 'primary';
	export let styles = '';
	const chipStyle =
		'rounded-3xl px-[20px] py-[9px] flex items-center gap-1.5 text-sm tracking-widest';

	const getClassFromVariant = (variant: AppVariant) => {
		switch (variant) {
			case 'primary':
				return 'bg-base-200 text-primary font-semibold';

			case 'secondary':
			default:
				return 'bg-grey-200 text-grey-500';
		}
	};
</script>

<div class={`${chipStyle} ${styles} ${getClassFromVariant(variant)}`}>
	<slot />
</div>
