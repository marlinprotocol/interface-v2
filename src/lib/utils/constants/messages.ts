import { removeTrailingZeros } from '../helpers/commonHelper';

export const MESSAGES = {
	TOAST: {
		TRANSACTION: {
			CREATED: 'Transaction created, waiting for it to be mined.',
			SUCCESS: 'Transaction successfully mined!',
			FAILED: 'Uh-Oh, transaction was not successful!'
		},
		CONVERSION: {
			SUCCESS: 'Conversion successful',
			FAILED: 'Rejected conversion',
			CREATED: 'Conversion in progress...'
		},
		CANCEL_CONVERSION: {
			SUCCESS: 'Cancellation successful',
			FAILED: 'Conversion cancelled',
			CREATED: 'Cancellation in progress...'
		},
		INIT_STOP: {
			SUCCESS: 'Initiated stop',
			FAILED: 'Initiate stop failed',
			CREATED: 'Initiating stop'
		},
		INIT_CHANGE_BANDWIDTH: {
			SUCCESS: 'Initiated bandwidth revision',
			FAILED: 'Failed initialization',
			CREATED: 'Initiating bandwidth revision'
		},
		FINAL_CHANGE_BANDWIDTH: {
			SUCCESS: 'Revised bandwidth rate',
			FAILED: 'Failed revision',
			CREATED: 'Revising bandwidth rate'
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
		UNREGISTER_KALYPSO: {
			SUCCESS: {
				title: 'Successfully unregistered',
				message: 'Successfully unregistered from Kalypso'
			},
			FAILED: {
				title: 'Failed to unregister',
				message: 'Failed to unregister you from Kalypso'
			},
			CREATED: {
				title: 'Unregistering',
				message: 'Unregistering you from Kalypso'
			}
		},
		REGISTER_KALYPSO: {
			SUCCESS: {
				title: 'Successfully registered in Kalypso!',
				message: 'Successfully registered in Kalypso!'
			},
			FAILED: {
				title: 'Failed to register you in Kalypso?',
				message: 'Failed to register you in Kalypso'
			},
			CREATED: {
				title: 'Registering you in Kalypso?',
				message: 'Registering you in Kalypso'
			}
		},
		UPDATE_KALYPSO: {
			SUCCESS: {
				title: 'Successful Update',
				message: 'Successfully updated reward address in Kalypso'
			},
			FAILED: {
				title: 'Failed Update',
				message: 'Failed to update reward address in Kalypso'
			},
			CREATED: {
				title: 'Updating',
				message: 'Updating your reward address in Kalypso'
			}
		},
		INCREASE_STAKE_KALYPSO: {
			SUCCESS: {
				title: 'Successfully increased stake',
				message: (value: string | number) => `Successfully added ${value} stake in Kalypso`
			},
			FAILED: {
				title: 'Failed stake increase',
				message: 'Failed to increase stake in Kalypso'
			},
			CREATED: {
				title: 'Initiating stake increase',
				message: (value: string | number) => `Adding ${value} to stake in Kalypso`
			}
		},
		DECREASE_STAKE_KALYPSO: {
			SUCCESS: {
				title: 'Successfully decreased stake',
				message: (value: string | number) => `Successfully withdrew ${value} stake from Kalypso`
			},
			FAILED: {
				title: 'Failed stake decrease',
				message: 'Failed to decrease stake from Kalypso'
			},
			CREATED: {
				title: 'Initiating stake decrease',
				message: (value: string | number) => `Withdrawing ${value} stake from Kalypso`
			}
		},
		INITIATE_DECREASE_STAKE_KALYPSO: {
			SUCCESS: {
				title: 'Successfully initiated',
				message: 'Successfully initiated decrease stake in Kalypso'
			},
			FAILED: {
				title: 'Failed to initiate',
				message: 'Failed to initiate stake decrease in Kalypso'
			},
			CREATED: {
				title: 'Initiating stake decrease',
				message: 'Initiating decrease stake in Kalypso'
			}
		},
		INCREASE_DECLARED_COMPUTE_KALYPSO: {
			SUCCESS: {
				title: 'Successfully increased declared compute',
				message: 'Successfully added declared compute in Kalypso'
			},
			FAILED: {
				title: 'Failed declared compute increase',
				message: 'Failed to increase declared compute in Kalypso'
			},
			CREATED: {
				title: 'Initiating declared compute increase',
				message: 'Adding to declared compute in Kalypso'
			}
		},
		INITIATE_DECREASE_DECLARED_COMPUTE_KALYPSO: {
			SUCCESS: {
				title: 'Successfully initiated',
				message: 'Successfully initiated decrease declared compute in Kalypso'
			},
			FAILED: {
				title: 'Failed to initiate',
				message: 'Failed to initiate declared compute decrease in Kalypso'
			},
			CREATED: {
				title: 'Initiating declared compute decrease',
				message: 'Initiating decrease declared compute in Kalypso'
			}
		},
		DECREASE_DECLARED_COMPUTE_KALYPSO: {
			SUCCESS: {
				title: 'Successfully decreased declared compute',
				message: 'Successfully decreased declared compute in Kalypso'
			},
			FAILED: {
				title: 'Failed declared compute decrease',
				message: 'Failed to decrease declared compute in Kalypso'
			},
			CREATED: {
				title: 'Decreasing declared compute',
				message: 'Decreasing declared compute in Kalypso'
			}
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
				MPOND: (value: string | number) => `Depositing ${value} MPond.`,
				/**
				 * @param value
				 * @returns `Deposited ${value} MPOND`
				 */
				MPOND_DEPOSITED: (value: string | number) => `Deposited ${value} MPond.`
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
				MPOND: (value: string | number) => `Approving ${value} MPond.`,
				/**
				 * @param value
				 * @returns `Approved ${value} MPONDond				 */
				MPOND_APPROVED: (value: string | number) => `Approved ${value} MPond.`,
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
				MPOND: (value: string | number) => `Withdrawing ${value} MPond.`,
				/**
				 * @param value
				 * @returns `Withdrew ${value} MPOND.`
				 */
				MPOND_WITHDREW: (value: string | number) => `Withdrew ${value} MPond.`
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
				POND_TO_MPOND_CONVERTING: (value: string | number) => `Converting to ${value} MPond.`,
				/**
				 * @param value
				 * @returns `Converting ${value} MPOND`
				 */
				MPOND_TO_POND_CONVERTING: (value: string | number) => `Converting ${value} MPond.`,
				/**
				 * @param value
				 * @returns `Converted ${value} POND`
				 */
				POND_TO_MPOND_CONVERTED: (value: string | number) => `Converted to ${value} MPond.`,
				/**
				 * @param value
				 * @returns `Converted ${value} MPOND`
				 */
				MPOND_TO_POND_CONVERTED: (value: string | number) => `Converted ${value} MPond.`
			},
			REQUEST: {
				/**
				 * @param value
				 * @returns `Requesting ${value} MPOND to be converted to POND`
				 */
				MPOND_TO_POND_REQUESTING: (value: string | number) =>
					`Requesting ${value} MPond to be converted to POND.`,
				/**
				 * @param value
				 * @returns `Requested ${value} MPOND to be converted to POND`
				 */
				MPOND_TO_POND_REQUESTED: (value: string | number) =>
					`Requested ${value} MPond to be converted to POND.`,
				/**
				 * @returns 'Cancelling request for conversion of MPOND to POND.'
				 */
				MPOND_TO_POND_CANCELLING: 'Cancelling request for conversion of MPond to POND.',
				/**
				 * @returns 'Cancelled request for conversion of MPOND to POND.'
				 */
				MPOND_TO_POND_CANCELLED: 'Cancelled request for conversion of MPond to POND.'
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
				SETTLING: 'Settling job',
				SETTLED: 'Job Settled',
				FAILED: 'Failed'
			},
			UPDATE_ENCLAVE_URL_JOB: {
				UPDATING: 'Updating enclave url.',
				UPDATED: 'Updated enclave url.'
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
	}
};

export const TOKEN_TXN_MESSAGES = {
	INITIATING: {
		title: 'Approval initiated',
		message: (value: string, currency: string) =>
			`Initiating approval for ${removeTrailingZeros(value)} ${currency}.`
	},
	APPROVING: {
		title: 'Approval in progress',
		message: (value: string, currency: string) =>
			`Approving ${removeTrailingZeros(value)} ${currency}.`
	},
	APPROVED: {
		title: 'Approved',
		message: (value: string, currency: string) =>
			`Approved ${removeTrailingZeros(value)} ${currency}.`
	},
	FAILED: {
		title: 'Approval failed',
		message: (value: string, currency: string) =>
			`Failed to approve ${removeTrailingZeros(value)} ${currency}`
	}
};
