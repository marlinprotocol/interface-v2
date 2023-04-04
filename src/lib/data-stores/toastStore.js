import { writable } from 'svelte/store';
import { getColorClassByVariant, getIconbyVariant, getTextColorClassByVariant } from '$lib/utils/constants/componentConstants';
export const toastsStore = writable([]);
export const dismissToast = (id) => {
    toastsStore.update((all) => all.filter((t) => t.id !== id));
};
export const addToast = ({ message = 'Set Toast Message', dismissible = true, timeout = 2800, variant }) => {
    // Create a unique ID so we can easily find/remove it
    // if it is dismissible/has a timeout.
    const id = Math.floor(Math.random() * 10000);
    //TODO: Setup some sensible defaults for a toast and clean up types.
    const defaults = {
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
    const t = {
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
    if (t.timeout && t.dismissible)
        setTimeout(() => dismissToast(id), t.timeout);
};
//# sourceMappingURL=toastStore.js.map