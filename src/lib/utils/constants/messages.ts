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
				MPOND_APPROVED: (value: string | number) => `Approved ${value} MPOND.`,
				/**
				 * @param value
				 * @returns `Approving ${value} POND.`
				 */
				APPROVING: (value: string | number, currency: string | undefined = 'POND') =>
					`Approving ${value} ${currency}.`,
				/**
				 * @param value
				 * @returns `Approved ${value} POND.`
				 */
				APPROVED: (value: string | number, currency: string | undefined = 'POND') =>
					`Approved ${value} ${currency}.`
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
			},
			UPDATE_SIGNER: {
				/**
				 * @param address
				 * @returns `Updating signer address to ${address}.`
				 */
				UPDATING: (address: string) => `Updating signer address to ${address}.`,
				/**
				 * @param address
				 * @returns `Updated signer address to ${address}.`
				 */
				SUCCESS: (address: string) => `Updated signer address to ${address}.`
			},
			CONVERT: {
				/**
				 * @param value
				 * @returns `Converting ${value} POND`
				 */
				POND_TO_MPOND_CONVERTING: (value: string | number) => `Converting ${value} POND.`,
				/**
				 * @param value
				 * @returns `Converting ${value} MPOND`
				 */
				MPOND_TO_POND_CONVERTING: (value: string | number) => `Converting ${value} MPOND.`,
				/**
				 * @param value
				 * @returns `Converted ${value} POND`
				 */
				POND_TO_MPOND_CONVERTED: (value: string | number) => `Converted ${value} POND.`,
				/**
				 * @param value
				 * @returns `Converted ${value} MPOND`
				 */
				MPOND_TO_POND_CONVERTED: (value: string | number) => `Converted ${value} MPOND.`
			},
			REQUEST: {
				/**
				 * @param value
				 * @returns `Requesting ${value} MPOND to be converted to POND`
				 */
				MPOND_TO_POND_REQUESTING: (value: string | number) =>
					`Requesting ${value} MPOND to be converted to POND.`,
				/**
				 * @param value
				 * @returns `Requested ${value} MPOND to be converted to POND`
				 */
				MPOND_TO_POND_REQUESTED: (value: string | number) =>
					`Requested ${value} MPOND to be converted to POND.`,
				/**
				 * @returns 'Cancelling request for conversion of MPOND to POND.'
				 */
				MPOND_TO_POND_CANCELLING: 'Cancelling request for conversion of MPOND to POND.',
				/**
				 * @returns 'Cancelled request for conversion of MPOND to POND.'
				 */
				MPOND_TO_POND_CANCELLED: 'Cancelled request for conversion of MPOND to POND.'
			},
			REGISTER: {
				REGISTERING: 'Registering you as a merchant.',
				REGISTERED: 'Registered you as a merchant.'
			},
			UPDATE: {
				UPDATING: 'Updating your control plane url.',
				UPDATED: 'Updated your control plane url.'
			},
			REMOVE: {
				REMOVING: 'Removing you as a merchant.',
				REMOVED: 'Removed you as a merchant.'
			},
			CREATE_JOB: {
				CREATING: 'Creating a new job.',
				CREATED: 'Created a new job.'
			},
			STOP_JOB: {
				INITIATING: 'Initiating job stop.',
				INITIATED: 'Initiated job stop.',
				STOPPING: 'Stopping job.',
				STOPPED: 'Stopped job.'
			},
			WITHDRAW_JOB: {
				WITHDRAWING: 'Withdrawing funds from job.',
				WITHDRAWN: 'Withdrew funds from job.'
			},
			ADD_FUNDS_JOB: {
				ADDING_FUNDS: 'Adding funds to job.',
				FUNDS_ADDED: 'Funds added to job.'
			},
			AMEND_RATE_JOB: {
				INITIATING: 'Initiating rate amendment.',
				INITIATED: 'Initiated rate amendment.',
				AMENDING: 'Amending rate.',
				AMENDED: 'Amended rate.'
			}
		}
	},

	FORM: {
		VALIDATION: {
			ADDRESS: 'Please enter a valid address.',
			ADDRESS_SAME: 'Please enter a different address from your current signer address.',
			SIGNER_EXISTS: 'Signer address already in use.'
		}
	}
};
