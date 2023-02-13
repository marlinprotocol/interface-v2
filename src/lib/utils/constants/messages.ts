export const MESSAGES = {
	TOAST: {
		TRANSACTION: {
			CREATED: 'Transaction created, waiting for it to be mined.',
			SUCCESS: 'Transaction successfully mined!',
			FAILED: 'Uh-Oh, Transaction was not successful!'
		},
		ACTIONS: {
			DEPOSIT: {
				/**
				 * @param value
				 * @returns `Depositing ${value} POND.`
				 */
				POND: (value: string | number) => `Depositing ${value} POND.`,
				/**
				 * @param value
				 * @returns `Deposited ${value} POND.`
				 */
				POND_DEPOSITED: (value: string | number) => `Deposited ${value} POND.`,
				/**
				 * @param value
				 * @returns `Depositing ${value} MPOND`
				 */
				MPOND: (value: string | number) => `Depositing ${value} MPOND.`,
				/**
				 * @param value
				 * @returns `Deposited ${value} MPOND`
				 */
				MPOND_DEPOSITED: (value: string | number) => `Deposited ${value} MPOND.`
			},
			APPROVE: {
				/**
				 * @param value
				 * @returns `Approving ${value} POND.`
				 */
				POND: (value: string | number) => `Approving ${value} POND.`,
				/**
				 * @param value
				 * @returns `Approved ${value} POND.`
				 */
				POND_APPROVED: (value: string | number) => `Approved ${value} POND.`,
				/**
				 * @param value
				 * @returns `Approving ${value} MPOND.`
				 */
				MPOND: (value: string | number) => `Approving ${value} MPOND.`,
				/**
				 * @param value
				 * @returns `Approved ${value} MPOND.`
				 */
				MPOND_APPROVED: (value: string | number) => `Approved ${value} MPOND.`
			},
			WITHDRAW: {
				/**
				 * @param value
				 * @returns `Withdrawing ${value} POND.`
				 */
				POND: (value: string | number) => `Withdrawing ${value} POND.`,
				/**
				 * @param value
				 * @returns `Withdrew ${value} POND.`
				 */
				POND_WITHDREW: (value: string | number) => `Withdrew ${value} POND.`,
				/**
				 * @param value
				 * @returns `Withdrawing ${value} MPOND.`
				 */
				MPOND: (value: string | number) => `Withdrawing ${value} MPOND.`,
				/**
				 * @param value
				 * @returns `Withdrew ${value} MPOND.`
				 */
				MPOND_WITHDREW: (value: string | number) => `Withdrew ${value} MPOND.`
			}
		}
	}
};
