<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import Icon from '$lib/atoms/icons/Icon.svelte';
	import { chevronLeft, chevronRight } from 'svelte-awesome/icons';

	export let activePage: number;
	export let pageCount: number;
	export let handlePageChange: (page: number) => void;
	export let styleClass = '';

	$: pageArray = Array.from({ length: pageCount }, (_, i) => i + 1);
	$: isLastPage = activePage === pageArray.length;
	$: isFirstPage = activePage === 1;
</script>

<div class={`btn-group ${styleClass}`}>
	<button
		disabled={isFirstPage}
		class={buttonClasses.paginationButton}
		on:click={() => {
			if (activePage > 1) {
				handlePageChange(activePage - 1);
			}
		}}
	>
		<Icon
			data={chevronLeft}
			size={12}
			iconColorClass={isFirstPage ? 'icon-info' : 'icon-primary'}
		/>
	</button>
	{#each pageArray as page}
		{#if page > activePage - 4 && page < activePage + 4}
			<button
				disabled={page === activePage}
				class={`${buttonClasses.paginationButton} ${page === activePage ? 'text-primary' : ''}`}
				on:click={() => handlePageChange(page)}
			>
				{page}
			</button>
		{/if}
	{/each}
	<button
		disabled={isLastPage}
		class={buttonClasses.paginationButton}
		on:click={() => {
			if (activePage < pageArray.length) {
				handlePageChange(activePage + 1);
			}
		}}
	>
		<Icon
			data={chevronRight}
			size={12}
			iconColorClass={isLastPage ? 'icon-info' : 'icon-primary'}
		/>
	</button>
</div>
