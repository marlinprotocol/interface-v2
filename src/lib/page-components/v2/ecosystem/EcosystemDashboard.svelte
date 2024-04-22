<script lang="ts">
	import { staticImages } from '$lib/components/images/staticImages';
	import SearchBar from '$lib/components/v2/search/SearchBar.svelte';
	import PageTitle from '$lib/components/v2/texts/PageTitle.svelte';
	import { isNavOpen } from '$lib/data-stores/v2/navStore';
	import { cn } from '$lib/utils/helpers/commonHelper';

	let searchInput = '';

	const partners = [
		{
			name: 'Ankr',
			link: '#',
			logo: staticImages.ankrLogo
		},
		{
			name: 'Cradles',
			link: '#',
			logo: staticImages.cradlesLogo
		},
		{
			name: 'Brightly Stake',
			link: '#',
			logo: staticImages.brightlyStakeLogo
		},
		{
			name: 'Mida swap',
			link: '#',
			logo: staticImages.midaSwapLogo
		},
		{
			name: 'Aspecta',
			link: '#',
			logo: staticImages.aspectaLogo
		},
		{
			name: 'Echolink',
			link: '#',
			logo: staticImages.echolinkLogo
		},
		{
			name: 'Public AI',
			link: '#',
			logo: staticImages.publicAiLogo
		},
		{
			name: 'P2P',
			link: '#',
			logo: staticImages.p2pLogo
		},
		{
			name: 'T2T2',
			link: '#',
			logo: staticImages.t2t2Logo
		},
		{
			name: 'Hashkey Cloud',
			link: '#',
			logo: staticImages.hashkeyCloudLogo
		},
		{
			name: 'Nodeasy',
			link: '#',
			logo: staticImages.nodeasyLogo
		},
		{
			name: 'Chorus One',
			link: '#',
			logo: staticImages.chorusOneLogo
		},
		{
			name: 'Avail',
			link: '#',
			logo: staticImages.availLogo
		},
		{
			name: 'StaFi',
			link: '#',
			logo: staticImages.stafiLogo
		},
		{
			name: 'Shanghai Jiao Tong University',
			link: '#',
			logo: staticImages.sjtUniversityLogo
		},
		{
			name: 'Go Sleep Pro',
			link: '#',
			logo: staticImages.goSleepLogo
		},
		{
			name: 'Infstones',
			link: '#',
			logo: staticImages.infstones
		},
		{
			name: 'Staking 4 All',
			link: '#',
			logo: staticImages.staking4allLogo
		},
		{
			name: 'Dego',
			link: '#',
			logo: staticImages.degoLogo
		},
		{
			name: 'Prom',
			link: '#',
			logo: staticImages.promLogo
		}
	];

	function getFilteredPartners(partnerSearchString: string) {
		return partners.filter((partner) =>
			partner.name.toLowerCase().includes(partnerSearchString.toLowerCase())
		);
	}

	$: filteredPartners = getFilteredPartners(searchInput);
</script>

<div class="mx-[28px] flex w-full flex-col justify-start">
	<PageTitle title="Explore The Ecosystem" />
	<SearchBar
		bind:input={searchInput}
		placeholder="Search for operator, instance or region"
		styleClass="w-full"
	/>

	<div class="mt-4 grid grid-cols-5 gap-4">
		{#each filteredPartners as partner}
			<a href={partner.link} class="group" target="_blank">
				<div
					class={cn(
						'flex h-[210px] w-[238px]  items-center justify-center rounded-xl border border-[#D9DADE] bg-white transition-all duration-300 ease-out group-hover:border-2',
						{ 'w-[203px]': $isNavOpen }
					)}
				>
					<img
						src={partner.logo}
						class="transition-transform duration-300 ease-in-out group-hover:scale-110"
						alt={partner.name + ' Logo'}
					/>
				</div>
			</a>
		{/each}
	</div>
</div>
