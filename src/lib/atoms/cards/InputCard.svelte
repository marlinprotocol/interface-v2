<script lang="ts">
	import type { InputCardVariant } from '$lib/types/componentTypes';

	export let styleClass = '';
	export let variant: InputCardVariant = 'primary';
	const cardStyle = 'rounded-lg w-full';

	const getClassFromVariant = () => {
		switch (variant) {
			case 'primary':
				return 'bg-base-200 p-4';

			case 'warning':
				return 'bg-red-100 px-4 py-1';

			case 'none':
				return '';

			default:
				return 'bg-base-200 p-4';
		}
	};

	const variantClass = getClassFromVariant();
</script>

<div class={`${cardStyle} ${styleClass} ${variantClass}`}>
	<slot />
</div>
