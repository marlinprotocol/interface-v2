<script lang="ts">
	import { staticImages } from '$lib/components/images/staticImages';
	import { cn } from '$lib/utils/helpers/commonHelper';

	export let activePage: number;
	export let pageCount: number;
	export let handlePageChange: (page: number) => void;

	$: pageArray = Array.from({ length: pageCount }, (_, i) => i + 1);
	$: isLastPage = activePage === pageArray.length;
	$: isFirstPage = activePage === 1;
	$: thirdPageCount = calculateThirdPageCount(activePage, pageCount);
	$: forthPageCount = calculateForthPageCount(activePage, pageCount);
	$: fifthPageCount = calculateFifthPageCount(activePage, pageCount);
	$: lastPageNumber = activePage > pageCount - 2 || activePage < 4;
	$: shouldDisplayLastPageNumber = lastPageNumber && activePage === pageCount - 1;

	function handlePrevClick() {
		if (activePage > 1) {
			handlePageChange(activePage - 1);
		}
	}

	function handleNextClick() {
		if (activePage < pageCount) {
			handlePageChange(activePage + 1);
		}
	}

	function handleLastPageClick() {
		if (lastPageNumber) {
			handlePageChange(pageCount - 1);
		}
	}

	function calculateThirdPageCount(activePage: number, pageCount: number): number {
		return activePage <= 5 ? 3 : pageCount - activePage > 2 ? activePage - 2 : pageCount - 4;
	}

	function calculateForthPageCount(activePage: number, pageCount: number): number {
		return activePage > pageCount - 3 ? pageCount - 3 : activePage === 4 ? 4 : activePage - 1;
	}

	function calculateFifthPageCount(activePage: number, pageCount: number): number {
		return activePage > pageCount - 3 || activePage < 4
			? pageCount - 2
			: activePage === 4
				? 5
				: activePage;
	}
</script>

<div class="mb-[18px] mt-[52px] flex items-center justify-end">
	<button
		disabled={isFirstPage}
		data-testid="pagination-prev-button"
		class="flex h-10 items-center gap-2 rounded-s-lg border border-r-0 border-[#D9DADE] bg-white px-4 py-[10px] font-poppins text-sm font-medium text-[#1D2939] disabled:cursor-not-allowed disabled:opacity-30"
		on:click={handlePrevClick}
	>
		<img src={staticImages.ArrowLeftSolid} alt={staticImages.ArrowLeftSolid} />
		Previous
	</button>
	{#if pageCount <= 7}
		{#each pageArray as page, i}
			<button
				on:click={() => handlePageChange(page)}
				class={cn(
					'flex h-10 w-10 items-center justify-center border border-[#D9DADE] bg-white font-poppins text-sm font-normal text-[#344054]',
					{
						'border-x-0': i % 2,
						'border-r': pageCount === i + 1,
						'bg-[#3840C7] text-white': activePage === page
					}
				)}
			>
				{page}
			</button>
		{/each}
	{:else}
		<button
			on:click={() => handlePageChange(1)}
			class={cn(
				'flex h-10 w-10 items-center justify-center border border-[#D9DADE] bg-white font-poppins text-sm font-normal text-[#344054]',
				{ 'bg-[#3840C7] text-white': activePage === 1 }
			)}
		>
			1
		</button>
		<button
			on:click={() => activePage <= 3 && handlePageChange(2)}
			class={cn(
				'flex h-10 w-10 items-center justify-center border border-x-0 border-[#D9DADE] bg-white font-poppins text-sm font-normal text-[#344054]',
				{ 'bg-[#3840C7] text-white': activePage <= 3 && activePage === 2 }
			)}
		>
			{#if activePage <= 3}
				2
			{:else}
				...
			{/if}
		</button>
		<button
			on:click={() => handlePageChange(thirdPageCount)}
			class={cn(
				'flex h-10 w-10 items-center justify-center border border-[#D9DADE] bg-white font-poppins text-sm font-normal text-[#344054]',
				{ 'bg-[#3840C7] text-white': activePage === thirdPageCount }
			)}
		>
			{thirdPageCount}
		</button>

		<button
			on:click={() => activePage >= 4 && handlePageChange(forthPageCount)}
			class={cn(
				'flex h-10 w-10 items-center justify-center border border-x-0 border-[#D9DADE] bg-white font-poppins text-sm font-normal text-[#344054]',
				{ 'bg-[#3840C7] text-white': activePage >= 4 && activePage === forthPageCount }
			)}
		>
			{#if activePage < 4}
				...
			{:else}
				{forthPageCount}
			{/if}
		</button>

		<button
			on:click={() => handlePageChange(fifthPageCount)}
			class={cn(
				'flex h-10 w-10 items-center justify-center border border-[#D9DADE] bg-white font-poppins text-sm font-normal text-[#344054]',
				{ 'bg-[#3840C7] text-white': activePage === fifthPageCount }
			)}
		>
			{fifthPageCount}
		</button>

		<button
			on:click={handleLastPageClick}
			class={cn(
				'flex h-10 w-10 items-center justify-center border border-x-0 border-[#D9DADE] bg-white font-poppins text-sm font-normal text-[#344054]',
				{
					'bg-[#3840C7] text-white': shouldDisplayLastPageNumber
				}
			)}
		>
			{#if lastPageNumber}
				{pageCount - 1}
			{:else}
				...
			{/if}
		</button>

		<button
			on:click={() => handlePageChange(pageCount)}
			class={cn(
				'flex h-10 w-10 items-center justify-center border border-[#D9DADE] bg-white font-poppins text-sm font-normal text-[#344054]',
				{ 'bg-[#3840C7] text-white': activePage === pageCount }
			)}
		>
			{pageCount}
		</button>
	{/if}

	<button
		disabled={isLastPage}
		data-testid="pagination-next-button"
		class="flex h-10 items-center gap-2 rounded-e-lg border border-l-0 border-[#D9DADE] bg-white px-4 py-[10px] font-poppins text-sm font-medium text-[#1D2939] disabled:cursor-not-allowed disabled:opacity-30"
		on:click={handleNextClick}
	>
		Next
		<img src={staticImages.ArrowRightSolid} alt={staticImages.ArrowRightSolid} />
	</button>
</div>
