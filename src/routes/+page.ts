import { OYSTER_MARKETPLACE_URL } from '$lib/utils/constants/urls';
import { redirect } from '@sveltejs/kit';

export function load() {
	throw redirect(308, OYSTER_MARKETPLACE_URL);
}
