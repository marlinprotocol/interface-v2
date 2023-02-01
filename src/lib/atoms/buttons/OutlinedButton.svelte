<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';

	export let onclick = () => {};
	export let styleClass: string = '';
	$: buttonClass = `${buttonClasses.outlined} ${styleClass}`;
</script>

<button on:click|preventDefault={onclick} class={buttonClass}>
	<slot />
</button>
