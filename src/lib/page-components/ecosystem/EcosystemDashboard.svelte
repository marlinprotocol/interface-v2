<script lang="ts">
	import { staticImages } from '$lib/components/images/staticImages';
	import SearchBar from '$lib/components/search/SearchBar.svelte';
	import PageTitle from '$lib/components/texts/PageTitle.svelte';
	import { cn } from '$lib/utils/helpers/commonHelper';
	import Button from '$lib/atoms/buttons/Button.svelte';
	import { isDarkMode } from '$lib/data-stores/themeStore';

	type filterDataModal = Array<{
		name: string;
		logo?: string;
		darkLogo?: string;
		website: string;
		category: FilterCategory[];
	}>;

	type FilterCategory = (typeof filters)[number];

	let searchInput = '';
	let selectedFilter: FilterCategory = 'View All';
	let filteredPartners: filterDataModal;

	const partners: filterDataModal = [
		// {
		// 	name: 'Myri',
		// 	logo: undefined,
		// 	website: '#',
		// 	category: ['AI']
		// },
		{
			name: 'Sigmoid',
			logo: staticImages.sigmoIdLogo,
			darkLogo: staticImages.sigmoIdLogoDark,
			website: 'https://www.sigmoid.wtf/',
			category: ['AI']
		},
		{
			name: 'Accseal',
			logo: staticImages.accsealLogo,
			darkLogo: staticImages.accsealLogoDark,
			website: 'https://www.accseal.com/',
			category: ['Zero Knowledge', 'Bitcoin L2', 'AI']
		},
		// {
		// 	name: 'Operator.io',
		// 	logo: staticImages.operatorLogo,
		// 	website: 'https://operator.io/',
		// 	category: ['AI']
		// },
		{
			name: 'PublicAI',
			logo: staticImages.publicAiLogo,
			darkLogo: staticImages.publicAiLogoDark,
			website: 'https://publicai.io/',
			category: ['AI']
		},
		{
			name: 'SIDE',
			logo: staticImages.sideLogo,
			darkLogo: staticImages.sideLogoDark,
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
			darkLogo: staticImages.PolygonFullLogoDark,
			website: 'https://polygon.technology/',
			category: ['Blockchain']
		},
		{
			name: 'Arbitrum',
			logo: staticImages.ArbitrumFullLogo,
			darkLogo: staticImages.ArbitrumFullLogoDark,
			website: 'https://arbitrum.io/',
			category: ['Blockchain']
		},
		{
			name: 'Injective',
			logo: staticImages.injectiveLogo,
			darkLogo: staticImages.injectiveLogoDark,
			website: 'https://injective.com/',
			category: ['Blockchain']
		},
		{
			name: 'Ankr',
			logo: staticImages.ankrLogo,
			darkLogo: staticImages.ankrLogoDark,
			website: 'https://www.ankr.com/',
			category: ['Blockchain']
		},
		{
			name: 'StaFi',
			logo: staticImages.stafiLogo,
			darkLogo: staticImages.stafiLogo,
			website: 'https://www.stafi.io/',
			category: ['DeFi']
		},
		{
			name: 'Mellow Protocol',
			logo: staticImages.mellowLogo,
			darkLogo: staticImages.mellowLogoDark,
			website: 'https://mellow.finance/',
			category: ['DeFi']
		},
		{
			name: 'Mida swap',
			logo: staticImages.midaSwapLogo,
			darkLogo: staticImages.midaSwapLogoDark,
			website: 'https://www.midaswap.org/',
			category: ['DEX']
		},
		{
			name: 'Cradles',
			logo: staticImages.cradlesLogo,
			darkLogo: staticImages.cradlesLogoDark,
			website: 'https://www.cradles.io/',
			category: ['Gaming']
		},
		{
			name: 'Bonfida',
			logo: staticImages.bonfidaLogo,
			darkLogo: staticImages.bonfidaLogoDark,
			website: 'https://www.sns.id/',
			category: ['Gateways']
		},
		{
			name: 'SPACE ID',
			logo: staticImages.spaceIdLogo,
			darkLogo: staticImages.spaceIdLogoDark,
			website: 'https://space.id/',
			category: ['Gateways']
		},
		// {
		// 	name: 'ETH.LIMO',
		// 	logo: staticImages.limoLogo,
		// 	website: 'https://eth.limo/',
		// 	category: ['Gateways']
		// },
		{
			name: 'Aspecta',
			logo: staticImages.aspectaLogo,
			darkLogo: staticImages.aspectaLogoDark,
			website: 'https://aspecta.id/',
			category: ['Identity']
		},
		{
			name: 'Flashbots',
			logo: staticImages.FlashBotsLogo,
			darkLogo: staticImages.FlashBotsLogoDark,
			website: 'https://www.flashbots.net/',
			category: ['MEV']
		},
		{
			name: 'Gearbox',
			logo: staticImages.gearBoxLogo,
			darkLogo: staticImages.gearBoxLogoDark,
			website: 'https://gearbox.fi/',
			category: ['MEV', 'DeFi']
		},
		{
			name: 'Go Sleep Pro',
			logo: staticImages.goSleepLogo,
			darkLogo: staticImages.goSleepLogoDark,
			website: 'https://gosleep.pro/',
			category: ['NFT']
		},
		{
			name: 'Dego',
			logo: staticImages.degoLogo,
			darkLogo: staticImages.degoLogo,
			website: 'https://dego.finance/home',
			category: ['NFT', 'DeFi']
		},
		{
			name: 'Decimal',
			logo: staticImages.decimalLogo,
			darkLogo: staticImages.decimalLogoDark,
			website: 'https://decimal.at/',
			category: ['Oracles']
		},
		{
			name: 'Echolink',
			logo: staticImages.echolinkLogo,
			darkLogo: staticImages.echolinkLogoDark,
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
			darkLogo: staticImages.dnsLogoDark,
			website: 'https://3dns.box/',
			category: ['Tokenized Domains']
		},
		{
			name: 'Brightly Stake',
			logo: staticImages.brightlyStakeLogo,
			darkLogo: staticImages.brightlyStakeLogoDark,
			website: 'https://brightlystake.com/',
			category: ['Validators']
		},
		{
			name: 'Chorus One',
			logo: staticImages.chorusOneLogo,
			darkLogo: staticImages.chorusOneLogoDark,
			website: 'https://chorus.one/',
			category: ['Validators']
		},
		{
			name: 'Hashkey Cloud',
			logo: staticImages.hashkeyCloudLogo,
			darkLogo: staticImages.hashkeyCloudLogoDark,
			website: 'https://www.hashkey.cloud/',
			category: ['Validators']
		},
		{
			name: 'Infstones',
			logo: staticImages.infstones,
			darkLogo: staticImages.infstonesDark,
			website: 'https://infstones.com/',
			category: ['Validators']
		},
		{
			name: 'McGill University',
			logo: staticImages.mcGrillUni,
			darkLogo: staticImages.mcGrillUni,
			website: 'https://www.mcgill.ca',
			category: ['Validators']
		},
		{
			name: 'Nodeasy',
			logo: staticImages.nodeasyLogo,
			darkLogo: staticImages.nodeasyLogoDark,
			website: 'https://www.nodeasy.com/',
			category: ['Validators']
		},
		{
			name: 'P2P',
			logo: staticImages.p2pLogo,
			darkLogo: staticImages.p2pLogoDark,
			website: 'https://p2p.org/',
			category: ['Validators']
		},
		{
			name: 'Shanghai Jiao Tong University',
			logo: staticImages.sjtUniversityLogo,
			darkLogo: staticImages.sjtUniversityLogoDark,
			website: 'https://en.sjtu.edu.cn/',
			category: ['Validators']
		},
		{
			name: 'Staking 4 All',
			logo: staticImages.staking4allLogo,
			darkLogo: staticImages.staking4allLogoDark,
			website: 'https://www.staking4all.org/',
			category: ['Validators']
		},
		{
			name: 'Avail',
			logo: staticImages.availLogo,
			darkLogo: staticImages.availLogoDark,
			website: 'https://avail.global/',
			category: ['Wallets']
		},
		{
			name: 'zkBOB',
			logo: staticImages.zkbobLogo,
			darkLogo: staticImages.zkbobLogoDark,
			website: 'https://www.zkbob.com/',
			category: ['Wallets']
		},
		{
			name: 'Kontos',
			logo: staticImages.KontosLogo,
			darkLogo: staticImages.KontosLogoDark,
			website: 'https://www.kontos.io/',
			category: ['Zero Knowledge']
		},
		{
			name: 'NuLink',
			logo: staticImages.NuLinkLogo,
			darkLogo: staticImages.NuLinkLogoDark,
			website: 'https://www.nulink.org',
			category: ['Zero Knowledge']
		},
		{
			name: 'Lighthouse',
			logo: staticImages.lighthouseLogo,
			darkLogo: staticImages.lighthouseLogoDark,
			website: 'https://www.lighthouse.storage',
			category: ['Storage']
		},
		{
			name: 'Filecoin Foundation',
			logo: staticImages.filLogo,
			darkLogo: staticImages.filLogoDark,
			website: 'https://fil.org',
			category: ['Storage']
		},
		{
			name: 'Talus',
			logo: staticImages.talusLogo,
			darkLogo: staticImages.talusLogoDark,
			website: 'https://talus.network',
			category: ['AI']
		},
		{
			name: 'Assisterr',
			logo: staticImages.assisterrLogo,
			darkLogo: staticImages.assisterrLogo,
			website: 'https://www.assisterr.ai/',
			category: ['AI']
		},
		{
			name: 'Heurist',
			logo: staticImages.heuristLogo,
			darkLogo: staticImages.heuristLogoDark,
			website: 'https://www.heurist.ai/',
			category: ['AI']
		},
		{
			name: 'Hyle',
			logo: staticImages.hyleLogo,
			darkLogo: staticImages.hyleLogoDark,
			website: 'https://www.hyle.eu/',
			category: ['Zero Knowledge']
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
	$: filterToHighlight = sortedPartners.length === 1 ? sortedPartners[0].category : [];
</script>

<div class=" flex w-full flex-col justify-start">
	<PageTitle title="Explore the ecosystem" />
	<SearchBar bind:input={searchInput} placeholder="Search in here" styleClass="w-full" />

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
					styleClass={cn('font-normal', {
						'border-[#2db8e3] text-[#2DB8E3]': filterToHighlight.includes(filter)
					})}
					size="small"
				>
					{filter}
				</Button>
			{/if}
		{/each}
	</div>

	<div class="grid grid-cols-5 gap-4 2xl:grid-cols-7" id="svg-group">
		{#each sortedPartners as partner}
			<a href={partner.website} class="group w-full" target="_blank">
				<div
					class={cn(
						'flex h-[210px] w-full items-center justify-center rounded-xl border border-grey-100 bg-base-100 px-5 transition-all duration-300 ease-in-out group-hover:border-primary'
					)}
				>
					{#if partner.logo}
						<img
							src={$isDarkMode ? partner.darkLogo : partner.logo}
							class="svg-fill-white transition-transform duration-300 ease-in-out group-hover:scale-110"
							alt={partner.name + ' Logo'}
						/>
					{:else}
						<p class="icon-invert px-5 text-center text-3xl font-semibold text-black no-underline">
							{partner.name}
						</p>
					{/if}
				</div>
			</a>
		{/each}
	</div>
</div>
