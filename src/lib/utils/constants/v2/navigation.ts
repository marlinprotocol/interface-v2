import { staticImages } from '$lib/components/images/staticImages';
import type { MenuItemType } from '$lib/types/v2/navigation';

export const menuItems: MenuItemType[] = [
	{
		imgSrc: staticImages.developerChatIcon,
		label: 'Developer Chat'
	},
	{
		imgSrc: staticImages.earthIcon,
		label: 'Research Forum'
	},
	{
		label: 'Blog',
		imgSrc: staticImages.blogIcon
	}
];
