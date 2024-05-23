<script lang="ts">
	import { staticImages } from '$lib/components/images/staticImages';
	import SearchBar from '$lib/components/search/SearchBar.svelte';
	import PageTitle from '$lib/components/texts/PageTitle.svelte';
	import { cn } from '$lib/utils/helpers/commonHelper';
	import Button from '$lib/atoms/buttons/Button.svelte';

	type filterDataModal = Array<{
		name: string;
		logo?: string;
		website: string;
		category: FilterCategory[];
	}>;

	type FilterCategory = (typeof filters)[number];

	let searchInput = '';
	let selectedFilter = 'View All';
	let filteredPartners: filterDataModal;

	const partners: filterDataModal = [
		{
			name: 'Myri',
			logo: undefined,
			website: '#',
			category: ['AI']
		},
		{
			name: 'Sigmoid',
			logo: staticImages.sigmoIdLogo,
			website: 'https://www.sigmoid.wtf/',
			category: ['AI']
		},
		{
			name: 'Accseal',
			logo: staticImages.accsealLogo,
			website: 'https://www.accseal.com/',
			category: ['Zero Knowledge', 'Bitcoin L2', 'AI']
		},
		{
			name: 'Operator.io',
			logo: staticImages.operatorLogo,
			website: 'https://operator.io/',
			category: ['AI']
		},
		{
			name: 'PublicAI',
			logo: staticImages.publicAiLogo,
			website: 'https://publicai.io/',
			category: ['AI']
		},
		{
			name: 'SIDE',
			logo: staticImages.sideLogo,
			website: 'https://side.one/',
			category: ['Bitcoin L2']
		},
		{
			name: 'Asula',
			logo: undefined,
			website: 'https://asula.fyi/',
			category: ['Bitcoin L2']
		},
		{
			name: 'Polygon',
			logo: staticImages.PolygonFullLogo,
			website: 'https://polygon.technology/',
			category: ['Blockchain']
		},
		{
			name: 'Arbitrum',
			logo: staticImages.ArbitrumFullLogo,
			website: 'https://arbitrum.io/',
			category: ['Blockchain']
		},
		{
			name: 'Injective',
			logo: staticImages.injectiveLogo,
			website: 'https://injective.com/',
			category: ['Blockchain']
		},
		{
			name: 'Ankr',
			logo: staticImages.ankrLogo,
			website: 'https://www.ankr.com/',
			category: ['Blockchain']
		},
		{
			name: 'StaFi',
			logo: staticImages.stafiLogo,
			website: 'https://www.stafi.io/',
			category: ['DeFi']
		},
		{
			name: 'Mellow Protocol',
			logo: staticImages.mellowLogo,
			website: 'https://mellow.finance/',
			category: ['DeFi']
		},
		{
			name: 'Mida swap',
			logo: staticImages.midaSwapLogo,
			website: 'https://www.midaswap.org/',
			category: ['DEX']
		},
		{
			name: 'Cradles',
			logo: staticImages.cradlesLogo,
			website: 'https://www.cradles.io/',
			category: ['Gaming']
		},
		{
			name: 'Bonfida',
			logo: staticImages.bonfidaLogo,
			website: 'https://www.sns.id/',
			category: ['Gateways']
		},
		{
			name: 'SPACE ID',
			logo: staticImages.spaceIdLogo,
			website: 'https://space.id/',
			category: ['Gateways']
		},
		{
			name: 'ETH.LIMO',
			logo: staticImages.limoLogo,
			website: 'https://eth.limo/',
			category: ['Gateways']
		},
		{
			name: 'Aspecta',
			logo: staticImages.aspectaLogo,
			website: 'https://aspecta.id/',
			category: ['Identity']
		},
		{
			name: 'Flashbots',
			logo: staticImages.FlashBotsLogo,
			website: 'https://www.flashbots.net/',
			category: ['MEV']
		},
		{
			name: 'Gearbox',
			logo: staticImages.gearBoxLogo,
			website: 'https://gearbox.fi/',
			category: ['MEV', 'DeFi']
		},
		{
			name: 'Go Sleep Pro',
			logo: staticImages.goSleepLogo,
			website: 'https://gosleep.pro/',
			category: ['NFT']
		},
		{
			name: 'Dego',
			logo: staticImages.degoLogo,
			website: 'https://dego.finance/home',
			category: ['NFT', 'DeFi']
		},
		{
			name: 'Decimal',
			logo: staticImages.decimalLogo,
			website: 'https://decimal.at/',
			category: ['Oracles']
		},
		{
			name: 'Echolink',
			logo: staticImages.echolinkLogo,
			website: 'https://echolink.network/',
			category: ['Oracles']
		},
		{
			name: 'Cambrian',
			logo: undefined,
			website: '#',
			category: ['Restaking']
		},
		{
			name: '3DNS',
			logo: staticImages.dnsLogo,
			website: 'https://3dns.box/',
			category: ['Tokenized Domains']
		},
		{
			name: 'Brightly Stake',
			logo: staticImages.brightlyStakeLogo,
			website: 'https://brightlystake.com/',
			category: ['Validators']
		},
		{
			name: 'Chorus One',
			logo: staticImages.chorusOneLogo,
			website: 'https://chorus.one/',
			category: ['Validators']
		},
		{
			name: 'Hashkey Cloud',
			logo: staticImages.hashkeyCloudLogo,
			website: 'https://www.hashkey.cloud/',
			category: ['Validators']
		},
		{
			name: 'Infstones',
			logo: staticImages.infstones,
			website: 'https://infstones.com/',
			category: ['Validators']
		},
		{
			name: 'McGill University',
			logo: staticImages.mcGrillUni,
			website: 'https://www.mcgill.ca',
			category: ['Validators']
		},
		{
			name: 'Nodeasy',
			logo: staticImages.nodeasyLogo,
			website: 'https://www.nodeasy.com/',
			category: ['Validators']
		},
		{
			name: 'P2P',
			logo: staticImages.p2pLogo,
			website: 'https://p2p.org/',
			category: ['Validators']
		},
		{
			name: 'Shanghai Jiao Tong University',
			logo: staticImages.sjtUniversityLogo,
			website: 'https://en.sjtu.edu.cn/',
			category: ['Validators']
		},
		{
			name: 'Staking 4 All',
			logo: staticImages.staking4allLogo,
			website: 'https://www.staking4all.org/',
			category: ['Validators']
		},
		{
			name: 'Avail',
			logo: staticImages.availLogo,
			website: 'https://avail.global/',
			category: ['Wallets']
		},
		{
			name: 'zkBOB',
			logo: staticImages.zkbobLogo,
			website: 'https://www.zkbob.com/',
			category: ['Wallets']
		},
		{
			name: 'Kontos',
			logo: staticImages.KontosLogo,
			website: 'https://www.kontos.io/',
			category: ['Zero Knowledge']
		},
		{
			name: 'NuLink',
			logo: staticImages.NuLinkLogo,
			website: 'https://www.nulink.org',
			category: ['Zero Knowledge']
		},
		{
			name: 'Lighthouse',
			logo: staticImages.lighthouseLogo,
			website: 'https://www.lighthouse.storage',
			category: ['Storage']
		}
	];

	const filters = [
		'View All',
		'AI',
		'Bitcoin L2',
		'Blockchain',
		'DeFi',
		'DEX',
		'Gaming',
		'Gateways',
		'Identity',
		'MEV',
		'NFT',
		'Oracles',
		'Restaking',
		'Storage',
		'Tokenized Domains',
		'Validators',
		'Wallets',
		'Zero Knowledge'
	] as const;

	function getFilteredPartners(partnerSearchString: string, partnerFilterString: FilterCategory) {
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
	$: sortedPartners = filteredPartners.sort((a, b) => a.name.localeCompare(b.name));
</script>

<div class=" flex w-full flex-col justify-start">
	<PageTitle title="Explore The Ecosystem" />
	<SearchBar
		bind:input={searchInput}
		placeholder="Search for the partner you are looking for..."
		styleClass="w-full"
	/>

	<div class="my-4 flex w-full flex-wrap gap-2 overflow-x-hidden">
		{#each filters as filter}
			{#if selectedFilter === filter}
				<Button
					onclick={() => {
						selectedFilter = filter;
					}}
					variant="filled"
					size="small"
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
					size="small"
				>
					{filter}
				</Button>
			{/if}
		{/each}
	</div>

	<div class="grid grid-cols-5 gap-6 2xl:grid-cols-7">
		{#each sortedPartners as partner}
			<a href={partner.website} class="group w-full" target="_blank">
				<div
					class={cn(
						'flex h-[210px] w-full items-center justify-center rounded-xl border border-[#D9DADE] bg-white px-5 transition-all duration-300 ease-in-out group-hover:border-primary'
					)}
				>
					{#if partner.logo}
						<img
							src={partner.logo}
							class="transition-transform duration-300 ease-in-out group-hover:scale-110"
							alt={partner.name + ' Logo'}
						/>
					{:else}
						<p class="px-5 text-center text-3xl font-semibold text-black no-underline">
							{partner.name}
						</p>
					{/if}
				</div>
			</a>
		{/each}
	</div>
</div>
