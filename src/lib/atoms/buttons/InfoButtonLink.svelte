<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';

	export let href = '';
	export let text: string;
	export let styleClass = '';
	$: buttonClass = `${buttonClasses.lightblueFilled} w-fit h-10 text-small font-medium gap-3 mx-auto mt-8 ${styleClass}`;
</script>

<a class={buttonClass} {href} target="_blank" rel="noopener noreferrer">
	<img src="/images/openinnew.svg" alt="Copy" />
	{text}
</a>
