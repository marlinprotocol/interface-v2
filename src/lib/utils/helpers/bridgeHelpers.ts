import {
	DEFAULT_PRECISION,
	MPOND_PRECISIONS,
	POND_PRECISIONS
} from '$lib/utils/constants/constants';

export const getAmountPrecision = (token: 'pond' | 'mPond') => {
	switch (token) {
		case 'pond':
			return POND_PRECISIONS;
		case 'mPond':
			return MPOND_PRECISIONS;
		default:
			return DEFAULT_PRECISION;
	}
};
