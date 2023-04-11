export const getInventoryStatusVariant = (status: string) => {
	switch (status) {
		case 'Active':
			return 'success';
		case 'Inactive':
			return 'error';
		default:
			return 'primary';
	}
};

export const getInventoryDurationVariant = (duration: number) => {
	if (duration < 86400) {
		return 'error';
	} else if (duration < 86400 * 3) {
		return 'warning';
	} else {
		return 'success';
	}
};
