<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import { staticImages } from '$lib/components/images/staticImages';

	export let text = 'Back';
	export let href: string;
</script>

<a {href} class={buttonClasses.largeButton}>
	<img src={staticImages.LeftBlueArrow} alt="Back" width="12" />
	{text}
</a>
