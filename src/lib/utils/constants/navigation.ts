import { staticImages } from '$lib/components/images/staticImages';
import type { MenuItemType } from '$lib/types/navigation';
import { EXTERNAL_LINKS } from './urls';

export const menuItems: MenuItemType[] = [
	{
		imgSrc: staticImages.developerChatIcon,
		label: 'Developer Chat',
		href: EXTERNAL_LINKS.DISCORD_LINK
	},
	{
		imgSrc: staticImages.earthIcon,
		label: 'Research Forum',
		href: EXTERNAL_LINKS.MARLIN_RESEARCH_FORUM_LINK
	},
	{
		label: 'Blog',
		imgSrc: staticImages.blogIcon,
		href: EXTERNAL_LINKS.MARLIN_BLOG_LINK
	}
];
