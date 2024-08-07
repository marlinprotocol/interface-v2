<script lang="ts">
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import ExternalLinkConfirmationModal from '$lib/components/modals/ExternalLinkConfirmationModal.svelte';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';
	import { EXTERNAL_LINKS, ROUTES } from '$lib/utils/constants/urls';
	import { cn } from '$lib/utils/helpers/commonHelper';
	import { shortenText } from '$lib/utils/helpers/conversionHelper';

	const infoStats = [
		{
			title: 'Regions',
			value: '25+',
			img: staticImages.regions,
			alt: 'Regions Icon'
		},
		{
			title: 'Instances',
			value: '140+',
			img: staticImages.instances,
			alt: 'Instances Icon'
		},
		{
			title: 'Chains',
			value: '4',
			img: staticImages.chains,
			alt: 'Chains Icon'
		}
	];

	const ctaButtons = [
		{ label: 'Use Oyster', href: ROUTES.OYSTER_MARKETPLACE_URL, openInANewTab: false },
		{ label: 'Become an operator', href: ROUTES.OYSTER_OPERATOR_URL, openInANewTab: false },
		{ label: 'Manage', href: ROUTES.OYSTER_INVENTORY_URL, openInANewTab: false },
		{ label: 'Documentation', href: EXTERNAL_LINKS.MARLIN_DOCS_LINK, openInANewTab: true }
	];

	const deployAndRunLinks = [
		{
			label: 'Decentralize your Frontends',
			href: 'https://blog.marlin.org/deploying-decentralized-frontends-with-oyster-a-step-by-step-guide',
			img: staticImages.frontends,
			alt: 'Frontends',
			openInANewTab: true
		},
		{
			label: 'Backend Servers for heavy lifting',
			href: 'https://docs.marlin.org/category/deploy-a-nodejs-server',
			img: staticImages.backendServer,
			alt: 'Backend Server',
			openInANewTab: true
		},
		{
			label: 'LLMs for decentralized ML',
			href: 'https://docs.marlin.org/category/deploy-llama2',
			img: staticImages.llms,
			alt: 'LLMs',
			openInANewTab: true
		},
		{
			label: 'View More ->',
			href: 'https://docs.marlin.org/user-guides/',
			isViewMore: true,
			openInANewTab: true
		}
	];

	const partnerLinks = [
		{
			label: 'Get an on-chain domain',
			href: 'https://spindl.link/5rx222',
			img: staticImages.dnsLogo,
			alt: '3DNS Logo',
			openInPopup: true,
			title: '3DNS'
		},
		{
			label: 'Link your Solana names to IPFS',
			href: 'https://www.bonfida.org/',
			img: staticImages.bonfidaLogo,
			alt: 'Bonfida Logo',
			openInPopup: true,
			title: 'Bonfida'
		},
		{
			label: 'Link IPFS URLs to Arb and Manta domains',
			href: 'https://space.id/',
			img: staticImages.spaceIdLogo,
			alt: 'Space ID Logo',
			openInPopup: true,
			title: 'Space ID'
		},
		{
			label: 'View More ->',
			href: ROUTES.ECOSYSTEM_URL,
			isViewMore: true
		}
	];
</script>

