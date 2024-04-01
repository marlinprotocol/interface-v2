<script lang="ts">
	import HeaderConnectWallet from '$lib/components/headerv2/sub-components/HeaderConnectWallet.svelte';
	import HeaderLogo from '$lib/components/headerv2/sub-components/HeaderLogo.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import {
		BRIDGE_LEARN_MORE_DOC_LINK,
		BRIDGE_URL,
		DASHBOARD_URL,
		ECOSYSTEM_URL,
		ETH_HISTORY_PAGE_URL,
		FAQS_URL,
		GOVERNANCE_URL,
		KALYPSO_LINK_1_URL,
		KALYPSO_LINK_2_URL,
		KALYPSO_URL,
		MPOND_HISTORY_PAGE_URL,
		OYSTER_AUDITORS_URL,
		OYSTER_INVENTORY_URL,
		OYSTER_MARKETPLACE_URL,
		OYSTER_OPERATOR_URL,
		OYSTER_URL,
		POND_HISTORY_PAGE_URL,
		RELAY_CLUSTERS_URL,
		RELAY_DELEGATION_URL,
		RELAY_RECEIVER_URL,
		RELAY_REGISTRATION_URL,
		RELAY_URL
	} from '$lib/utils/constants/v2/urls';
	import { page } from '$app/stores';

	let isNavOpen: Boolean = true;

	const toggleNavbar = () => {
		isNavOpen = !isNavOpen;
	};
	let links: any[] = [
		{
			label: 'Dashboard',
			href: DASHBOARD_URL,
			icon: $page.url.pathname.includes(DASHBOARD_URL)
				? staticImages.dashboardIconBlue
				: staticImages.dashboardIcon
		},
		{
			label: 'Bridge',
			icon: $page.url.pathname.includes(BRIDGE_URL)
				? staticImages.bridgeIconBlue
				: staticImages.bridgeIcon,
			href: BRIDGE_URL,
			children: [
				{
					preFixLabel: 'Pond',
					postFixLabel: 'MPond',
					href: POND_HISTORY_PAGE_URL,
					icon: $page.url.pathname.includes(POND_HISTORY_PAGE_URL)
						? staticImages.dataTransferIconBlue
						: staticImages.dataTransferIcon
				},
				{
					preFixLabel: 'MPond',
					postFixLabel: 'Pond',
					href: MPOND_HISTORY_PAGE_URL,
					icon: $page.url.pathname.includes(MPOND_HISTORY_PAGE_URL)
						? staticImages.dataTransferIconBlue
						: staticImages.dataTransferIcon
				},
				{
					preFixLabel: 'Ethereum',
					postFixLabel: 'Arbitrum',
					href: ETH_HISTORY_PAGE_URL,
					icon: $page.url.pathname.includes(ETH_HISTORY_PAGE_URL)
						? staticImages.dataTransferIconBlue
						: staticImages.dataTransferIcon
				},
				{ preFixLabel: 'Learn', href: BRIDGE_LEARN_MORE_DOC_LINK }
			]
		},
		{
			label: 'Governance',
			href: GOVERNANCE_URL,
			icon: $page.url.pathname.includes(GOVERNANCE_URL)
				? staticImages.governanceIconBlue
				: staticImages.governanceIcon
		},
		{
			label: 'Relay',
			icon: $page.url.pathname.includes(RELAY_URL)
				? staticImages.relayIconBlue
				: staticImages.relayIcon,
			href: RELAY_URL,
			children: [
				{ preFixLabel: 'Clusters', href: RELAY_CLUSTERS_URL },
				{ preFixLabel: 'Registration', href: RELAY_REGISTRATION_URL },
				{ preFixLabel: 'Delegations', href: RELAY_DELEGATION_URL },
				{ preFixLabel: 'Receivers', href: RELAY_RECEIVER_URL }
			]
		},
		{
			label: 'Oyster',
			icon: $page.url.pathname.includes(OYSTER_URL)
				? staticImages.oysterIconBlue
				: staticImages.oysterIcon,
			href: OYSTER_URL,
			children: [
				{ preFixLabel: 'Marketplace', href: OYSTER_MARKETPLACE_URL },
				{ preFixLabel: 'Operator', href: OYSTER_OPERATOR_URL },
				{ preFixLabel: 'Inventory', href: OYSTER_INVENTORY_URL },
				{ preFixLabel: 'Auditors', href: OYSTER_AUDITORS_URL }
			]
		},
		{
			label: 'Kalypso',
			icon: $page.url.pathname.includes(KALYPSO_URL)
				? staticImages.kalypsoIconBlue
				: staticImages.kalypsoIcon,
			href: KALYPSO_URL,
			children: [
				{ preFixLabel: 'Kalypso 1', href: KALYPSO_LINK_1_URL },
				{ preFixLabel: 'Kalypso 2', href: KALYPSO_LINK_2_URL }
			]
		},
		{
			label: 'Ecosystem',
			href: ECOSYSTEM_URL,
			icon: $page.url.pathname.includes(ECOSYSTEM_URL)
				? staticImages.ecosystemIconBlue
				: staticImages.ecosystemIcon
		},
		{
			label: 'FAQs',
			href: FAQS_URL,
			icon: $page.url.pathname.includes(FAQS_URL)
				? staticImages.faqsIconBlue
				: staticImages.faqsIcon
		}
	];
</script>

<div>
	<div
		class={`nav-bg fixed left-0 z-10 h-screen ${
			isNavOpen ? 'w-72' : 'w-28'
		} transition-all duration-300 ease-out`}
	>
		<div class="relative h-full w-full">
			<div class="mb-9 mt-8 flex items-center justify-center gap-2">
				<HeaderLogo />
				<div class="rounded-[5px] p-[7px]">Hub</div>
			</div>
			<div class="h-[600px] overflow-auto px-7">
				<ul class="menu p-0">
					{#each links as { icon, label, children, href }}
						{#if children}
							<li>
								<details>
									<summary
										class={`px-[14px] py-4 after:text-[#26272c] hover:bg-transparent focus:bg-transparent active:!bg-transparent  ${
											$page.url.pathname.includes(href) && 'after:text-[#2DB8E3]'
										} ${!isNavOpen && 'after:hidden'}
                                        ${
																					!isNavOpen &&
																					$page.url.pathname.includes(href) &&
																					'bg-[#FCFCFC]'
																				}`}
									>
										<div class="flex items-center gap-3">
											<img src={icon} alt={icon} />
											{#if isNavOpen}
												<p
													class={`font-poppins text-base font-medium text-[#26272c]  ${
														$page.url.pathname.includes(href) && 'text-[#2DB8E3]'
													}`}
												>
													{label}
												</p>
											{/if}
										</div>
									</summary>
									<ul class="ml-[25px] px-3">
										{#each children as subLink}
											<li>
												<a href={subLink.href} class="p-0">
													<div
														class={`relative flex w-fit gap-1 px-4 py-2 font-poppins  text-sm hover:bg-transparent focus:!bg-transparent active:!bg-transparent active:!text-[#26272c] ${
															$page.url.pathname.includes(subLink.href)
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

			<button
				class="absolute right-0 top-1/2 translate-x-1/2 translate-y-1/2 cursor-pointer"
				on:click={toggleNavbar}
			>
				<img
					src={staticImages.navButton}
					class={`${isNavOpen ? '' : 'rotate-180'} transition-all duration-300 ease-out`}
					alt="nav-btn"
				/>
			</button>
		</div>
	</div>
	<div class="nav-bg top-0 flex h-20 w-full items-center justify-end">
		<div class="pr-4">
			<HeaderConnectWallet />
		</div>
	</div>
</div>
