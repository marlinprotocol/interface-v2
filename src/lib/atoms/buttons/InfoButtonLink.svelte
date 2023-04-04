<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import { staticImages } from '$lib/components/images/staticImages';

	export let href = '';
	export let text: string;
	export let styleClass = '';
	$: buttonClass = `${buttonClasses.lightblueFilled} w-fit h-10 text-small font-medium gap-3 mx-auto mt-4 ${styleClass}`;
</script>

<a class={buttonClass} {href} target="_blank" rel="noopener noreferrer">
	<img src={staticImages.OpenInNew} alt="Copy" />
	{text}
</a>
