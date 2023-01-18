<script>
	export let onclick = () => {};
	export const styleClass = '';
	$: buttonClass = `btn btn-primary  ${styleClass}`;
</script>

<button on:click|preventDefault={onclick} class={buttonClass}>
	<slot />
</button>
