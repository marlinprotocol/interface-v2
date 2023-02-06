<script lang="ts">
	import type { ToastModel } from '$lib/types/componentTypes';
	import Icon from '$lib/atoms/icons/Icon.svelte';
	import { toastsStore } from '$lib/data-stores/toastStore';
	import { fade, slide } from 'svelte/transition';

	let toasts: ToastModel[];
	toastsStore.subscribe((value) => {
		toasts = value;
	});

	const baseClass =
		'alert w-fit shadow-lg font-medium flex items-center justify-start gap-1 px-4 py-2 rounded';
</script>

{#if toasts}
	<div class="toast toast-top toast-end items-end">
		{#each toasts as toast (toast.id)}
			<div in:slide out:fade class={`${toast.className} ${baseClass}`}>
				<Icon iconColorClass={toast.iconColor} data={toast.iconData} size={18} />
				<span class="text-sm max-w-[330px] text-left">{toast.message}</span>
			</div>
		{/each}
	</div>
{/if}
