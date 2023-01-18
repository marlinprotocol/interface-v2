<script>
	export let onclick = () => {};
	export let styleClass = '';
	$: buttonClass = `btn btn-sm md:btn-md text-primary border-primary hover:bg-white hover:border-primary flex gap-2 ${styleClass}`;
</script>

<button on:click|preventDefault={onclick} class={buttonClass}>
	<slot />
</button>
