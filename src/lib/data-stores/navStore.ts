import { writable, type Writable } from 'svelte/store';

export const isNavOpen: Writable<boolean> = writable(true);
