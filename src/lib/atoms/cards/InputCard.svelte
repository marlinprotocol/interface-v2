<script lang="ts">
	import type { InputCard } from '$lib/types/componentTypes';

	export let styles: string = '';
	// TODO: add types
	export let variant: InputCard = 'primary';
	const cardStyle = 'rounded-lg w-full';

	const getClassFromVariant = () => {
		switch (variant) {
			case 'primary':
				return 'bg-base-200 p-4';

			case 'warning':
				return 'bg-red-100 px-4 py-1';

			default:
				return 'bg-base-200 p-4';
		}
	};

	const variantClass = getClassFromVariant();
</script>

<div class={`${cardStyle} ${styles} ${variantClass}`}>
	<slot />
</div>
