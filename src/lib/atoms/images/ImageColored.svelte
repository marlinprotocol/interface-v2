<script lang="ts">
	import type { CommonVariant } from '$lib/types/componentTypes';
	import { getImageClassByVariant } from '$lib/utils/constants/componentConstants';

	export let src: string;
	export let alt: string = 'Image';
	export let variant: CommonVariant = 'primary';
	export let width: number = 13;

	const styleClass = getImageClassByVariant(variant);
</script>

<img {src} {alt} class={styleClass} {width} />

<style>
	.primary-img {
		filter: invert(22%) sepia(80%) saturate(6978%) hue-rotate(229deg) brightness(75%) contrast(100%);
	}
	.success-img {
		filter: invert(47%) sepia(54%) saturate(2466%) hue-rotate(86deg) brightness(97%) contrast(116%);
	}
	.error-img {
		filter: invert(11%) sepia(100%) saturate(6417%) hue-rotate(11deg) brightness(86%) contrast(117%);
	}
	.secondary-img {
		filter: invert(0%) sepia(0%) saturate(0%) hue-rotate(202deg) brightness(100%) contrast(104%);
	}
	.warning-img {
		filter: invert(72%) sepia(22%) saturate(6859%) hue-rotate(359deg) brightness(103%)
			contrast(105%);
	}
	.disabled-img {
		filter: invert(54%) sepia(80%) saturate(6978%) hue-rotate(229deg) brightness(89%) contrast(84%);
	}
	.grey-img {
		filter: invert(50%) sepia(10%) saturate(10%) hue-rotate(11deg) brightness(100%) contrast(104%);
	}
</style>
