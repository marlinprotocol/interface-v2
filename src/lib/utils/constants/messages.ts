export const MESSAGES = {
	TOAST: {
		TRANSACTION: {
			CREATED: 'Transaction created, waiting for it to be mined.',
			SUCCESS: 'Transaction successfully mined!',
			FAILED: 'Uh-Oh, Transaction was not successful!'
		},
		CONVERSION: {
			SUCCESS: 'Conversion successful',
			FAILED: 'Rejected conversion',
			CREATED: 'Conversion in progress...'
		},
		INIT_STOP: {
			SUCCESS: 'Initiated stop',
			FAILED: 'Initiate stop failed',
			CREATED: 'Initiating stop'
		},
		STOP_JOB: {
			SUCCESS: 'Job stopped',
			FAILED: 'Job stop failed',
			CREATED: 'Stopping Job'
		},
		WITHDRAW: {
			SUCCESS: 'Withdrawal successful',
			FAILED: 'Failed withdrawal',
			CREATED: 'Withdrawal in progress'
		},
		ADD_FUND: {
			SUCCESS: 'Adding funds successfully',
			FAILED: 'Adding funds failed',
			CREATED: 'Adding funds'
		},
		CANCEL_STOP: {
			SUCCESS: 'Job canceled',
			FAILED: 'Cancel failed',
			CREATED: 'Cancelling job'
		},
		APPROVAL: {
			SUCCESS: 'Approved',
			FAILED: 'Rejected',
			CREATED: 'Approval in progress...'
		},
		DEPLOY: {
			SUCCESS: 'Deployed successfully',
			FAILED: 'Rejected deployment',
			CREATED: 'Deployment in progress'
		},
		UNREGISTER_OPERATOR: {
			SUCCESS: 'Unregistered',
			FAILED: 'Unregistration failed',
			CREATED: 'Unregistration in progress'
		},
		REGISTER_OPERATOR: {
			SUCCESS: 'Registration successful',
			FAILED: 'Registration failed',
			CREATED: 'Registration in progress'
		},
		UPDATE_OPERATOR: {
			SUCCESS: 'Update successful',
			FAILED: 'Update failed',
			CREATED: 'Update in progress'
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
				POND_TO_MPOND_CONVERTING: (value: string | number) => `Converting to ${value} MPOND.`,
				/**
				 * @param value
				 * @returns `Converting ${value} MPOND`
				 */
				MPOND_TO_POND_CONVERTING: (value: string | number) => `Converting ${value} MPOND.`,
				/**
				 * @param value
				 * @returns `Converted ${value} POND`
				 */
				POND_TO_MPOND_CONVERTED: (value: string | number) => `Converted to ${value} MPOND.`,
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
				REGISTERING: 'Registering as an operator on Oyster.',
				REGISTERED: 'Registered as an operator.'
			},
			UPDATE: {
				UPDATING: 'Updating your control plane url.',
				UPDATED: 'Updated your control plane url.'
			},
			REMOVE: {
				REMOVING: 'Removing you as an operator.',
				REMOVED: 'Removed you as an operator.'
			},
			CREATE_JOB: {
				CREATING: 'Creating a new job.',
				CREATED: 'Created a new job.'
			},
			CREATE_JOB_WITH_CREDIT: {
				CREATING: 'Creating a new job using credits.',
				CREATED: 'Created a new job using credits.'
			},
			STOP_JOB: {
				INITIATING: 'Initiating job stop.',
				INITIATED: 'Initiated job stop.',
				STOPPING: 'Stopping job.',
				STOPPED: 'Stopped job.'
			},
			STOP_CREDIT_JOB: {
				INITIATING: 'Initiating credit job stop.',
				INITIATED: 'Initiated credit job stop.',
				STOPPING: 'Stopping credit job.',
				STOPPED: 'Stopped credit job.'
			},
			WITHDRAW_JOB: {
				WITHDRAWING: 'Withdrawing funds from job.',
				WITHDRAWN: 'Withdrew funds from job.'
			},
			WITHDRAW_JOB_CREDIT: {
				WITHDRAWING: 'Withdrawing credits from job.',
				WITHDRAWN: 'Withdrew credits from job.'
			},
			ADD_FUNDS_JOB: {
				ADDING_FUNDS: 'Adding funds to job.',
				FUNDS_ADDED: 'Funds added to job.'
			},
			ADD_CREDITS_JOB: {
				ADDING_CREDITS: 'Adding credits to job.',
				CREDITS_ADDED: 'Credits added to job.'
			},
			AMEND_RATE_JOB: {
				INITIATING: 'Initiating rate revision.',
				INITIATED: 'Initiated rate revision.',
				CANCELLING: 'Cancelling rate revision.',
				CANCELLED: 'Cancelled rate revision.',
				AMENDING: 'Revising rate.',
				AMENDED: 'Revised rate.'
			},
			SETTLE_JOB: {
				SETTLING: 'Settling job.',
				SETTLED: 'Job Settled.'
			},
			RECEIVER_REWARDS: {
				INITIATING: 'Initiating receiver rewards.',
				INITIATED: 'Receiver rewards initiated.',
				ADDING_BALANCE: (value: string | number) => `Adding ${value} POND to rewards balance.`,
				ADDED_BALANCE: (value: string | number) => `Added ${value} POND to rewards balance.`,
				UPDATING_REWARDS: (value: string | number) => `Updating ticket reward to ${value} POND.`,
				UPDATED_REWARDS: (value: string | number) => `Updated ticket reward to ${value} POND.`
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
