<script lang="ts">
	import { isNavOpen } from '$lib/data-stores/navStore';

	export let label: string;
	export let imgSrc: string;
	export let href: string;
</script>

<li class="mt-4 min-w-[24px]">
	<a {href} class="flex w-full px-4" target="_blank">
		<img src={imgSrc} alt="{label} Icon" class="icon-invert" />
		{#if $isNavOpen}
			<p class="ml-4 whitespace-nowrap font-poppins text-[14px] text-grey-700">{label}</p>
		{/if}
	</a>
</li>
