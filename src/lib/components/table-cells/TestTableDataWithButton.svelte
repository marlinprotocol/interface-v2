<script lang="ts">
	export let Component: any;
</script>

<svelte:component this={Component}>
	<button slot="line1">Test Component First Chidren</button>
	<button slot="line2">Test Component Second Chidren</button>
</svelte:component>
