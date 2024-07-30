import { writable, type Writable } from 'svelte/store';

export const isDarkMode: Writable<boolean> = writable();
