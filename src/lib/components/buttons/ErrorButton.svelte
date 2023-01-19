<script lang="ts">
	export let onclick = () => {};
	export let styleClass: string = '';
	$: buttonClass = `btn btn-sm md:btn-md text-error border-error hover:bg-white hover:border-error ${styleClass}`;
</script>

<button on:click|preventDefault={onclick} class={buttonClass}>
	<slot />
</button>
