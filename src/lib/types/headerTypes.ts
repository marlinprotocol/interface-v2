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
};

export type SidebarLinks = {
	label: string;
	href: string;
	icon: string;
	children?: SubLinks[];
	isExternal?: boolean;
};
