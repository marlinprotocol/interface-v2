<script lang="ts">
	import { goto } from '$app/navigation';
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import ThemeSwitcher from '$lib/atoms/ThemeSwitcher.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import { isNavOpen } from '$lib/data-stores/navStore';
	import type { SidebarLinks } from '$lib/types/headerTypes';
	import { SIDEBAR_DROPDOWN_LINK_IDS } from '$lib/utils/constants/constants';
	import { menuItems } from '$lib/utils/constants/navigation';
	import { EXTERNAL_LINKS, ROUTES } from '$lib/utils/constants/urls';
	import { cn } from '$lib/utils/helpers/commonHelper';
	import ExternalLinkConfirmationModal from '../../modals/ExternalLinkConfirmationModal.svelte';
	import MenuItem from './MenuItem.svelte';

	export let activeLink: string = '';

	let links: SidebarLinks[] = [];
	let expandedLinks: string = '';

	function handleSidebarMenuItemClickWhenCollapsed(e: Event) {
		$isNavOpen = true;
		const targetElement = e.target as HTMLElement;
		const menuDropdown = targetElement.nextElementSibling as Element;
		const firstChildCta = menuDropdown.querySelector('li')?.children[0] as HTMLDivElement;
		firstChildCta?.click();
	}

	function handleParentLinkClick(e: Event, label: string, href: string, hasDashboard?: boolean) {
		expandMenu(e, label);
		if (hasDashboard) goto(href);
	}

	function handleParentLinkKeyPress(
		e: KeyboardEvent,
		label: string,
		href: string,
		hasDashboard?: boolean
	) {
		if (e?.key === 'Enter' || e?.key === ' ') {
			expandMenu(e, label);
			if (hasDashboard) goto(href);
		}
	}

	function expandMenu(e: Event, label: string) {
		expandedLinks = expandedLinks === label ? '' : label;
		if (label !== 'Relay') {
			handleSidebarMenuItemClickWhenCollapsed(e);
		}
	}

	$: links = [
		{
			label: 'Dashboard',
			href: ROUTES.HUB_DASHBOARD_URL,
			icon: activeLink.includes(ROUTES.HUB_DASHBOARD_URL)
				? staticImages.dashboardIconBlue
				: staticImages.dashboardIcon
		},
		{
			label: 'Oyster',
			id: SIDEBAR_DROPDOWN_LINK_IDS.oyster,
			icon: activeLink.includes(ROUTES.OYSTER_URL)
				? staticImages.oysterIconBlue
				: staticImages.oysterIcon,

			hasDashboard: true,
			href: ROUTES.OYSTER_URL,
			children: [
				{ preFixLabel: 'Marketplace', href: ROUTES.OYSTER_MARKETPLACE_URL },
				{ preFixLabel: 'Operator', href: ROUTES.OYSTER_OPERATOR_URL },
				{ preFixLabel: 'Inventory', href: ROUTES.OYSTER_INVENTORY_URL }
			]
		},
		{
			label: 'Relay',
			id: SIDEBAR_DROPDOWN_LINK_IDS.relay,
			href: ROUTES.RELAY_URL,
			icon: staticImages.relayIcon,
			children: [
				{ preFixLabel: 'Clusters', href: EXTERNAL_LINKS.RELAY_CLUSTERS_LINK, openInNewTab: true },
				{
					preFixLabel: 'Registration',
					href: EXTERNAL_LINKS.RELAY_REGISTRATION_LINK,
					openInNewTab: true
				},
				{
					preFixLabel: 'Delegations',
					href: EXTERNAL_LINKS.RELAY_DELEGATION_LINK,
					openInNewTab: true
				},
				{ preFixLabel: 'Receivers', href: EXTERNAL_LINKS.RELAY_RECEIVER_LINK, openInNewTab: true }
			]
		},
		{
			label: 'Kalypso',
			icon: activeLink.includes(ROUTES.KALYPSO_URL)
				? staticImages.kalypsoIconBlue
				: staticImages.kalypsoIcon,

			href: ROUTES.KALYPSO_URL
		},
		{
			label: 'Bridge',
			id: SIDEBAR_DROPDOWN_LINK_IDS.bridge,
			icon: activeLink.includes(ROUTES.BRIDGE_URL)
				? staticImages.bridgeIconBlue
				: staticImages.bridgeIcon,
			href: ROUTES.BRIDGE_URL,
			children: [
				{
					preFixLabel: 'POND',
					postFixLabel: 'MPond',
					href: ROUTES.BRIDGE_URL,
					icon: activeLink.includes(ROUTES.BRIDGE_URL)
						? staticImages.dataTransferIconBlue
						: staticImages.dataTransferIcon
				},
				{
					preFixLabel: 'Ethereum',
					postFixLabel: 'Arbitrum',
					href: EXTERNAL_LINKS.ETH_ARB_BRIDGE_LINK,
					icon: activeLink.includes(EXTERNAL_LINKS.ETH_ARB_BRIDGE_LINK)
						? staticImages.dataTransferIconBlue
						: staticImages.dataTransferIcon,
					openInNewTab: true,
					openInPopup: true,
					bodyText: 'You are going to be re-directed to the official Arbitrum bridge.'
				}
			]
		},
		{
			label: 'Ecosystem',
			href: ROUTES.ECOSYSTEM_URL,
			icon: activeLink.includes(ROUTES.ECOSYSTEM_URL)
				? staticImages.ecosystemIconBlue
				: staticImages.ecosystemIcon
		}
	];
