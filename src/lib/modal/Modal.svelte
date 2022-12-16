<script lang="ts">
	import { scale } from 'svelte/transition';
	import { quadInOut } from 'svelte/easing';

	const classesDefault =
		'items-center z-50 rounded bg-white dark:bg-dark-400 p-8 w-full max-w-lg shadow';
	const titleClassesDefault = 'text-lg font-bold pb-4 flex justify-between align-center';
	const actionsClassesDefault = 'flex w-full justify-end';
	const background = 'bg-black/20 z-10 fixed top-0 left-0 w-full h-full';

	export let value: Boolean;
	export let classes = classesDefault;
	export let titleClasses = titleClassesDefault;
	export let actionsClasses = actionsClassesDefault;
	export let persistent = false;

	export let transitionProps = { duration: 300, easing: quadInOut, delay: 0 };
</script>

{#if value}
	<div class="fixed w-full h-full top-0 left-0 z-30">
		<div class={background} on:click={() => !persistent && (value = false)} />
		<div class="h-full w-full absolute flex items-center justify-center">
			<div in:scale={transitionProps} class={classes}>
				<div class={titleClasses}>
					<slot name="title" />
					<button type="button" on:click={() => (value = false)}>
						<img src="/images/closemodal.svg" alt="close modal" />
					</button>
				</div>
				<slot />
				<div class={actionsClasses}>
					<slot name="actions" />
				</div>
			</div>
		</div>
	</div>
{/if}
