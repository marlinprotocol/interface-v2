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

export const COMMON_TXN_MESSAGES = {
	INITIATED: {
		title: 'Initiating transaction',
		message: 'Transaction initiated, waiting for it to be created.'
	},
	CREATED: {
		title: 'Transaction created',
		message: 'Transaction created, waiting for it to be mined.'
	},
	SUCCESS: {
		title: 'Transaction successful',
		message: 'Transaction was successfully mined!'
	},
	FAILED: {
		title: 'Transaction failed',
		message: 'Uh-Oh, transaction was not successful!'
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

export const OYSTER_TXN_MESSAGES = {
	INIT_CHANGE_BANDWIDTH: {
		INITIATED: {
			title: 'Initiating bandwidth revision initiation',
			message: 'Initiating bandwidth revision initiation of job in Oyster'
		},
		CREATED: {
			title: 'Bandwidth revision initiation in progress',
			message: 'Bandwidth revision initiation of job in Oyster in progress'
		},
		SUCCESS: {
			title: 'Bandwidth revision successfully initiated',
			message: 'Successfully initiated bandwidth revision of job in Oyster'
		},
		FAILED: {
			title: 'Bandwidth revision initiation failed',
			message: 'Failed to initiate bandwidth revision of job in Oyster'
		}
	},
	FINAL_CHANGE_BANDWIDTH: {
		INITIATED: {
			title: 'Initiating bandwidth revision',
			message: 'Initiating bandwidth revision of job in Oyster'
		},
		CREATED: {
			title: 'Bandwidth revision initiation in progress',
			message: 'Bandwidth revision of job in Oyster in progress'
		},
		SUCCESS: {
			title: 'Bandwidth revision successfull',
			message: 'Successfully revised bandwidth of job in Oyster'
		},
		FAILED: {
			title: 'Bandwidth revision failed',
			message: 'Failed to revise bandwidth of job in Oyster'
		}
	},
	WITHDRAW: {
		INITIATED: {
			title: 'Initiating withdrawal',
			message: 'Initiating withdrawal of funds from job in Oyster'
		},
		CREATED: {
			title: 'Withdrawal in progress',
			message: 'Withdrawal of funds from job is in progress'
		},
		SUCCESS: {
			title: 'Withdrawal successful',
			message: 'Successfully withdrew funds from job in Oyster'
		},
		FAILED: {
			title: 'Withdrawal failed',
			message: 'Failed to withdraw funds from job in Oyster'
		}
	},
	ADD_FUND: {
		INITIATED: {
			title: 'Initiating deposit',
			message: 'Initiating deposit of funds to job in Oyster'
		},
		CREATED: {
			title: 'Deposit in progress',
			message: 'Deposit of funds to job is in progress'
		},
		SUCCESS: {
			title: 'Deposit successful',
			message: 'Successfully deposited funds to job in Oyster'
		},
		FAILED: {
			title: 'Deposit failed',
			message: 'Failed to deposit funds in job'
		}
	},
	CANCEL_STOP: {
		INITIATED: {
			title: 'Initiating rate revise cancellation',
			message: 'Initiating cancellation of rate revision in Oyster job'
		},
		CREATED: {
			title: 'Rate revise cancellation in progress',
			message: 'Cancellation of rate revision in Oyster job is in progress'
		},
		SUCCESS: {
			title: 'Rate revision cancelled successfully',
			message: 'Successfully cancelled rate revision for Oyster job'
		},
		FAILED: {
			title: 'Rate revision cancellation failed',
			message: 'Failed to cancel rate revision for Oyster job'
		}
	},
	REGISTER_OPERATOR: {
		INITIATED: {
			title: 'Initiating registration',
			message: 'Initiating registration as an operator on Oyster'
		},
		CREATED: {
			title: 'Registration in progress',
			message: 'Registration you as an operator in Oyster in progress'
		},
		SUCCESS: {
			title: 'Registration successful',
			message: 'Successfully registered as an operator on Oyster'
		},
		FAILED: {
			title: 'Registration failed',
			message: 'Failed to register you as an operator on Oyster'
		}
	},
	UPDATE_CP_URL: {
		INITIATED: {
			title: 'Initiating control plane update',
			message: 'Initiating CP url update for operator in Oyster'
		},
		CREATED: {
			title: 'Control plane update in progress',
			message: 'Control plane url update in progress for operator in Oyster'
		},
		SUCCESS: {
			title: 'Control plane update successful',
			message: 'Successfully updated control plane url for operator in Oyster'
		},
		FAILED: {
			title: 'Control plane update failed',
			message: 'Failed to update control plane url for operator in Oyster'
		}
	},
	REMOVE_OPERATOR: {
		INITIATED: {
			title: 'Initiating unregistration',
			message: 'Initiating unregistration of operator from Oyster'
		},
		CREATED: {
			title: 'Unregisteration in progress',
			message: 'Unregistering operator from Oyster in progress'
		},
		SUCCESS: {
			title: 'Unregisteration successful',
			message: 'Successfully unregistered operator from Oyster'
		},
		FAILED: {
			title: 'Unregisteration failed',
			message: 'Failed to unregister operator from Oyster'
		}
	},
	CREATE_JOB: {
		INITIATED: {
			title: 'Initiating job creation',
			message: 'Initiating creation of a new job in oyster'
		},
		CREATED: {
			title: 'Job creation in progress',
			message: 'Job creation in oyster is in progress'
		},
		SUCCESS: {
			title: 'Job creation successful',
			message: 'Successfully created a new job in oyster'
		},
		FAILED: {
			title: 'Job creation failed',
			message: 'Failed to create a new job in oyster'
		}
	},
	STOP_JOB: {
		INITIATED: {
			title: 'Initiating job stop',
			message: 'Initiating stop of a new job in oyster'
		},
		CREATED: {
			title: 'Job stop in progress',
			message: 'Job stop in oyster is in progress'
		},
		SUCCESS: {
			title: 'Job stop successful',
			message: 'Successfully stoppd the job in oyster'
		},
		FAILED: {
			title: 'Job stop failed',
			message: 'Failed to stop job in oyster'
		}
	},
	SETTLE_JOB: {
		INITIATED: {
			title: 'Initiating job settlement',
			message: 'Initiating job settlement for Oyster'
		},
		CREATED: {
			title: 'Job settlement in progress',
			message: 'Job settlement in progress for Oyster'
		},
		SUCCESS: {
			title: 'Job settled successfully',
			message: 'Successfully settled job in Oyster'
		},
		FAILED: {
			title: 'Job settlement failed',
			message: 'Failed to settle job in Oyster'
		}
	},
	UPDATE_ENCLAVE_URL_JOB: {
		INITIATED: {
			title: 'Initiating enclave url update',
			message: 'Initiating enclave url update for Oyster job'
		},
		CREATED: {
			title: 'Enclave url update in progress',
			message: 'Enclave url update in progress for Oyster job'
		},
		SUCCESS: {
			title: 'Enclave url update successfully',
			message: 'Successfully updated enclave url for Oyster job'
		},
		FAILED: {
			title: 'Enclave url update failed',
			message: 'Failed to update enclave url for Oyster job'
		}
	}
};

export const OYSTER_CREDIT_TXN_MESSAGES = {
	ADD_CREDITS_JOB: {
		INITIATED: {
			message: 'Initiating addition of credits to oyster job'
		},
		CREATED: {
			message: 'Adding credits to your oyster job'
		},
		SUCCESS: {
			message: 'Credits added to your oyster job'
		},
		FAILED: {
			message: 'Failed to add credits to oyster job'
		}
	},
	WITHDRAW_JOB_CREDIT: {
		INITIATED: {
			message: 'Initiating oyster credit job withdrawal'
		},
		CREATED: {
			message: 'Withdrawing credits from oyster job'
		},
		SUCCESS: {
			message: 'Withdrew credits from oyster job'
		},
		FAILED: {
			message: 'Failed to withdraw credits from oyster job'
		}
	},
	STOP_CREDIT_JOB: {
		INITIATED: {
			message: 'Initiating credit job stop'
		},
		CREATED: {
			message: 'Initiated credit job stop'
		},
		SUCCESS: {
			message: 'Stopping credit job'
		},
		FAILED: {
			message: 'Stopped credit job'
		}
	},
	CREATE_JOB_WITH_CREDIT: {
		INITIATED: {
			message: 'Initiating oyster job creation using credits'
		},
		CREATED: {
			message: 'Creating a new oyster job using credits'
		},
		SUCCESS: {
			message: 'Created a new oyster job using credits'
		},
		FAILED: {
			message: 'Failed to create a new oyster job usin credits'
		}
	},
	FINAL_CHANGE_BANDWIDTH: {
		INITIATED: {
			message: 'Initiating bandwidth rate revision'
		},
		CREATED: {
			message: 'Revising bandwidth rate'
		},
		SUCCESS: {
			message: 'Revised bandwidth rate'
		},
		FAILED: {
			message: 'Failed bandwidth rate revision'
		}
	},
	INIT_CHANGE_BANDWIDTH: {
		INITIATED: {
			message: 'Initiating bandwidth rate revision'
		},
		CREATED: {
			message: 'Initiating bandwidth revision'
		},
		SUCCESS: {
			message: 'Initiated bandwidth revision'
		},
		FAILED: {
			message: 'Failed bandwidth rate initialization'
		}
	},
	CANCEL: {
		INITITATED: 'Initiating rate revision cancellation.',
		CREATED: 'Cancelling rate revision.',
		SUCCESS: 'Cancelled rate revision.',
		FAILED: 'Failed to cancel rate revision.'
	},
	AMEND_RATE_JOB: {
		INITIATED: 'Initiating rate revision initiation.',
		CREATED: 'Initiating rate revision.',
		SUCCESS: 'Initiated rate revision.',
		FAILED: 'Failed to initiate rate revision.'
	}
};

export const KALYPSO_TXN_MESSAGES = {
	UNREGISTER_KALYPSO: {
		INITIATED: {
			title: 'Unregistration initiated',
			message: 'Initiating unregistration from Kalypso'
		},
		CREATED: {
			title: 'Unregister in progress',
			message: 'Unregistering you from Kalypso'
		},
		SUCCESS: {
			title: 'Successfully unregistered',
			message: 'Successfully unregistered from Kalypso'
		},
		FAILED: {
			title: 'Failed to unregister',
			message: 'Failed to unregister you from Kalypso'
		}
	},
	REGISTER_KALYPSO: {
		INITIATED: {
			title: 'Register initiated',
			message: 'Initiating registration in Kalypso'
		},
		CREATED: {
			title: 'Registering in progress',
			message: 'Registering you in Kalypso'
		},
		SUCCESS: {
			title: 'Successfully registered',
			message: 'Successfully registered in Kalypso!'
		},
		FAILED: {
			title: 'Failed to register',
			message: 'Failed to register you in Kalypso'
		}
	},
	UPDATE_KALYPSO: {
		INITIATED: {
			title: 'Update initiated',
			message: 'Initiating update of reward address in Kalypso'
		},
		CREATED: {
			title: 'Update in progress',
			message: 'Updating your reward address in Kalypso'
		},
		SUCCESS: {
			title: 'Successfully updated',
			message: 'Successfully updated reward address in Kalypso'
		},
		FAILED: {
			title: 'Failed to update',
			message: 'Failed to update reward address in Kalypso'
		}
	},
	INCREASE_STAKE_KALYPSO: {
		INITIATED: {
			title: 'Increase stake initiated',
			message: (value: string) =>
				`Initiating increase stake by ${removeTrailingZeros(value)} in Kalypso`
		},
		CREATED: {
			title: 'Stake increase in progress',
			message: (value: string) => `Increasing stake by ${removeTrailingZeros(value)} in Kalypso`
		},
		SUCCESS: {
			title: 'Successfully increased stake',
			message: (value: string) =>
				`Successfully added ${removeTrailingZeros(value)} stake in Kalypso`
		},
		FAILED: {
			title: 'Failed stake increase',
			message: 'Failed to increase stake in Kalypso'
		}
	},
	DECREASE_STAKE_KALYPSO: {
		INITIATED: {
			title: 'Decrease stake initiated',
			message: (value: string) => `Initiating decrease stake by ${value} in Kalypso`
		},
		CREATED: {
			title: 'Stake decrease in progress',
			message: (value: string) => `Withdrawing ${value} stake from Kalypso`
		},
		SUCCESS: {
			title: 'Successfully decreased stake',
			message: (value: string) => `Successfully withdrew ${value} stake from Kalypso`
		},
		FAILED: {
			title: 'Failed stake decrease',
			message: 'Failed to decrease stake from Kalypso'
		}
	},
	INITIATE_DECREASE_STAKE_KALYPSO: {
		INITIATED: {
			title: 'Initiating stake decrease',
			message: 'Initiating decrease stake in Kalypso'
		},
		CREATED: {
			title: 'Stake decrease initiation in progress',
			message: 'Requesting stake decrease in Kalypso'
		},
		SUCCESS: {
			title: 'Successfully initiated',
			message: 'Successfully initiated stake decrease in Kalypso'
		},
		FAILED: {
			title: 'Failed to initiate',
			message: 'Failed to initiate stake decrease in Kalypso'
		}
	},
	INCREASE_DECLARED_COMPUTE_KALYPSO: {
		INITIATED: {
			title: 'Increase declared compute initiated',
			message: 'Initiating declared compute increase in Kalypso'
		},
		CREATED: {
			title: 'Declared compute increase in progress',
			message: 'Increasing your declared compute in Kalypso'
		},
		SUCCESS: {
			title: 'Successfully increased declared compute',
			message: 'Successfully increased declared compute in Kalypso'
		},
		FAILED: {
			title: 'Failed declared compute increase',
			message: 'Failed to increase declared compute in Kalypso'
		}
	},
	INITIATE_DECREASE_DECLARED_COMPUTE_KALYPSO: {
		INITIATED: {
			title: 'Initiating declared compute decrease',
			message: 'Initiating intend to decrease declared compute in Kalypso'
		},
		CREATED: {
			title: 'Declared compute decrease initiate in progress',
			message: 'Requesting to initiate decrease declared compute in Kalypso'
		},
		SUCCESS: {
			title: 'Successfully initiated',
			message: 'Successfully initiated decrease declared compute in Kalypso'
		},
		FAILED: {
			title: 'Failed to initiate',
			message: 'Failed to initiate declared compute decrease in Kalypso'
		}
	},
	DECREASE_DECLARED_COMPUTE_KALYPSO: {
		INITIATED: {
			title: 'Declared compute decrease initiated',
			message: 'Initiating decrease declared compute in Kalypso'
		},
		CREATED: {
			title: 'Decreasing declared compute',
			message: 'Decreasing declared compute in Kalypso'
		},
		SUCCESS: {
			title: 'Successfully decreased declared compute',
			message: 'Successfully decreased declared compute in Kalypso'
		},
		FAILED: {
			title: 'Failed declared compute decrease',
			message: 'Failed to decrease declared compute in Kalypso'
		}
	}
};

export const BRIDGE_TXN_MESSAGES = {
	CONVERT: {
		POND_TO_MPOND: {
			INITIATING: {
				title: 'Conversion initiated',
				message: (value: string) =>
					`Initiating conversion of POND to ${removeTrailingZeros(value)} MPond.`
			},
			CREATED: {
				title: 'Conversion in progress',
				message: (value: string) => `Converting to ${removeTrailingZeros(value)} MPond.`
			},
			SUCCESS: {
				title: 'Conversion successful',
				message: (value: string) => `Converted to ${removeTrailingZeros(value)} MPond.`
			},
			FAILED: {
				title: 'Conversion failed',
				message: 'Unable to convert POND to MPond'
			}
		},
		MPOND_TO_POND: {
			INITIATE: {
				title: 'Conversion initiated',
				message: (value: string) =>
					`Initiating conversion of ${removeTrailingZeros(value)} MPond to POND.`
			},
			CREATED: {
				title: 'Conversion in progress',
				message: (value: string) => `Converting ${removeTrailingZeros(value)} MPond to POND.`
			},
			SUCCESS: {
				title: 'Conversion successful',
				message: (value: string) => `Converted ${removeTrailingZeros(value)} MPond to POND.`
			},
			FAILED: {
				title: 'Conversion failed',
				message: 'Unable to convert MPond to POND'
			}
		}
	},
	REQUEST: {
		INITIATE: {
			title: 'Initiating request',
			message: (value: string | number) =>
				`Initiating request for ${value} MPond to be converted to POND.`
		},
		CREATED: {
			title: 'Requesting conversion',
			message: (value: string | number) => `Requesting ${value} MPond to be converted to POND.`
		},
		SUCCESS: {
			title: 'Conversion request successful',
			message: (value: string | number) => `Requested ${value} MPond to be converted to POND.`
		},
		FAILED: {
			title: 'Conversion request failed',
			message: 'MPond conversion request has failed.'
		}
	},
	CANCEL: {
		INITIATE: {
			title: 'Initiating cancellation',
			message: 'Initiating cancellation of request for conversion of MPond to POND.'
		},
		CREATED: {
			title: 'Cancelling request',
			message: 'Cancelling request for conversion of MPond to POND.'
		},
		SUCCESS: {
			title: 'Request cancelled',
			message: 'Cancelled request for conversion of MPond to POND.'
		},
		FAILED: {
			title: 'Cancellation failed',
			message: 'Unable to cancel request for converting MPond to POND.'
		}
	}
};

export const RECEIVER_REWARDS_TXN_MESSAGES = {
	INITIATE: {
		INITIATED: {
			message: 'Initiating receiver rewards.'
		},
		CREATED: {
			message: 'Receiver rewards initiation in progress'
		},
		SUCCESS: {
			message: 'Successfully initiated receiver rewards'
		},
		FAILED: {
			message: 'Failed to initiate receiver rewards'
		}
	},
	ADD_BALANCE: {
		INITIATED: {
			message: (value: string) =>
				`Initiating adding ${removeTrailingZeros(value)} POND to rewards balance`
		},
		CREATED: {
			message: (value: string) => `Adding ${removeTrailingZeros(value)} POND to rewards balance`
		},
		SUCCESS: {
			message: (value: string) =>
				`Successfully added ${removeTrailingZeros(value)} POND to rewards balance`
		},
		FAILED: {
			message: (value: string) =>
				`Failed to add ${removeTrailingZeros(value)} POND to rewards balance`
		}
	},
	UPDATE_REWARDS: {
		INITIATED: {
			message: (value: string) =>
				`Initiating update ticket rewards to ${removeTrailingZeros(value)} POND`
		},
		CREATED: {
			message: (value: string) => `Updating ticket rewards to ${removeTrailingZeros(value)} POND`
		},
		SUCCESS: {
			message: (value: string) =>
				`Successfully update ticket rewards to ${removeTrailingZeros(value)} POND`
		},
		FAILED: {
			message: (value: string) =>
				`Failed to update ticket rewards to ${removeTrailingZeros(value)} POND`
		}
	}
};

export const RECEIVER_STAKING_TXN_MESSAGES = {
	UPDATE_SIGNER: {
		INITIATED: {
			message: 'Initiating signer address update'
		},
		CREATED: {
			message: (address: string) => `Updating signer address to ${address}`
		},
		SUCCESS: {
			message: (address: string) => `Succesfully updated signer address to ${address}`
		},
		FAILED: {
			message: (address: string) => `Failed to update singer address to ${address}`
		}
	},
	DEPOSIT_STAKE: {
		INITIATED: {
			message: 'Initiating deposit for staking'
		},
		CREATED: {
			message: (value: string) => `Depositing ${removeTrailingZeros(value)} POND for staking`
		},
		SUCCESS: {
			message: (value: string) =>
				`Successfully deposited ${removeTrailingZeros(value)} POND as stake`
		},
		FAILED: {
			message: (value: string) => `Failed to deposit ${removeTrailingZeros(value)} POND as stake`
		}
	},
	DEPOSIT_AND_SET_SIGNER: {
		INITIATED: {
			message: 'Initiating deposit and setting signer address'
		},
		CREATED: {
			message: (value: string) =>
				`Depositing ${removeTrailingZeros(value)} POND for staking and setting signer address`
		},
		SUCCESS: {
			message: (value: string) =>
				`Successfully deposited ${removeTrailingZeros(value)} POND as stake and set signer address`
		},
		FAILED: {
			message: (value: string) =>
				`Failed to deposit ${removeTrailingZeros(value)} POND as stake and set signer address`
		}
	},
	WITHDRAW_STAKE: {
		INITIATED: {
			message: (value: string) =>
				`Initiating withdraw of ${removeTrailingZeros(value)} POND from stake`
		},
		CREATED: {
			message: (value: string) => `Withdrawing ${removeTrailingZeros(value)} POND from stake`
		},
		SUCCESS: {
			message: (value: string) =>
				`Successfully withdrew ${removeTrailingZeros(value)} POND from stake`
		},
		FAILED: {
			message: (value: string) => `Failed to withdraw ${removeTrailingZeros(value)} POND from stake`
		}
	}
};
