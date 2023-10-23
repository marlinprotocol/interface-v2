<script lang="ts">
	export let loading = false;
	export let hasPadding = false;
</script>

{#if loading}
	<span
		class="relative flex justify-center rounded-3xl text-white {hasPadding ? 'h-6 w-6' : 'h-5 w-5'}"
	>
		<span
			class="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"
		/>
		<span
			class="relative inline-flex justify-center rounded-full bg-orange-400 text-center text-sm {hasPadding
				? 'h-6 w-6 p-[2.5px]'
				: 'h-5 w-5'}"
		>
			<slot />
		</span>
	</span>
{:else}
	<div
		class="flex justify-center rounded-3xl bg-grey-400 text-white {hasPadding
			? 'h-6 w-6'
			: 'h-5 w-5'}"
	>
		<slot />
	</div>
{/if}
