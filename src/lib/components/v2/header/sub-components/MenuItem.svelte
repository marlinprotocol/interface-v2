<script lang="ts">
	import exp from 'constants';

	export let label: string;
	export let imgSrc: string;
	export let isNavOpen: Boolean;
</script>

<li class="flex min-w-[24px] px-4 pt-4">
	<img src={imgSrc} alt="{label} Icon" />
	{#if isNavOpen}
		<p class="ml-4 whitespace-nowrap font-poppins text-[14px] text-[#26272C]">{label}</p>
	{/if}
</li>
