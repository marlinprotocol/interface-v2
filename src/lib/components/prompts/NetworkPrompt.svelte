<script lang="ts">
	import { staticImages } from '$lib/components/images/staticImages';
	import ChainSwitcher from '../header/sub-components/ChainSwitcher.svelte';
</script>

<div class="flex h-full w-full items-center justify-center">
	<div
		class="flex h-[460px] w-130 flex-col items-center justify-center rounded-3xl border border-[#D9DADE] bg-[#3840C7]"
	>
		<div class="flex h-[84px] w-[84px] items-center justify-center rounded-full bg-white">
			<img src={staticImages.infoIconPurple} alt="Info Icon" />
		</div>
		<span class="mt-2 text-3xl font-medium text-[#D9DADE]">Unsupported Network</span>
		<p class="text-md mx-auto mt-2 max-w-[400px] text-center font-light leading-6 text-[#D9DADE]">
			Please switch to one of the chains in the dropdown to continue.
		</p>
		<div class="mt-12 flex w-64 items-center justify-between rounded-full border border-white">
			<span class="pl-4 font-medium text-[#D9DADE]">Switch</span>
			<ChainSwitcher />
		</div>
	</div>
</div>