<div class="w-full">
	<h2 class="text-3xl font-medium leading-[-2px] text-grey-800">
		Hello, {$connected ? shortenText($walletStore.address, 6, 6) : 'Fishy'}
	</h2>
	<p class="mt-4 text-lg font-light leading-6 text-grey-500">
		Oyster is a sub-network of Marlin that specializes in offering TEE-based coprocessors. Servers
		provisioned using smart contract calls host AI/ML models, gateways, frontends, MEV or automation
		bots, or backends for arbitrary computations using external APIs with baked-in auto-scaling and
		fault tolerance.
	</p>
	<p class="mt-3 text-lg font-light">
		Pay in stable coin and manage infra using smart contract calls via the Oyster UI.
	</p>
	<div class="mt-4 flex items-center justify-between gap-4">
		{#each infoStats as infoStat}
			<div
				class="flex h-[100px] w-full items-center gap-4 rounded-2xl border border-grey-100 bg-transparent px-3 py-[22.5px]"
			>
				<div class="flex h-16 w-16 items-center justify-center rounded-full bg-secondary-content">
					<img src={infoStat.img} alt={infoStat.alt} class="icon-invert" />
				</div>
				<div class="flex flex-col justify-between">
					<span class="text-lg font-light leading-[21.6px]"> {infoStat.title} </span>
					<span class="text-[28px] font-medium leading-[33.6px]"> {infoStat.value}</span>
				</div>
			</div>
		{/each}
	</div>
	<div class="mt-4 flex gap-2">
		{#each ctaButtons as ctaButton}
			<a
				class="text-md flex h-16 w-full items-center justify-center rounded-full border border-grey-100 bg-secondary-content font-normal text-grey-800 transition-colors hover:border-primary hover:text-primary"
				href={ctaButton.href}
				target={ctaButton.openInANewTab ? '_blank' : ''}>{ctaButton.label}</a
			>
		{/each}
	</div>
	<div class="mt-11 flex w-full gap-11">
		<div class="flex-1">
			<div class="text-xl font-medium">Deploy And Run</div>
			<div class="mt-4 grid grid-cols-2 gap-2">
				{#each deployAndRunLinks as deployAndRunLink}
					<a
						href={deployAndRunLink.href}
						target={deployAndRunLink.openInANewTab ? '_blank' : ''}
						class="group relative flex h-48 w-full items-center justify-center overflow-hidden rounded-2xl border border-grey-100 bg-secondary-content px-8"
					>
						<div
							class="pointer-events-none absolute right-0 top-0 flex h-10 w-10 items-center justify-center rounded-bl-2xl bg-grey-400 transition-all duration-300 ease-out group-hover:h-full group-hover:w-full"
						>
							<img
								class="icon-invert absolute right-[10px] top-[10px] transition-transform duration-300 ease-out"
								src={staticImages.arrowUpRight}
								alt="Arrow Icon"
							/>
						</div>
						<div class="z-[1] flex h-[136px] w-full flex-col items-start justify-between gap-4">
							{#if deployAndRunLink.img}
								<div
									class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary"
								>
									<img src={deployAndRunLink.img} alt={deployAndRunLink.alt} />
								</div>
							{/if}
							<span
								class={cn('text-lg font-normal', {
									'm-auto': deployAndRunLink.isViewMore
								})}>{deployAndRunLink.label}</span
							>
						</div>
					</a>
				{/each}
			</div>
		</div>
		<div class="flex-1">
			<div class="text-xl font-medium">Partners</div>
			<div class="mt-4 grid grid-cols-2 gap-2">
				{#each partnerLinks as partnerLink}
					{#if partnerLink.openInPopup}
						<ModalButton
							modalFor="external-link-confirmation-{partnerLink.label}"
							variant="text"
							styleClass="p-0 h-48 bg-secondary-content rounded-2xl overflow-hidden  hover:border hover:border-grey-100 border border-grey-100 relative group px-8 flex justify-start"
						>
							<div
								class="pointer-events-none absolute right-0 top-0 flex h-10 w-10 items-center justify-center rounded-bl-2xl bg-grey-400 transition-all duration-300 ease-out group-hover:h-full group-hover:w-full"
							>
								<img
									class="icon-invert absolute right-[10px] top-[10px] transition-transform duration-300 ease-out"
									src={staticImages.arrowUpRight}
									alt="Arrow Icon"
								/>
							</div>
							<div
								class="z-[1] flex h-[136px] w-full flex-col items-start justify-between gap-4 text-left"
							>
								{#if partnerLink.img}
									<div class="flex w-32 shrink-0 items-start">
										<img src={partnerLink.img} alt={partnerLink.alt} />
									</div>
								{/if}
								<span
									class={cn('text-lg font-normal', {
										'mx-auto': partnerLink.isViewMore
									})}>{partnerLink.label}</span
								>
							</div>
						</ModalButton>
						<ExternalLinkConfirmationModal
							modalFor={`external-link-confirmation-${partnerLink.label}`}
							href={partnerLink.href}
							label={partnerLink.title}
						/>
					{:else}
						<a
							href={partnerLink.href}
							class="group relative flex h-48 w-full items-center justify-center overflow-hidden rounded-2xl border border-grey-100 bg-secondary-content px-8"
						>
							<div
								class="pointer-events-none absolute right-0 top-0 flex h-10 w-10 items-center justify-center rounded-bl-2xl bg-grey-400 transition-all duration-300 ease-out group-hover:h-full group-hover:w-full"
							>
								<img
									class="icon-invert absolute right-[10px] top-[10px] transition-transform duration-300 ease-out"
									src={staticImages.arrowUpRight}
									alt="Arrow Icon"
								/>
							</div>
							<div class="z-[1] flex w-full flex-col items-start justify-center gap-4">
								{#if partnerLink.img}
									<div class="flex w-32 shrink-0 items-start">
										<img src={partnerLink.img} alt={partnerLink.alt} />
									</div>
								{/if}
								<span
									class={cn('text-lg font-normal', {
										'mx-auto': partnerLink.isViewMore
									})}>{partnerLink.label}</span
								>
							</div>
						</a>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</div>
