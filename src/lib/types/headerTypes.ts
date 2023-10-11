export type NavLinkModel = {
	label: string;
	href?: string;
	openInNewTab?: boolean;
	active?: boolean;
	children?: NavLinkModel[];
};
