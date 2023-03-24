<script lang="ts">
	export let styleClass = '';
	const cardStyle =
		'card bg-base-100 rounded-lg w-72 sm:w-130 px-4 py-4 sm:px-6 sm:py-6 mt-4 mx-auto text-center';
</script>

<div class={`${cardStyle} ${styleClass}`}>
	<slot />
</div>
