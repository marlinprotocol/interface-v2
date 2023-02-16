<script lang="ts">
	export let styles: string = '';
	const cardStyle = 'rounded-lg w-full bg-base-200 p-4 ';
</script>

<div class={cardStyle + styles}>
	<slot />
</div>
