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
	hasDashboard?: boolean;
	children?: SubLinks[];
	openInNewTab?: boolean;
};
