<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import { staticImages } from '$lib/components/images/staticImages';
	import { cn } from '$lib/utils/helpers/commonHelper';

	export let href = '';
	export let text: string;
	export let styleClass = '';
</script>

<a
	class={cn(
		'text-small mx-auto mt-4 h-10 w-fit gap-3 font-medium ',
		buttonClasses.lightblueFilled,
		styleClass
	)}
	{href}
	target="_blank"
	rel="noopener noreferrer"
>
	<img src={staticImages.OpenInNew} alt="Open" />
	{text}
</a>
