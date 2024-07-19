import type { SIDEBAR_DROPDOWN_LINK_IDS } from '$lib/utils/constants/constants';

export type NavLinkModel = {
	label: string;
	href?: string;
	openInNewTab?: boolean;
	active?: boolean;
	children?: NavLinkModel[];
};

export type SubLinks = {
	preFixLabel: string;
	icon?: string;
	postFixLabel?: string;
	href: string;
	openInNewTab?: boolean;
	openInPopup?: boolean;
	bodyText?: string;
};

export type SidebarLinks = {
	label: string;
	href: string;
	icon: string;
	id?: SidebarDropdownLinkIds;
	hasDashboard?: boolean;
	children?: SubLinks[];
	openInNewTab?: boolean;
};

export type SidebarDropdownLinkIds =
	(typeof SIDEBAR_DROPDOWN_LINK_IDS)[keyof typeof SIDEBAR_DROPDOWN_LINK_IDS];
