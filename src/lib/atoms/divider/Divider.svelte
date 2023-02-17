<script lang="ts">
	export let direction: 'divider-horizontal' | 'divider-vertical' = 'divider-horizontal';
	export let margin: string = 'my-1';
	export let height: string = 'h-2';

	const getDirectionBasedBorder = (variant: string) => {
		switch (variant) {
			case 'divider-horizontal':
				return 'border-b border-b-black/[0.1]';
			case 'divider-vertical':
				return 'border-r border-b-black';
			default:
				return 'border-b border-b-black';
		}
	};

	const borderStyle = getDirectionBasedBorder(direction);
</script>

<div class={`${borderStyle} ${margin} ${height} w-full`} />
