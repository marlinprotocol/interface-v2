<script lang="ts">
	import { goto } from '$app/navigation';
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import { isNavOpen } from '$lib/data-stores/navStore';
	import type { SidebarLinks } from '$lib/types/headerTypes';
	import { SIDEBAR_DROPDOWN_LINK_IDS } from '$lib/utils/constants/constants';
	import { menuItems } from '$lib/utils/constants/navigation';
	import { EXTERNAL_LINKS, ROUTES } from '$lib/utils/constants/urls';
	import { cn } from '$lib/utils/helpers/commonHelper';
	import ExternalLinkConfirmationModal from '../../modals/ExternalLinkConfirmationModal.svelte';
	import MenuItem from './MenuItem.svelte';
	import { isDarkMode } from '$lib/data-stores/themeStore';

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
		</ul>
		<!----------------------------------------------------------------------------------->
		<!-- Uncomment the following code to enable theme switcher -->
		<div class="px-4 pt-4">
			<input
				type="checkbox"
				class="toggle h-[24px] w-[44px]"
				checked={$isDarkMode}
				on:change={(e) => {
					const htmlElement = document.documentElement;
					$isDarkMode = !$isDarkMode;
					if ($isDarkMode) {
						htmlElement.setAttribute('data-theme', 'dark');
						localStorage.setItem('theme', 'dark');
					} else {
						htmlElement.setAttribute('data-theme', 'light');
						localStorage.setItem('theme', 'light');
					}
				}}
			/>
		</div>
		<!----------------------------------------------------------------------------------->

		<!-- <div class="px-4 py-4">
			<label
				class={cn('grid cursor-pointer place-items-center', $isNavOpen ? 'w-[48px]' : 'w-[24px]')}
			>
				<input
					type="checkbox"
					value="synthwave"
					bind:checked
					class={cn(
						'theme-controller toggle',
						$isNavOpen
							? 'col-span-2 col-start-1 row-start-1 w-[48px]'
							: 'col-span-1 col-start-1 row-start-1 w-[24px]'
					)}
				/>
				<svg
					class="col-start-1 row-start-1 fill-base-100 stroke-base-100"
					width="14"
					height="14"
					viewBox="0 0 14 14"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M9.91634 6.99967C9.91634 8.61049 8.61049 9.91634 6.99967 9.91634C5.38885 9.91634 4.08301 8.61049 4.08301 6.99967C4.08301 5.38885 5.38885 4.08301 6.99967 4.08301C8.61049 4.08301 9.91634 5.38885 9.91634 6.99967Z"
						stroke="#030115"
						stroke-width="0.875"
					/>
					<path
						opacity="0.4"
						d="M7.00033 1.16699V2.04199M7.00033 11.9587V12.8337M11.125 11.1253L10.5062 10.5065M3.49406 3.49406L2.87534 2.87534M12.8337 7.00033H11.9587M2.04199 7.00033H1.16699M11.1253 2.87541L10.5065 3.49412M3.49435 10.5066L2.87563 11.1253"
						stroke="#030115"
						stroke-width="0.875"
						stroke-linecap="round"
					/>
				</svg>
				<svg
					width="14"
					height="14"
					viewBox="0 0 14 14"
					fill="none"
					class={cn('row-start-1', $isNavOpen ? 'col-start-2' : 'col-start-1')}
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						opacity="0.4"
						d="M12.5443 8.21207C11.8444 8.5857 11.0452 8.79757 10.1964 8.79757C7.43958 8.79757 5.20472 6.5627 5.20472 3.80584C5.20472 2.95709 5.41655 2.15782 5.79022 1.45801C3.30873 2.03958 1.46094 4.26683 1.46094 6.92565C1.46094 10.0271 3.97516 12.5413 7.07663 12.5413C9.73546 12.5413 11.9627 10.6936 12.5443 8.21207Z"
						stroke="white"
						stroke-width="0.875"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M12.5443 8.21207C11.9627 10.6936 9.73546 12.5413 7.07663 12.5413C3.97516 12.5413 1.46094 10.0271 1.46094 6.92565C1.46094 4.26683 3.30873 2.03958 5.79022 1.45801"
						stroke="white"
						stroke-width="0.875"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</label>
		</div> -->
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

<!-- <style>
	.toggle,
	.toggle[checked='false'],
	.toggle[aria-checked='false'] .bg-base-content {
		background-color: #fff;
	}
	.toggle:checked,
	.toggle[checked='true'],
	.toggle[aria-checked='true'] .bg-base-content {
		background-color: #17191c;
	}
	.toggle {
		--tglbg: #d9dade;
		box-shadow:
			var(--handleoffsetcalculator) 0 0 2px var(--tglbg) inset,
			0 0 0 2px var(--tglbg) inset,
			var(--togglehandleborder);
		border: none;
	}
	.toggle:checked {
		--tglbg: #3e3f47;
	}
	.toggle:checked + svg {
		opacity: 0;
		visibility: hidden;
	}
	.toggle + svg + svg:last-of-type {
		opacity: 0;
		visibility: hidden;
	}
	.toggle:checked + svg + svg:last-of-type {
		opacity: 1;
		visibility: visible;
	}
</style> -->
