import { writable, type Writable } from 'svelte/store';
import { getColorClassByVariant, getIconbyVariant } from '$lib/utils/helpers/componentHelper';
import type { Toast, ToastModel } from '$lib/types/componentTypes';

/**
 * toast store holds an array of toast objects, it should be updated using add and dismiss functions only
 */
export const toastsStore: Writable<ToastModel[]> = writable([]);

/**
 * takes in a unique toast id and removes it from the toastsStore
 * @param id
 */
export const dismissToast = (id: number) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	toastsStore.update((all: any) => all.filter((t: Toast) => t.id !== id));
};

/**
 * adds a toast to toastStore and display it to the user
 * @param message message that you want the user to see
 * @param dismissible whether or not user can dismiss the toast on click
 * @param timeout how long the toast will be displayed before it is dismissed in seconds
 * @param variant the color of the toast
 */
export const addToast = ({
	message = { title: 'Set Toast Message Title' },
	dismissible = true,
	timeout = 2800,
	variant
}: Toast) => {
	// Create a unique ID so we can easily find/remove it
	// if it is dismissible/has a timeout.
	const id = Math.floor(Math.random() * 10000);

	const defaults: Toast = {
		variant: 'success',
		timeout: 2800,
		message: { title: 'Set Toast Message Title' }
	};

	const bgColor = getColorClassByVariant(variant ? variant : defaults.variant);
	const iconData = getIconbyVariant(variant ? variant : defaults.variant);

	const className = `${bgColor} `;

	// Push the toast to the top of the list of toasts
	const t: ToastModel = {
		id,
		...defaults,
		message,
		dismissible,
		timeout,
		className,
		iconData,
		bgColor
	};
	toastsStore.update((all) => [t, ...all]);

	// If toast is dismissible, dismiss it after "timeout" amount of time.
	if (t.timeout && t.dismissible) setTimeout(() => dismissToast(id), t.timeout);
};
