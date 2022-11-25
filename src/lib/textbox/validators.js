export function requiredValidator(v) {
	if (v === undefined) return undefined;
	return v === '' ? 'Required' : undefined;
}

export function addressValidator(v) {
	if (v === undefined) return undefined;
	return requiredValidator(v) || (!/^0x[0-9a-fA-f]{40}$/i.test(v) ? 'Invalid address' : undefined);
}

export function amountValidator(dec) {
	return (v) => {
		if (v === undefined) return undefined;
		return (
			requiredValidator(v) || (!/^[0-9]+(\.[0-9]{1,18})?$/i.test(v) ? 'Invalid amount' : undefined)
		);
	};
}

export function hashValidator(v) {
	if (v === undefined) return undefined;
	return requiredValidator(v) || (!/^0x[0-9a-fA-f]{64}$/i.test(v) ? 'Invalid hash' : undefined);
}

