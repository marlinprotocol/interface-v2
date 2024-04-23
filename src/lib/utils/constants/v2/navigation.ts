import { staticImages } from '$lib/components/images/staticImages';
import type { MenuItemType } from '$lib/types/v2/navigation';

export const menuItems: MenuItemType[] = [
	{
		imgSrc: staticImages.developerChatIcon,
		label: 'Developer Chat',
		href: 'https://discord.com/invite/pdQZyyy'
	},
	{
		imgSrc: staticImages.earthIcon,
		label: 'Research Forum',
		href: 'https://research.marlin.org/'
	},
	{
		label: 'Blog',
		imgSrc: staticImages.blogIcon,
		href: 'https://blog.marlin.org/'
	}
];
