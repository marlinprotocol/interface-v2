<script lang="ts">
	import { isNavOpen } from '$lib/data-stores/v2/navStore';

	export let label: string;
	export let imgSrc: string;
</script>

<li class="flex min-w-[24px] px-4 pt-4">
	<img src={imgSrc} alt="{label} Icon" />
	{#if $isNavOpen}
		<p class="ml-4 whitespace-nowrap font-poppins text-[14px] text-[#26272C]">{label}</p>
	{/if}
</li>
