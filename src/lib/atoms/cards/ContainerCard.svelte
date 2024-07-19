<script lang="ts">
	export let styleClass = '';
	export let width = 'w-full sm:w-[600px]';
</script>

<div data-testid="container-card-root" class="mx-auto {width}">
	{#if $$slots.header}
		<div data-testid="container-card-header" class="mb-2">
			<slot name="header" />
		</div>
	{/if}
	<div
		data-testid="container-card-body"
		class="card mx-auto rounded-lg bg-base-100 px-4 py-4 text-center sm:px-6 sm:py-6 {styleClass}"
	>
		<slot />
	</div>
</div>
