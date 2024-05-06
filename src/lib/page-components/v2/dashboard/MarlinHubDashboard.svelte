<script lang="ts">
	import { buttonClasses } from '$lib/atoms/v2/componentClasses';
	import ModalButton from '$lib/atoms/v2/modals/ModalButton.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import ExternalLinkConfirmationModal from '$lib/components/v2/modals/ExternalLinkConfirmationModal.svelte';
	import type { CardsList } from '$lib/types/v2/componentTypes';
	import { ROUTES } from '$lib/utils/constants/v2/urls';
	import { cn } from '$lib/utils/helpers/commonHelper';

	const cardsList: CardsList = [
		{
			title: 'Oyster',
			logo: staticImages.oysterIcon,
			logoAlt: 'Oyster Icon',
			description: 'Deploy a variety of infrastructure on TEE co-processors',
			buttons: [
				{ text: 'dApp', href: ROUTES.OYSTER_URL },
				{ text: 'Learn', href: '/oyster' }
			]
		},
		{
			title: 'Kalypso',
			logo: staticImages.kalypsoIcon,
			logoAlt: 'Kalypso Icon',
			description: 'Outsource ZKPs to a proof marketplace or join Kalypso as a prover',
			buttons: [
				{ text: 'dApp', href: ROUTES.KALYPSO_URL },
				{ text: 'Learn', href: '/oyster' }
			]
		},
		{
			title: 'Bridge',
			logo: staticImages.bridgeIcon,
			logoAlt: 'Bridge Icon',
			description:
				'Convert POND to MPond and vice-versa to participate in the Marlin network or bridge from Ethereum <-> Arbitrum.',
			buttons: [
				{ text: 'POND <-> MPond', href: ROUTES.BRIDGE_URL },
				{ text: 'Ethereum <-> Arbitrum', href: ROUTES.ETH_ARB_BRIDGE_LINK }
			]
		},
		{
			title: 'Relay',
			logo: staticImages.relayIcon,
			logoAlt: 'Relay Icon',
			description:
				'Marlin Relay is a decentralized relay network that transmits blocks and transactions between nodes of different blockchain network.',
			buttons: [
				{ text: 'dApp', href: ROUTES.RELAY_URL },
				{ text: 'Learn', href: '/oyster' }
			]
		},
		{
			title: 'Explore',
			logo: staticImages.exploreIcon,
			logoAlt: 'Explore Icon',
			description:
				'Discover the vast variety of dApps that can leverage Marlin coprocessors and apply for credits to kick start your decentralized infra journey',
			buttons: [
				{ text: 'Ecosystem', href: ROUTES.ECOSYSTEM_URL },
				{
					text: 'Apply for credits',
					href: 'https://monkeytype.com',
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
	<div class="mt-6 grid grid-cols-2 gap-5 pb-8">
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
								styleClass="flex h-16 flex-1 text-base font-normal">{button.text}</ModalButton
							>
						{:else}
							<a
								class={cn(buttonClasses.greyOutlined, 'flex h-16 flex-1 text-base font-normal')}
								href={button.href}>{button.text}</a
							>
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
