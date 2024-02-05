<script lang="ts">
	import Icon from '$lib/atoms/icons/Icon.svelte';
	import { dismissToast, toastsStore } from '$lib/data-stores/toastStore';
	import { fade, slide } from 'svelte/transition';
</script>

{#if $toastsStore.length > 0}
	<div class="toast toast-end toast-top z-[9999] items-end" data-testid="toast">
		{#each $toastsStore as toast (toast.id)}
			<button
				in:slide
				out:fade
				on:click={() => dismissToast(toast.id)}
				class="alert flex w-fit flex-row items-start justify-start gap-1 whitespace-normal rounded px-4 py-2 font-medium shadow-lg {toast.className}"
			>
				<div class={'flex h-5 w-5 items-center justify-center'}>
					<Icon iconColorClass={toast.iconColor} data={toast.iconData} size={18} />
				</div>
				<span class="max-w-[330px] grow text-left text-sm">{toast.message}</span>
			</button>
		{/each}
	</div>
{/if}
