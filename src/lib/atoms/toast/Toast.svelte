<script lang="ts">
	import type { ToastModel } from '$lib/types/componentTypes';
	import Icon from '$lib/atoms/icons/Icon.svelte';
	import { dismissToast, toastsStore } from '$lib/data-stores/toastStore';
	import { fade, slide } from 'svelte/transition';

	let toasts: ToastModel[];
	toastsStore.subscribe((value) => {
		toasts = value;
	});

	const baseClass =
		'alert w-fit shadow-lg font-medium flex items-start justify-start gap-1 px-4 py-2 rounded flex-row';
</script>

{#if toasts}
	<div class="toast toast-top toast-end items-end z-[9999]">
		{#each toasts as toast (toast.id)}
			<div
				in:slide
				out:fade
				on:click={() => dismissToast(toast.id)}
				on:keydown={() => dismissToast(toast.id)}
				class={`${toast.className} ${baseClass}`}
			>
				<div class={'h-5 w-5'}>
					<Icon iconColorClass={toast.iconColor} data={toast.iconData} size={18} />
				</div>
				<span class="grow text-sm max-w-[330px] text-left">{toast.message}</span>
			</div>
		{/each}
	</div>
{/if}
