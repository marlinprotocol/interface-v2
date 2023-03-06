<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';

	export let text = 'Back';
	export let href: string;
</script>

<a {href} class={buttonClasses.largeButton}>
	<img src="/images/left-blue-arrow.svg" alt="Back" width="12" />
	{text}
</a>
