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

<div class="flex items-center">
	<button
		disabled={isFirstPage}
		data-testid="pagination-prev-button"
		class="flex h-10 items-center gap-2 rounded-s-lg border border-r-0 border-[#D9DADE] bg-white px-4 py-[10px] font-poppins text-sm font-medium text-[#1D2939]"
		on:click={() => {
			if (activePage > 1) {
				handlePageChange(activePage - 1);
			}
		}}
	>
		<img src={staticImages.ArrowLeftSolid} alt={staticImages.ArrowLeftSolid} />
		Previous
	</button>
	{#if pageCount <= 7}
		{#each pageArray as page, i}
			<button
				on:click={() => handlePageChange(page)}
				class={cn(
					'tex-sm flex h-10 w-10 items-center justify-center border border-[#D9DADE] bg-white font-poppins font-normal text-[#344054]',
					i == 1 && 'border-l-0 border-r-0',
					activePage === page && 'bg-[#3840C7] text-white'
				)}
			>
				{page}
			</button>
		{/each}
	{:else}
		<button
			on:click={() => handlePageChange(1)}
			class={cn(
				'tex-sm flex h-10 w-10 items-center justify-center border border-[#D9DADE] bg-white font-poppins font-normal text-[#344054]',

				activePage === 1 && 'bg-[#3840C7] text-white'
			)}
		>
			1
		</button>
		<button
			on:click={() => {
				activePage <= 3 && handlePageChange(2);
			}}
			class={cn(
				'tex-sm flex h-10 w-10 items-center justify-center border border-[#D9DADE] bg-white font-poppins font-normal text-[#344054]',
				'border-l-0 border-r-0',
				activePage <= 3 && activePage === 2 && 'bg-[#3840C7] text-white'
			)}
		>
			{#if activePage <= 3}
				2
			{:else}
				...
			{/if}
		</button>
		<button
			on:click={() => {
				const page =
					activePage <= 5 ? 3 : pageCount - activePage > 2 ? activePage - 2 : pageCount - 4;
				handlePageChange(thirdPageCount);
			}}
			class={cn(
				'tex-sm flex h-10 w-10 items-center justify-center border border-[#D9DADE] bg-white font-poppins font-normal text-[#344054]',
				'border-l-0 border-r-0',
				activePage === thirdPageCount && 'bg-[#3840C7] text-white'
			)}
		>
			{thirdPageCount}
		</button>

		<button
			on:click={() => {
				activePage >= 4 && handlePageChange(forthPageCount);
			}}
			class={cn(
				'tex-sm flex h-10 w-10 items-center justify-center border border-[#D9DADE] bg-white font-poppins font-normal text-[#344054]',
				'border-l-0 border-r-0',
				activePage >= 4 && activePage === forthPageCount && 'bg-[#3840C7] text-white'
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
				'tex-sm flex h-10 w-10 items-center justify-center border border-[#D9DADE] bg-white font-poppins font-normal text-[#344054]',
				'border-l-0 border-r-0',
				activePage === fifthPageCount && 'bg-[#3840C7] text-white'
			)}
		>
			{fifthPageCount}
		</button>

		<button
			on:click={() => {
				activePage > pageCount - 2 || (activePage < 4 && handlePageChange(pageCount - 1));
			}}
			class={cn(
				'tex-sm flex h-10 w-10 items-center justify-center border border-[#D9DADE] bg-white font-poppins font-normal text-[#344054]',
				'border-l-0 border-r-0',
				(activePage > pageCount - 2 || activePage < 4) &&
					activePage === pageCount - 1 &&
					'bg-[#3840C7] text-white'
			)}
		>
			{#if activePage > pageCount - 2 || activePage < 4}
				{pageCount - 1}
			{:else}
				...
			{/if}
		</button>

		<button
			on:click={() => handlePageChange(pageCount)}
			class={cn(
				'tex-sm flex h-10 w-10 items-center justify-center border border-[#D9DADE] bg-white font-poppins font-normal text-[#344054]',
				activePage === pageCount && 'bg-[#3840C7] text-white'
			)}
		>
			{pageCount}
		</button>
	{/if}

	<button
		disabled={isLastPage}
		data-testid="pagination-next-button"
		class="flex h-10 items-center gap-2 rounded-e-lg border border-l-0 border-[#D9DADE] bg-white px-4 py-[10px] font-poppins text-sm font-medium text-[#1D2939]"
		on:click={() => {
			if (activePage < pageArray.length) {
				handlePageChange(activePage + 1);
			}
		}}
	>
		Next
		<img src={staticImages.ArrowRightSolid} alt={staticImages.ArrowRightSolid} />
	</button>
</div>
