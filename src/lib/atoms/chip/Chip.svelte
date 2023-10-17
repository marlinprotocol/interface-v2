<script lang="ts">
	import type { AppVariant } from '$lib/types/componentTypes';

	export let variant: AppVariant = 'primary';
	export let styles = '';

	const getClassFromVariant = (variant: AppVariant) => {
		switch (variant) {
			case 'primary':
				return 'bg-base-200 text-primary font-semibold';

			case 'secondary':
			default:
				return 'bg-grey-200 text-[#6f6f71]';
		}
	};
</script>

<div
	class="flex items-center gap-1.5 rounded-3xl px-[20px] py-[9px] text-sm tracking-widest {styles} {getClassFromVariant(
		variant
	)}"
>
	<slot />
</div>
