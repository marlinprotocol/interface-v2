<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import ExternalLinkConfirmationModal from '$lib/components/modals/ExternalLinkConfirmationModal.svelte';
	import type { CardsList } from '$lib/types/componentTypes';
	import type { SidebarDropdownLinkIds } from '$lib/types/headerTypes';
	import { SIDEBAR_DROPDOWN_LINK_IDS } from '$lib/utils/constants/constants';
	import { EXTERNAL_LINKS, ROUTES } from '$lib/utils/constants/urls';
	import { cn } from '$lib/utils/helpers/commonHelper';

	function clickNavLink(elementId: SidebarDropdownLinkIds) {
		const navLink = document.getElementById(elementId) as HTMLDivElement | undefined;
		if (navLink) {
			// // prevent toggle if already open
			// const linksNode = navLink.nextElementSibling;
			// const isDropDownOpen = linksNode
			// 	? Array.from(linksNode?.classList).includes('menu-dropdown-show')
			// 	: false;
			// if (linksNode && isDropDownOpen) {
			// 	return;
			// }
			// trigger
			navLink.click();
		}
	}

	const cardsList: CardsList = [
		{
			title: 'Oyster',
			logo: staticImages.oysterIcon,
			logoAlt: 'Oyster Icon',
			description: 'Deploy a variety of infrastructure on TEE co-processors',
			buttons: [
				{ text: 'dApp', onclick: () => clickNavLink(SIDEBAR_DROPDOWN_LINK_IDS.oyster) },
				{ text: 'Learn', href: EXTERNAL_LINKS.OYSTER_LEARN_LINK }
			]
		},
		{
			title: 'Kalypso',
			logo: staticImages.kalypsoIcon,
			logoAlt: 'Kalypso Icon',
			description: 'Outsource ZKPs to a proof marketplace or join Kalypso as a prover',
			buttons: [
				{ text: 'dApp', href: ROUTES.KALYPSO_URL, inAppRoute: true },
				{ text: 'Learn', href: EXTERNAL_LINKS.KALYPSO_LEARN_LINK }
			]
		},
		{
			title: 'Bridge',
			logo: staticImages.bridgeIcon,
			logoAlt: 'Bridge Icon',
			description:
				'Convert POND to MPond and vice-versa to participate in the Marlin network or bridge from Ethereum <-> Arbitrum.',
			buttons: [
				{
					text: 'POND MPond',
					onclick: () => clickNavLink(SIDEBAR_DROPDOWN_LINK_IDS.bridge),
					icon: { src: staticImages.dataTransferIcon, alt: 'Swap' }
				},
				{
					text: 'Ethereum Arbitrum',
					href: EXTERNAL_LINKS.ETH_ARB_BRIDGE_LINK,
					icon: { src: staticImages.dataTransferIcon, alt: 'Swap' },
					openInPopup: {
						modalFor: 'ethArbBridge',
						popupCtaText: 'Visit'
					}
				}
			]
		},
		{
			title: 'Relay',
			logo: staticImages.relayIcon,
			logoAlt: 'Relay Icon',
			description:
				'Marlin Relay is a decentralized relay network that transmits blocks and transactions between nodes of different blockchain network.',
			buttons: [
				{
					text: 'dApp',
					onclick: () => clickNavLink(SIDEBAR_DROPDOWN_LINK_IDS.relay),
					inAppRoute: true
				},
				{ text: 'Learn', href: EXTERNAL_LINKS.RELAY_LEARN_LINK }
			]
		},
		{
			title: 'Explore',
			logo: staticImages.exploreIcon,
			logoAlt: 'Explore Icon',
			description:
				'Discover the vast variety of dApps that can leverage Marlin coprocessors and apply for credits to kick start your decentralized infra journey',
			buttons: [
				{ text: 'Ecosystem', href: ROUTES.ECOSYSTEM_URL, inAppRoute: true },
				{
					text: 'Apply for credits',
					href: 'https://bit.ly/3BlS71b',
					openInPopup: {
						modalFor: 'applyForCredits',
						descriptionText: 'Apply for credits to kick start your decentralized infra journey',
						popupCtaText: 'Apply for credits'
					}
				}
			]
		}
	];
</script>

<section class="h-full w-full">
	<p class="text-lg font-light">
		Marlin is a verifiable computing protocol featuring TEE and ZK-based coprocessors to delegate
		complex workloads over a decentralized cloud.
	</p>
	<div class="mt-6 grid grid-cols-2 gap-4 pb-8">
		{#each cardsList as card}
			<div class="flex h-60 w-full flex-col justify-between rounded-2xl bg-white p-6">
				<div class="flex flex-col gap-3">
					<div class="flex items-center gap-2 text-2xl font-medium text-[#030115]">
						<img src={card.logo} alt={card.logoAlt} />{card.title}
					</div>
					<span>{card.description}</span>
				</div>
				<div class="flex items-center justify-between gap-4">
					{#each card.buttons as button}
						{#if button.openInPopup}
							<ModalButton
								modalFor={button.openInPopup.modalFor}
								variant="greyOutlined"
								styleClass="flex h-16 flex-1 text-base font-normal"
							>
								{#if button.icon}
									{button.text.split(' ')[0]}<img
										src={button.icon.src}
										alt={button.icon.alt}
									/>{button.text.split(' ')[1]}
								{:else}
									{button.text}
								{/if}
							</ModalButton>
						{:else if button.onclick}
							<Button
								onclick={button.onclick}
								variant="greyOutlined"
								styleClass="flex h-16 flex-1 text-base font-normal"
								>{#if button.icon}
									{button.text.split(' ')[0]}<img
										src={button.icon.src}
										alt={button.icon.alt}
									/>{button.text.split(' ')[1]}
								{:else}
									{button.text}
								{/if}</Button
							>
						{:else}
							<a
								class={cn(buttonClasses.greyOutlined, 'flex h-16 flex-1 text-base font-normal')}
								href={button.href}
								target={button.inAppRoute ? '_top' : '_blank'}
							>
								{#if button.icon}
									{button.text.split(' ')[0]}<img
										src={button.icon.src}
										alt={button.icon.alt}
									/>{button.text.split(' ')[1]}
								{:else}
									{button.text}
								{/if}
							</a>
						{/if}
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>
{#each cardsList as card}
	{#each card.buttons as button}
		{#if button.openInPopup}
			<ExternalLinkConfirmationModal
				modalFor={button.openInPopup.modalFor}
				href={button.href}
				bodyText={button.openInPopup.descriptionText}
			/>
		{/if}
	{/each}
{/each}
