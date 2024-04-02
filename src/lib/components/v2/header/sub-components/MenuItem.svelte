<script lang="ts">
	export let iconSVG: string;
	export let label: string;
	export let isNavOpen: Boolean;
</script>

<div class="flex min-w-[24px] px-4 pt-4">
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		{@html iconSVG}
	</svg>
	{#if isNavOpen}
		<p class="ml-4 whitespace-nowrap font-poppins text-[14px] text-[#26272C]">{label}</p>
	{/if}
</div>
