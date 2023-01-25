<script lang="ts">
	export let direction: 'divider-horizontal' | 'divider-vertical' = 'divider-vertical';
	export let margin: string = 'my-1';
	export let height: string = 'h-4';
</script>

<div class={`divider ${direction} ${margin} ${height}`} />
