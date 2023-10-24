import { RELAY_RECEIVER_STAKING_URL } from '$lib/utils/constants/urls';
import { redirect } from '@sveltejs/kit';

export function load() {
	throw redirect(308, RELAY_RECEIVER_STAKING_URL);
}
