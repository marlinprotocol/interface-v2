<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import { staticImages } from '$lib/components/images/staticImages';

	export let href = '';
	export let text: string;
	export let styleClass = '';

	$: buttonClass = `${buttonClasses.lightblueFilled} ${styleClass}`;
</script>

<a
	class="text-small mx-auto mt-4 h-10 w-fit gap-3 font-medium {buttonClass} "
	{href}
	target="_blank"
	rel="noopener noreferrer"
>
	<img src={staticImages.OpenInNew} alt="Copy" />
	{text}
</a>
