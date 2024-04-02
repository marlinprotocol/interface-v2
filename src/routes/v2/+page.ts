import { HUB_DASHBOARD_URL } from '$lib/utils/constants/urls';
import { redirect } from '@sveltejs/kit';

export function load() {
	throw redirect(308, HUB_DASHBOARD_URL);
}
