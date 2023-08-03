import { RECEIVER_STAKING_URL } from '$lib/utils/constants/urls';
import { redirect } from '@sveltejs/kit';

export function load() {
	throw redirect(308, RECEIVER_STAKING_URL);
}
