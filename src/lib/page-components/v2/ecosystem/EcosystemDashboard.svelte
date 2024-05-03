<script lang="ts">
	import { staticImages } from '$lib/components/images/staticImages';
	import SearchBar from '$lib/components/v2/search/SearchBar.svelte';
	import PageTitle from '$lib/components/v2/texts/PageTitle.svelte';
	import { isNavOpen } from '$lib/data-stores/v2/navStore';
	import { cn } from '$lib/utils/helpers/commonHelper';
	import Button from '$lib/atoms/v2/buttons/Button.svelte';

	type filterDataModal = Array<{
		name: string;
		link: string;
		logo: string;
		website: string;
		category: Array<string>;
	}>;

	let searchInput = '';
	let selectedFilter = 'View All';
	let filteredPartners: filterDataModal;
	const partners: filterDataModal = [
		{
			name: 'Ankr',
			link: '#',
			logo: staticImages.ankrLogo,
			website: 'https://www.ankr.com/',
			category: ['Blockchain']
		},
		{
			name: 'Aspecta',
			link: '#',
			logo: staticImages.aspectaLogo,
			website: 'https://www.ankr.com/',
			category: ['Identity']
		},
		{
			name: 'Avail',
			link: '#',
			logo: staticImages.availLogo,
			website: 'https://avail.global/',
			category: ['Wallets']
		},
		{
			name: 'Brightly Stake',
			link: '#',
			logo: staticImages.brightlyStakeLogo,
			website: 'https://brightlystake.com/',
			category: ['Validators']
		},

		{
			name: 'Cradles',
			link: '#',
			logo: staticImages.cradlesLogo,
			website: 'https://www.cradles.io/',
			category: ['Gaming']
		},
		{
			name: 'Chorus One',
			link: '#',
			logo: staticImages.chorusOneLogo,
			website: 'https://chorus.one/',
			category: ['Validators']
		},
		{
			name: 'Dego',
			link: '#',
			logo: staticImages.degoLogo,
			website: 'https://dego.finance/home',
			category: ['NFT', 'DeFi']
		},
		{
			name: 'Echolink',
			link: '#',
			logo: staticImages.echolinkLogo,
			website: 'https://echolink.network/',
			category: ['Oracles']
		},
		{
			name: 'Go Sleep Pro',
			link: '#',
			logo: staticImages.goSleepLogo,
			website: 'https://gosleep.pro/',
			category: ['NFT']
		},
		{
			name: 'Hashkey Cloud',
			link: '#',
			logo: staticImages.hashkeyCloudLogo,
			website: 'https://www.hashkey.cloud/',
			category: ['Validators']
		},
		{
			name: 'Infstones',
			link: '#',
			logo: staticImages.infstones,
			website: 'https://infstones.com/',
			category: ['Validators']
		},
		{
			name: 'Mida swap',
			link: '#',
			logo: staticImages.midaSwapLogo,
			website: 'https://www.midaswap.org/',
			category: ['DEX']
		},
		{
			name: 'Nodeasy',
			link: '#',
			logo: staticImages.nodeasyLogo,
			website: 'https://www.nodeasy.com/',
			category: ['Validators']
		},
		{
			name: 'P2P',
			link: '#',
			logo: staticImages.p2pLogo,
			website: 'https://p2p.org/',
			category: ['Validators']
		},
		{
			name: 'Prom',
			link: '#',
			logo: staticImages.promLogo,
			website: 'https://prom.io/',
			category: ['Blockchain']
		},
		{
			name: 'Public AI',
			link: '#',
			logo: staticImages.publicAiLogo,
			website: 'https://publicai.io/',
			category: ['AI']
		},
		{
			name: 'Shanghai Jiao Tong University',
			link: '#',
			logo: staticImages.sjtUniversityLogo,
			website: 'https://en.sjtu.edu.cn/',
			category: ['Validators']
		},
		{
			name: 'StaFi',
			link: '#',
			logo: staticImages.stafiLogo,
			website: 'https://www.stafi.io/',
			category: ['DeFi']
		},
		{
			name: 'Staking 4 All',
			link: '#',
			logo: staticImages.staking4allLogo,
			website: 'https://www.staking4all.org/',
			category: ['Validators']
		},
		{
			name: 'T2T2',
			link: '#',
			logo: staticImages.t2t2Logo,
			website: 'https://www.t2click.com/home',
			category: ['Blockchain']
		}
	];

	const filters = [
		'View All',
		'Blockchain',
		'Validators',
		'DeFi',
		'AI',
		'DEX',
		'NFT',
		'Oracles',
		'Gaming',
		'Wallets',
		'Identity'
	];

	function getFilteredPartners(partnerSearchString: string, partnerFilterString: string) {
		if (partnerFilterString === 'View All' && !partnerSearchString.length) {
			return partners;
		}

		if (!partnerSearchString.length) {
			return partners.filter((partner) => partner.category.includes(partnerFilterString));
		}

		if (partnerFilterString === 'View All' && !!partnerSearchString.length) {
			return partners.filter((partner) =>
				partner.name.toLowerCase().includes(partnerSearchString.toLowerCase())
			);
		}
		return partners
			.filter((partner) => partner.name.toLowerCase().includes(partnerSearchString.toLowerCase()))
			.filter((partner) => partner.category.includes(partnerFilterString));
	}
	$: filteredPartners = getFilteredPartners(searchInput, selectedFilter);
</script>

<div class=" flex w-full flex-col justify-start">
	<PageTitle title="Explore The Ecosystem" />
	<SearchBar
		bind:input={searchInput}
		placeholder="Search for the partner you are looking for..."
		styleClass="w-full"
	/>

	<div class="my-4 flex gap-1.5">
		{#each filters as filter}
			{#if selectedFilter === filter}
				<Button
					onclick={() => {
						selectedFilter = filter;
					}}
					variant="filled"
				>
					{filter}
				</Button>
			{:else}
				<Button
					onclick={() => {
						selectedFilter = filter;
					}}
					variant="greyOutlined"
					styleClass="font-normal"
				>
					{filter}
				</Button>
			{/if}
		{/each}
	</div>

	<div class="grid grid-cols-5 gap-6 2xl:grid-cols-7">
		{#each filteredPartners as partner}
			<a href={partner.website} class="group w-full" target="_blank">
				<div
					class={cn(
						'flex h-[210px] w-full items-center justify-center rounded-xl border border-[#D9DADE] bg-white transition-all duration-300 ease-out group-hover:border-2',
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
