<script lang="ts">
	import { isNavOpen } from '$lib/data-stores/navStore';

	export let label: string;
	export let imgSrc: string;
	export let href: string;
</script>

<li class="mt-4 min-w-[24px]">
	<a {href} class="flex w-full px-4" target="_blank">
		<img src={imgSrc} alt="{label} Icon" />
		{#if $isNavOpen}
			<p class="ml-4 whitespace-nowrap font-poppins text-[14px] text-[#26272C]">{label}</p>
		{/if}
	</a>
</li>
