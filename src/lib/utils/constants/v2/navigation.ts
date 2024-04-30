import { staticImages } from '$lib/components/images/staticImages';
import type { MenuItemType } from '$lib/types/v2/navigation';
import { ROUTES } from './urls';

export const menuItems: MenuItemType[] = [
	{
		imgSrc: staticImages.developerChatIcon,
		label: 'Developer Chat',
		href: ROUTES.DISCORD_LINK
	},
	{
		imgSrc: staticImages.earthIcon,
		label: 'Research Forum',
		href: ROUTES.MARLIN_RESEARCH_FORUM_LINK
	},
	{
		label: 'Blog',
		imgSrc: staticImages.blogIcon,
		href: ROUTES.MARLIN_BLOG_LINK
	}
];
