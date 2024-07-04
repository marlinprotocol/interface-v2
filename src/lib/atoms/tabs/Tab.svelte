<script lang="ts">
	import { staticImages } from '$lib/components/images/staticImages';
	import { cn } from '$lib/utils/helpers/commonHelper';

	export let id: string;
	export let liClass = 'mr-2';
</script>

<li
	class={cn('relative flex w-full list-none justify-center', liClass)}
	role="presentation"
	data-testid="tab"
>
	<button
		on:click
		class="-my-5 flex h-14 w-14 items-center justify-center rounded-full border border-grey-100 bg-white"
		id="{id}-tabhead"
		type="button"
		role="tab"
	>
		<img src={staticImages.arrowConversion} alt="Conversion" />
	</button>
</li>
