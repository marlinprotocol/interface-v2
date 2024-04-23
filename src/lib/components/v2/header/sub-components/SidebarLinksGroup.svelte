<script lang="ts">
	import { staticImages } from '$lib/components/images/staticImages';
	import { isNavOpen } from '$lib/data-stores/v2/navStore';
	import type { SidebarLinks } from '$lib/types/headerTypes';
	import { menuItems } from '$lib/utils/constants/v2/navigation';
	import { ROUTES } from '$lib/utils/constants/v2/urls';
	import { cn } from '$lib/utils/helpers/commonHelper';
	import MenuItem from './MenuItem.svelte';

	export let activeLink: string = '';

	let links: SidebarLinks[] = [];
	let checked = false;

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
					href: ROUTES.BRIDGE_URL,
					icon: activeLink.includes(ROUTES.BRIDGE_URL)
						? staticImages.dataTransferIconBlue
						: staticImages.dataTransferIcon
				},
				{
					preFixLabel: 'Ethereum',
					postFixLabel: 'Arbitrum',
					href: ROUTES.ETH_ARB_BRIDGE_LINK,
					icon: activeLink.includes(ROUTES.ETH_ARB_BRIDGE_LINK)
						? staticImages.dataTransferIconBlue
						: staticImages.dataTransferIcon,
					openInNewTab: true
				},
				{ preFixLabel: 'Learn', href: ROUTES.BRIDGE_LEARN_LINK, openInNewTab: true }
			]
		},
		{
			label: 'Relay',
			icon: activeLink.includes(ROUTES.RELAY_URL)
				? staticImages.relayIconBlue
				: staticImages.relayIcon,
			href: ROUTES.RELAY_URL,
			children: [
				{ preFixLabel: 'Clusters', href: ROUTES.RELAY_CLUSTERS_LINK, openInNewTab: true },
				{ preFixLabel: 'Registration', href: ROUTES.RELAY_REGISTRATION_LINK, openInNewTab: true },
				{ preFixLabel: 'Delegations', href: ROUTES.RELAY_DELEGATION_LINK, openInNewTab: true },
				{ preFixLabel: 'Receivers', href: ROUTES.RELAY_RECEIVER_LINK, openInNewTab: true }
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
				{ preFixLabel: 'Inventory', href: ROUTES.OYSTER_INVENTORY_URL }
			]
		},
		{
			label: 'Kalypso',
			icon: activeLink.includes(ROUTES.KALYPSO_URL)
				? staticImages.kalypsoIconBlue
				: staticImages.kalypsoIcon,
			href: ROUTES.KALYPSO_URL,
			children: [{ preFixLabel: 'Dashboard', href: ROUTES.KALYPSO_LINK_1_URL }]
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
		class="relative max-h-[calc(100dvh-5rem-176px)] overflow-hidden after:absolute after:bottom-0 after:h-10 after:w-full after:bg-gradient-to-b after:from-transparent after:to-white"
	>
		<ul class="menu max-h-full flex-nowrap overflow-y-auto overflow-x-hidden px-0 pb-2 pt-0">
			{#each links as { icon, label, children, href }}
				{#if children}
					<li>
						<details>
							<summary
								class={cn(
									'px-[14px] py-4 after:text-[#26272c] hover:bg-transparent focus:bg-transparent active:!bg-transparent',
									{
										'after:text-[#2DB8E3]': activeLink.includes(href),
										'after:hidden': !$isNavOpen,
										'bg-[#FCFCFC]': !$isNavOpen && activeLink.includes(href)
									}
								)}
							>
								<div class="flex items-center gap-3">
									<img src={icon} alt={icon} />
									{#if $isNavOpen}
										<p
											class={cn('font-poppins text-base font-medium text-[#26272c]', {
												'text-[#2DB8E3]': activeLink.includes(href)
											})}
										>
											{label}
										</p>
									{/if}
								</div>
							</summary>
							<ul class={cn('ml-[25px] px-3', $isNavOpen ? 'block' : 'hidden')}>
								{#each children as subLink}
									<li>
										<a
											href={subLink.href}
											target={subLink.openInNewTab ? '_blank' : ''}
											class="p-0 hover:bg-transparent focus:!bg-transparent active:!bg-transparent active:!text-[#26272c]"
										>
											<div
												class={cn(
													'relative flex w-fit gap-1 px-4 py-2 font-poppins text-sm',
													activeLink.includes(subLink.href)
														? ' font-medium !text-[#3840C7] after:absolute after:-left-3 after:top-0 after:h-full after:w-[2px] after:bg-[#3840C7]'
														: 'text-[#26272c]'
												)}
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
							{#if $isNavOpen}
								<p
									class={cn('font-poppins text-base font-medium text-[#26272c]', {
										'text-[#2DB8E3]': activeLink.includes(href)
									})}
								>
									{label}
								</p>
							{/if}
						</div>
					</a>
				{/if}
			{/each}
		</ul>
	</div>
	<div class={cn('my-8 rounded-2xl', { 'bg-[#F4F4F6]': $isNavOpen })}>
		<ul>
			{#each menuItems as item}
				<MenuItem {...item} />
			{/each}
		</ul>
		<div class="px-4 py-4">
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
		</div>
	</div>
</div>

<style>
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
</style>