</script>

<div class="flex h-[calc(100dvh-5rem)] flex-1 flex-col justify-between px-6">
	<div
		class="relative max-h-[calc(100dvh-5rem-176px)] overflow-hidden after:absolute after:bottom-0 after:h-10 after:w-full after:bg-gradient-to-b after:from-transparent after:to-base-100"
	>
		<ul class="menu max-h-full flex-nowrap overflow-y-auto overflow-x-hidden px-0 pb-10 pt-0">
			{#each links as { icon, label, children, href, openInNewTab, hasDashboard, id }}
				{#if children}
					<li>
						<div
							class={cn('menu-dropdown-toggle px-[14px] py-4 after:text-grey-700', {
								'after:text-[#2DB8E3]': activeLink.includes(href),
								'after:hidden': !$isNavOpen,
								'menu-dropdown-show': expandedLinks.includes(label)
							})}
							on:click|self={(e) => handleParentLinkClick(e, label, href, hasDashboard)}
							on:keydown|self={(e) => handleParentLinkKeyPress(e, label, href, hasDashboard)}
							role="button"
							tabindex="0"
							{id}
						>
							<div class="pointer-events-none flex items-start gap-3">
								<div class="flex h-6 w-6 items-center justify-center">
									<img
										src={icon}
										alt={icon}
										class={cn({
											'icon-invert': !activeLink.includes(href)
										})}
									/>
								</div>
								{#if $isNavOpen}
									<p
										class={cn('font-poppins text-base font-medium text-grey-700', {
											'text-[#2DB8E3]': activeLink.includes(href)
										})}
									>
										{label}
									</p>
								{/if}
							</div>
						</div>
						<ul
							class={cn('menu-dropdown ml-[25px] border-l-2 border-l-white-300 px-3', {
								hidden: !$isNavOpen,
								'menu-dropdown-show': expandedLinks.includes(label)
							})}
						>
							{#each children as subLink}
								<li>
									{#if subLink.openInPopup}
										<ModalButton
											modalFor="external-link-confirmation-{subLink.preFixLabel}"
											variant="text"
											styleClass="p-0 h-auto justify-start hover:bg-base-content/[.1]"
										>
											<div
												class={cn(
													'pointer-events-none relative flex w-fit gap-1 px-4 py-2 font-poppins text-sm',
													activeLink.includes(subLink.href)
														? 'font-medium !text-[#3840C7] after:absolute after:-left-3 after:top-0 after:h-full after:w-[2px] after:bg-[#3840C7]'
														: 'text-grey-700'
												)}
											>
												{subLink.preFixLabel}
												{#if subLink.icon}
													<img
														src={subLink.icon}
														alt={subLink.icon}
														class="icon-invert min-w-[18px] max-w-[18px]"
													/>
												{/if}
												{#if subLink.postFixLabel}
													{subLink.postFixLabel}
												{/if}
											</div>
										</ModalButton>
									{:else}
										<a
											href={subLink.href}
											target={subLink.openInNewTab ? '_blank' : ''}
											class="p-0 active:!text-grey-700"
										>
											<div
												class={cn(
													'pointer-events-none relative flex w-fit gap-1 px-4 py-2 font-poppins text-sm',
													activeLink.includes(subLink.href)
														? 'font-medium !text-[#3840C7] after:absolute after:-left-3.5 after:top-0 after:h-full after:w-[2px] after:bg-[#3840C7]'
														: 'text-grey-700'
												)}
											>
												{subLink.preFixLabel}
												{#if subLink.icon}
													<img
														src={subLink.icon}
														alt={subLink.icon}
														class="icon-invert min-w-[18px] max-w-[18px]"
													/>
												{/if}
												{#if subLink.postFixLabel}
													{subLink.postFixLabel}
												{/if}
											</div>
										</a>
									{/if}
								</li>
							{/each}
						</ul>
					</li>
				{:else}
					<li>
						<a {href} class="px-[14px] py-4" target={openInNewTab ? '_blank' : ''}>
							<div
								class={cn('flex items-center gap-3', {
									'justify-center': !$isNavOpen
								})}
							>
								<div class="flex h-6 w-6 items-center justify-center">
									<img
										src={icon}
										alt={icon}
										class={cn({ 'icon-invert': !activeLink.includes(href) })}
									/>
								</div>
								{#if $isNavOpen}
									<p
										class={cn('font-poppins text-base font-medium text-grey-700', {
											'text-[#2DB8E3]': activeLink.includes(href)
										})}
									>
										{label}
									</p>
								{/if}
							</div>
						</a>
					</li>
				{/if}
			{/each}
		</ul>
	</div>
	<div class={cn('my-8 rounded-2xl pb-4', { 'sub-nav': $isNavOpen })}>
		<ul>
			{#each menuItems as item}
				<MenuItem {...item} />
			{/each}
			<!-- <li class="mt-4 px-4">
				<ThemeSwitcher />
			</li> -->
		</ul>
	</div>
</div>

{#each links as { children }}
	{#if children}
		{#each children as subLink}
			{#if subLink.openInPopup}
				<ExternalLinkConfirmationModal
					href={subLink.href}
					modalFor="external-link-confirmation-{subLink.preFixLabel}"
					bodyText={subLink.bodyText}
				></ExternalLinkConfirmationModal>
			{/if}
		{/each}
	{/if}
{/each}
