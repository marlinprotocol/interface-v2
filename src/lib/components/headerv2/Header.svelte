<script lang="ts">
	import HeaderConnectWallet from '$lib/components/headerv2/sub-components/HeaderConnectWallet.svelte';
	import HeaderLogo from '$lib/components/headerv2/sub-components/HeaderLogo.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import { onMount } from 'svelte';

	import BridgeIcon from '$lib/components/headerv2/Icon/BridgeIcon.svelte';
	import DashboardIcon from '$lib/components/headerv2/Icon/DashboardIcon.svelte';
	import EcosystemIcon from '$lib/components/headerv2/Icon/EcosystemIcon.svelte';
	import FaQsIcon from '$lib/components/headerv2/Icon/FAQsIcon.svelte';
	import GovernanceIcon from '$lib/components/headerv2/Icon/GovernanceIcon.svelte';
	import KalypsoIcon from '$lib/components/headerv2/Icon/KalypsoIcon.svelte';
	import OysterIcon from '$lib/components/headerv2/Icon/OysterIcon.svelte';
	import RelayIcon from '$lib/components/headerv2/Icon/RelayIcon.svelte';
	import {
		BRIDGE_LEARN_MORE_DOC_LINK,
		BRIDGE_URL,
		DASHBOARD_URL,
		ECOSYSTEM_URL,
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

	let isNavOpen: Boolean = true;
	let pathname = '';

	onMount(() => {
		pathname = window.location.pathname;
	});

	const toggleNavbar = () => {
		isNavOpen = !isNavOpen;
	};
	let links: any[] = [
		{ label: 'Dashboard', href: DASHBOARD_URL, icon: DashboardIcon },
		{
			label: 'Bridge',
			icon: BridgeIcon,
			href: BRIDGE_URL,
			children: [
				{
					label: `Pond <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        opacity="0.4"
        d="M14.25 6.73999H4.99392C4.23958 6.73999 3.8624 6.73999 3.76854 6.5085C3.67468 6.277 3.94138 6.00456 4.47478 5.45966L6.15818 3.73999"
        stroke="#26272C"
        stroke-width="1.125"
        stroke-linecap="round"
        stroke-linejoin="round"
    />
    <path
        d="M3.75 11.24H13.006C13.7604 11.24 14.1376 11.24 14.2315 11.4715C14.3253 11.703 14.0586 11.9754 13.5252 12.5203L11.8418 14.24"
        stroke="#26272C"
        stroke-width="1.125"
        stroke-linecap="round"
        stroke-linejoin="round"
    />
</svg> MPond`,
					href: POND_HISTORY_PAGE_URL
				},
				{
					label: `Ethereum <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        opacity="0.4"
        d="M14.25 6.73999H4.99392C4.23958 6.73999 3.8624 6.73999 3.76854 6.5085C3.67468 6.277 3.94138 6.00456 4.47478 5.45966L6.15818 3.73999"
        stroke="#26272C"
        stroke-width="1.125"
        stroke-linecap="round"
        stroke-linejoin="round"
    />
    <path
        d="M3.75 11.24H13.006C13.7604 11.24 14.1376 11.24 14.2315 11.4715C14.3253 11.703 14.0586 11.9754 13.5252 12.5203L11.8418 14.24"
        stroke="#26272C"
        stroke-width="1.125"
        stroke-linecap="round"
        stroke-linejoin="round"
    />
</svg> Arbitrum`,
					href: MPOND_HISTORY_PAGE_URL
				},
				{ label: 'Learn', href: BRIDGE_LEARN_MORE_DOC_LINK }
			]
		},
		{ label: 'Governance', href: GOVERNANCE_URL, icon: GovernanceIcon },
		{
			label: 'Relay',
			icon: RelayIcon,
			href: RELAY_URL,
			children: [
				{ label: 'Clusters', href: RELAY_CLUSTERS_URL },
				{ label: 'Registration', href: RELAY_REGISTRATION_URL },
				{ label: 'Delegations', href: RELAY_DELEGATION_URL },
				{ label: 'Receivers', href: RELAY_RECEIVER_URL }
			]
		},
		{
			label: 'Oyster',
			icon: OysterIcon,
			href: OYSTER_URL,
			children: [
				{ label: 'Marketplace', href: OYSTER_MARKETPLACE_URL },
				{ label: 'Operator', href: OYSTER_OPERATOR_URL },
				{ label: 'Inventory', href: OYSTER_INVENTORY_URL },
				{ label: 'Auditors', href: OYSTER_AUDITORS_URL }
			]
		},
		{
			label: 'Kalypso',
			icon: KalypsoIcon,
			href: KALYPSO_URL,
			children: [
				{ label: 'Kalypso 1', href: KALYPSO_LINK_1_URL },
				{ label: 'Kalypso 2', href: KALYPSO_LINK_2_URL }
			]
		},
		{ label: 'Ecosystem', href: ECOSYSTEM_URL, icon: EcosystemIcon },
		{ label: 'FAQs', href: FAQS_URL, icon: FaQsIcon }
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
										class={`px-[14px] py-4 after:text-[#26272c] hover:bg-transparent focus:bg-transparent active:!bg-transparent ${
											pathname.includes(href) && 'current-path after:text-[#2DB8E3]'
										} ${!isNavOpen && 'after:hidden'}
                                        ${!isNavOpen && pathname.includes(href) && 'bg-[#FCFCFC]'}`}
									>
										<div class="flex items-center gap-3">
											<svelte:component this={icon} />
											{#if isNavOpen}
												<p
													class={`font-poppins text-base font-medium text-[#26272c]  ${
														pathname.includes(href) && 'text-[#2DB8E3]'
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
												<div
													class={`relative w-fit px-4 py-2 font-poppins  text-sm hover:bg-transparent focus:!bg-transparent active:!bg-transparent active:!text-[#26272c] ${
														pathname.includes(subLink.href)
															? 'font-medium !text-[#3840C7] after:absolute after:-left-3 after:top-0 after:h-full after:w-[2px] after:bg-[#3840C7]'
															: 'text-[#26272c] '
													}`}
												>
													{@html subLink.label}
												</div>
											</li>
										{/each}
									</ul>
								</details>
							</li>{:else}
							<div class="flex cursor-pointer items-center gap-3 px-[14px] py-4">
								<svelte:component this={icon} />
								{#if isNavOpen}
									<p class="font-poppins text-base font-medium text-[#26272c]">{label}</p>
								{/if}
							</div>
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
