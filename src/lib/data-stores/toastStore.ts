import { writable, type Writable } from 'svelte/store';
import {
	getColorClassByVariant,
	getIconbyVariant,
	getTextColorClassByVariant
} from '$lib/utils/constants/componentConstants';
import type { Toast, ToastModel } from '$lib/types/componentTypes';

export const toastsStore: Writable<ToastModel[]> = writable([]);

export const dismissToast = (id: number) => {
	toastsStore.update((all: any) => all.filter((t: Toast) => t.id !== id));
};

export const addToast = ({
	message = 'Set Toast Message',
	dismissible = true,
	timeout = 2800,
	variant
}: Toast) => {
	// Create a unique ID so we can easily find/remove it
	// if it is dismissible/has a timeout.
	const id = Math.floor(Math.random() * 10000);

	//TODO Later: Setup some sensible defaults for a toast and clean up types.
	const defaults: Toast = {
		variant: 'info',
		dismissible: true,
		timeout: 2800,
		message: 'Set Toast message.'
	};

	const iconColor = getColorClassByVariant(variant ? variant : defaults.variant);
	const textColor = getTextColorClassByVariant(variant ? variant : defaults.variant);
	const iconData = getIconbyVariant(variant ? variant : defaults.variant);
	const alertVariant = variant ? `alert-${variant}` : 'alert-info';

	const className = `${alertVariant ?? ''} ${textColor}`;

	// Push the toast to the top of the list of toasts
	const t: ToastModel = {
		id,
		...defaults,
		message,
		dismissible,
		timeout,
		className,
		iconData,
		iconColor
	};
	toastsStore.update((all) => [t, ...all]);

	// If toast is dismissible, dismiss it after "timeout" amount of time.
	if (t.timeout && t.dismissible) setTimeout(() => dismissToast(id), t.timeout);
};
