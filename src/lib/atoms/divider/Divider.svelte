<script lang="ts">
	export let direction: 'divider-horizontal' | 'divider-vertical' = 'divider-horizontal';
	export let margin = 'my-0';
	export let color: string = '';
	export let height: string = '';
	export let width: string = '';

	const getDividerColor = (variant: string) => {
		switch (variant) {
			case 'divider-horizontal':
				return 'bg-black/[0.1]';
			case 'divider-vertical':
				return 'bg-grey-500';
			default:
				return 'bg-black/[0.1]';
		}
	};

	const getDividerWidth = (variant: string) => {
		switch (variant) {
			case 'divider-horizontal':
				return 'w-full';
			case 'divider-vertical':
				return 'w-[1px]';
			default:
				return 'w-full';
		}
	};

	const getDividerHeight = (variant: string) => {
		switch (variant) {
			case 'divider-horizontal':
				return 'h-[1px]';
			case 'divider-vertical':
				return 'h-4';
			default:
				return 'h-[1px]';
		}
	};

	const dividerHeight = height !== '' ? height : getDividerHeight(direction);
	const dividerWidth = width !== '' ? width : getDividerWidth(direction);
	const dividerColor = color !== '' ? color : getDividerColor(direction);
</script>

<div class="{dividerHeight} {dividerWidth} {dividerColor} {margin}" />
