<script lang="ts">
	import { toastsStore } from '$lib/data-stores/toastStore';
	import { cn } from '$lib/utils/helpers/commonHelper';
	import { fly } from 'svelte/transition';
</script>

{#if $toastsStore.length > 0}
	<div
		in:fly={{ x: 100, duration: 500 }}
		out:fly={{ x: 100, duration: 500 }}
		class="toast toast-end toast-bottom z-[9999] items-end p-10"
		data-testid="toast"
	>
		{#each $toastsStore as toast (toast.id)}
			<button
				data-testid="toast-btn"
				class={cn(
					'alert flex w-fit flex-row justify-start gap-3 whitespace-normal !rounded-[15px] border-0 py-[17.5px] pl-[13px] pr-[46px] font-medium shadow-lg',
					toast.message.description ? 'items-start' : 'items-center',
					toast.className
				)}
				out:fly={{ x: 30, duration: 300 }}
			>
				<div class={'flex h-[54px] w-[54px] items-center justify-center rounded-full bg-white'}>
					<img src={toast.iconData} alt={toast.iconData} />
				</div>
				<span class="max-w-[330px] grow text-left text-sm">
					{#if toast.message.title}
						<div
							class={cn(
								'font-poppins text-lg text-[#000000]',
								toast.message.description ? 'font-medium' : 'font-normal'
							)}
						>
							{toast.message.title}
						</div>
					{/if}
					{#if toast.message.description}
						<p class="text-base font-light text-[#707070]">
							{toast.message.description}
						</p>
					{/if}
				</span>
			</button>
		{/each}
	</div>
{/if}
