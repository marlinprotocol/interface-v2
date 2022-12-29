<script lang="ts">
	import { scale } from 'svelte/transition';
	import { quadInOut } from 'svelte/easing';

	const classes = 'items-center rounded-lg bg-white dark:bg-dark-400 p-8 w-full shadow';
	const titleClasses = 'text-lg font-bold pb-4 flex justify-between align-center';
	const actionsClasses = 'flex w-full justify-end';
	const background =
		'bg-black/60 z-[999] fixed top-0 left-0 w-full h-full flex items-center justify-center';

	export let value: boolean;
	export let modalWidth: string = 'max-w-lg';
	export let persistent: boolean = false;

	export let transitionProps = { duration: 300, easing: quadInOut, delay: 0 };

	function onClose(): void {
		value = false;
	}

	function onBackgroundClick(): void {
		if (!persistent) value = false;
	}

	// a11y
	function onKeyDown(event: KeyboardEvent): void {
		if (event.code === 'Escape') onClose();
	}
</script>

<svelte:window on:keydown={onKeyDown} />
{#if value}
	<!-- TODO: fix implementation with using a modal store to handle multiple chained modals and move to the top of dom tree -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class={background} on:click|preventDefault={() => onBackgroundClick()}>
		<div in:scale={transitionProps} class={`${classes} ${modalWidth}`} on:click|stopPropagation>
			<div class={titleClasses}>
				<slot name="title" />
				<button type="button" on:click={() => onClose()}>
					<img src="/images/closemodal.svg" alt="close modal" />
				</button>
			</div>
			<slot />
			<div class={actionsClasses}>
				<slot name="actions" />
			</div>
		</div>
	</div>
{/if}
