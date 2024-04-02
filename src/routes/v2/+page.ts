import { ROUTES } from '$lib/utils/constants/v2/urls';
import { redirect } from '@sveltejs/kit';

export function load() {
	throw redirect(308, ROUTES.HUB_DASHBOARD_URL);
}
