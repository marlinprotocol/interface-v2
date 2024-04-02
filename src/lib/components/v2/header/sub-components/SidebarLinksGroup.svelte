<script lang="ts">
	import { staticImages } from '$lib/components/images/staticImages';
	import type { SidebarLinks } from '$lib/types/headerTypes';
	import { ROUTES } from '$lib/utils/constants/v2/urls';

	export let activeLink: string = '';
	export let isNavOpen: Boolean = true;

	let links: SidebarLinks[] = [];

	$: links = [
		{
			label: 'Dashboard',
			href: ROUTES.HUB_DASHBOARD_URL,
			icon: activeLink.includes(ROUTES.HUB_DASHBOARD_URL)
				? staticImages.dashboardIconBlue
				: staticImages.dashboardIcon
		},
		{
			label: 'Bridge',
			icon: activeLink.includes(ROUTES.BRIDGE_URL)
				? staticImages.bridgeIconBlue
				: staticImages.bridgeIcon,
			href: ROUTES.BRIDGE_URL,
			children: [
				{
					preFixLabel: 'Pond',
					postFixLabel: 'MPond',
					href: ROUTES.POND_HISTORY_PAGE_URL,
					icon: activeLink.includes(ROUTES.POND_HISTORY_PAGE_URL)
						? staticImages.dataTransferIconBlue
						: staticImages.dataTransferIcon
				},
				{
					preFixLabel: 'MPond',
					postFixLabel: 'Pond',
					href: ROUTES.MPOND_HISTORY_PAGE_URL,
					icon: activeLink.includes(ROUTES.MPOND_HISTORY_PAGE_URL)
						? staticImages.dataTransferIconBlue
						: staticImages.dataTransferIcon
				},
				{
					preFixLabel: 'Ethereum',
					postFixLabel: 'Arbitrum',
					href: ROUTES.ETH_HISTORY_PAGE_URL,
					icon: activeLink.includes(ROUTES.ETH_HISTORY_PAGE_URL)
						? staticImages.dataTransferIconBlue
						: staticImages.dataTransferIcon
				},
				{ preFixLabel: 'Learn', href: ROUTES.BRIDGE_LEARN_MORE_DOC_LINK, openInNewTab: true }
			]
		},
		{
			label: 'Governance',
			href: ROUTES.GOVERNANCE_URL,
			icon: activeLink.includes(ROUTES.GOVERNANCE_URL)
				? staticImages.governanceIconBlue
				: staticImages.governanceIcon
		},
		{
			label: 'Relay',
			icon: activeLink.includes(ROUTES.RELAY_URL)
				? staticImages.relayIconBlue
				: staticImages.relayIcon,
			href: ROUTES.RELAY_URL,
			children: [
				{ preFixLabel: 'Clusters', href: ROUTES.RELAY_CLUSTERS_URL },
				{ preFixLabel: 'Registration', href: ROUTES.RELAY_REGISTRATION_URL },
				{ preFixLabel: 'Delegations', href: ROUTES.RELAY_DELEGATION_URL },
				{ preFixLabel: 'Receivers', href: ROUTES.RELAY_RECEIVER_URL }
			]
		},
		{
			label: 'Oyster',
			icon: activeLink.includes(ROUTES.OYSTER_URL)
				? staticImages.oysterIconBlue
				: staticImages.oysterIcon,
			href: ROUTES.OYSTER_URL,
			children: [
				{ preFixLabel: 'Marketplace', href: ROUTES.OYSTER_MARKETPLACE_URL },
				{ preFixLabel: 'Operator', href: ROUTES.OYSTER_OPERATOR_URL },
				{ preFixLabel: 'Inventory', href: ROUTES.OYSTER_INVENTORY_URL },
				{ preFixLabel: 'Auditors', href: ROUTES.OYSTER_AUDITORS_URL }
			]
		},
		{
			label: 'Kalypso',
			icon: activeLink.includes(ROUTES.KALYPSO_URL)
				? staticImages.kalypsoIconBlue
				: staticImages.kalypsoIcon,
			href: ROUTES.KALYPSO_URL,
			children: [
				{ preFixLabel: 'Kalypso 1', href: ROUTES.KALYPSO_LINK_1_URL },
				{ preFixLabel: 'Kalypso 2', href: ROUTES.KALYPSO_LINK_2_URL }
			]
		},
		{
			label: 'Ecosystem',
			href: ROUTES.ECOSYSTEM_URL,
			icon: activeLink.includes(ROUTES.ECOSYSTEM_URL)
				? staticImages.ecosystemIconBlue
				: staticImages.ecosystemIcon
		},
		{
			label: 'FAQs',
			href: ROUTES.FAQS_URL,
			icon: activeLink.includes(ROUTES.FAQS_URL) ? staticImages.faqsIconBlue : staticImages.faqsIcon
		}
	];
</script>

<div class="overflow-y-auto overflow-x-hidden px-7">
	<ul class="menu p-0">
		{#each links as { icon, label, children, href }}
			{#if children}
				<li>
					<details>
						<summary
							class={`px-[14px] py-4 after:text-[#26272c] hover:bg-transparent focus:bg-transparent active:!bg-transparent  ${
								activeLink.includes(href) && 'after:text-[#2DB8E3]'
							} ${!isNavOpen && 'after:hidden'}
							${!isNavOpen && activeLink.includes(href) && 'bg-[#FCFCFC]'}`}
						>
							<div class="flex items-center gap-3">
								<img src={icon} alt={icon} />
								{#if isNavOpen}
									<p
										class={`font-poppins text-base font-medium text-[#26272c]  ${
											activeLink.includes(href) && 'text-[#2DB8E3]'
										}`}
									>
										{label}
									</p>
								{/if}
							</div>
						</summary>
						<ul class={`ml-[25px] px-3 ${isNavOpen ? 'block' : 'hidden'}`}>
							{#each children as subLink}
								<li>
									<a
										href={subLink.href}
										target={subLink.openInNewTab ? '_blank' : ''}
										class="p-0 hover:bg-transparent focus:!bg-transparent active:!bg-transparent active:!text-[#26272c]"
									>
										<div
											class={`relative flex w-fit gap-1 px-4 py-2 font-poppins  text-sm ${
												activeLink.includes(subLink.href)
													? ' font-medium !text-[#3840C7] after:absolute after:-left-3 after:top-0 after:h-full after:w-[2px] after:bg-[#3840C7]'
													: 'text-[#26272c]'
											}`}
										>
											{subLink.preFixLabel}
											{#if subLink.icon}
												<img
													src={subLink.icon}
													alt={subLink.icon}
													class="min-w-[18px] max-w-[18px]"
												/>
											{/if}
											{#if subLink.postFixLabel}
												{subLink.postFixLabel}
											{/if}
										</div>
									</a>
								</li>
							{/each}
						</ul>
					</details>
				</li>{:else}
				<a {href}>
					<div class="flex cursor-pointer items-center gap-3 px-[14px] py-4">
						<img src={icon} alt={icon} />
						{#if isNavOpen}
							<p class="font-poppins text-base font-medium text-[#26272c]">{label}</p>
						{/if}
					</div>
				</a>
			{/if}
		{/each}
	</ul>
</div>
