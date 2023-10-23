<script lang="ts">
	export let styleClass = '';
</script>

<div class="mx-auto w-full sm:w-130">
	{#if $$slots.header}
		<div class="mb-2">
			<slot name="header" />
		</div>
	{/if}
	<div
		class="card mx-auto rounded-lg bg-base-100 px-4 py-4 text-center sm:px-6 sm:py-6 {styleClass}"
	>
		<slot />
	</div>
</div>
