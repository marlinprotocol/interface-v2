<script lang="ts">
	import { buttonClasses } from '../componentClasses';

	export let onclick = () => {};
	export let styleClass: string = '';
	$: buttonClass = `${buttonClasses.primary} ${styleClass}`;
</script>

<button on:click|preventDefault={onclick} class={buttonClass}>
	<slot />
</button>
