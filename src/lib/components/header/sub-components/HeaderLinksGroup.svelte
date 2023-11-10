<script lang="ts">
	import { page } from '$app/stores';
	import type { NavLinkModel } from '$lib/types/headerTypes';
	import {
		OYSTER_MARKETPLACE_URL,
		OYSTER_OPERATOR_URL,
		OYSTER_OWNER_INVENTORY_URL
	} from '$lib/utils/constants/urls';

	let openDropdown: HTMLDetailsElement | null = null;

	let links: NavLinkModel[] = [
		{ label: 'Marketplace', href: OYSTER_MARKETPLACE_URL },
		{ label: 'Operator', href: OYSTER_OPERATOR_URL },
		{ label: 'Inventory', href: OYSTER_OWNER_INVENTORY_URL }
	];

	function closeDropdown(event: MouseEvent) {
		const isInsideDetails = (event?.target as HTMLElement)?.closest('details');
		if (!isInsideDetails) {
			if (openDropdown) {
				openDropdown.removeAttribute('open');
				openDropdown = null;
			}
		} else {
			if (openDropdown && openDropdown !== isInsideDetails) {
				openDropdown.removeAttribute('open');
			}
			openDropdown = isInsideDetails;
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	function closeDropdownOnClick(_event: MouseEvent) {
		openDropdown?.removeAttribute('open');
	}

	function setLinkActive(pathname: string) {
		// remove all active properties from the links and their children
		links.forEach((link) => {
			link.active = false;
			if (link.children) {
				link.children.forEach((child) => {
					child.active = false;
				});
			}
		});
		// check the links and their children's href to see if it includes the pathname
		// if it does, set the active property to true
		links.forEach((link) => {
			if (link.href && pathname.includes(link.href)) {
				link.active = true;
			} else if (link.children) {
				link.children.forEach((child) => {
					if (child.href && pathname.includes(child.href)) {
						child.active = true;
					}
				});
			}
		});
		// reassign the links to the links variable for the DOM to update, svelte thing
		links = links;
	}

	$: setLinkActive($page.url.pathname);
</script>

<svelte:window on:click={(e) => closeDropdown(e)} />
{#each links as link (link.label)}
	{#if link.children}
		<li class="px-1">
			<details>
				<summary class="font-semibold">{link.label}</summary>
				<ul class="p-2">
					{#each link.children as child (child.label)}
						<li class="w-full">
							<a
								href={child.href}
								on:click={(e) => closeDropdownOnClick(e)}
								class="{child.active ? 'bg-primary text-white' : ''} flex w-full items-start p-0"
							>
								<button class="w-full px-4 py-2 text-left">
									{child.label}
								</button>
							</a>
						</li>
					{/each}
				</ul>
			</details>
		</li>
	{:else}
		<li
			class="nav-links px-1
		"
		>
			<a
				href={link.href}
				class="{link.active ? 'bg-primary text-white' : ''} p-0 font-semibold"
				target={link?.openInNewTab ? '_blank' : ''}
			>
				<button class="w-full px-4 py-2 text-left">
					{link.label}
				</button>
			</a>
		</li>
	{/if}
{/each}
