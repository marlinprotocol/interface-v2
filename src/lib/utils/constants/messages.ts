import { removeTrailingZeros } from '../helpers/commonHelper';

export const COMMON_TXN_MESSAGES = {
	INITIATED: {
		title: 'Initiating transaction',
		description: 'Transaction initiated, waiting for it to be created.'
	},
	CREATED: {
		title: 'Transaction created',
		description: 'Transaction created, waiting for it to be mined.'
	},
	SUCCESS: {
		title: 'Transaction successful',
		description: 'Transaction was successfully mined!'
	},
	FAILED: {
		title: 'Transaction failed',
		description: 'Uh-Oh, transaction was not successful!'
	}
};

export const TOKEN_TXN_MESSAGES = {
	INITIATED: {
		title: 'Approval initiated',
		description: (value: string, currency: string) =>
			`Initiating approval for ${removeTrailingZeros(value)} ${currency}.`
	},
	CREATED: {
		title: 'Approval in progress',
		description: (value: string, currency: string) =>
			`Approving ${removeTrailingZeros(value)} ${currency}.`
	},
	SUCCESS: {
		title: 'Approved',
		description: (value: string, currency: string) =>
			`Approved ${removeTrailingZeros(value)} ${currency}.`
	},
	FAILED: {
		title: 'Approval failed',
		description: (value: string, currency: string) =>
			`Failed to approve ${removeTrailingZeros(value)} ${currency}`
	}
};

export const OYSTER_TXN_MESSAGES = {
	INIT_CHANGE_BANDWIDTH: {
		INITIATED: {
			title: 'Initiating bandwidth revision initiation',
			description: 'Initiating bandwidth revision initiation of job in Oyster'
		},
		CREATED: {
			title: 'Bandwidth revision initiation in progress',
			description: 'Bandwidth revision initiation of job in Oyster in progress'
		},
		SUCCESS: {
			title: 'Bandwidth revision successfully initiated',
			description: 'Successfully initiated bandwidth revision of job in Oyster'
		},
		FAILED: {
			title: 'Bandwidth revision initiation failed',
			description: 'Failed to initiate bandwidth revision of job in Oyster'
		}
	},
	FINAL_CHANGE_BANDWIDTH: {
		INITIATED: {
			title: 'Initiating bandwidth revision',
			description: 'Initiating bandwidth revision of job in Oyster'
		},
		CREATED: {
			title: 'Bandwidth revision initiation in progress',
			description: 'Bandwidth revision of job in Oyster in progress'
		},
		SUCCESS: {
			title: 'Bandwidth revision successful',
			description: 'Successfully revised bandwidth of job in Oyster'
		},
		FAILED: {
			title: 'Bandwidth revision failed',
			description: 'Failed to revise bandwidth of job in Oyster'
		}
	},
	WITHDRAW: {
		INITIATED: {
			title: 'Initiating withdrawal',
			description: 'Initiating withdrawal of funds from job in Oyster'
		},
		CREATED: {
			title: 'Withdrawal in progress',
			description: 'Withdrawal of funds from job is in progress'
		},
		SUCCESS: {
			title: 'Withdrawal successful',
			description: 'Successfully withdrew funds from job in Oyster'
		},
		FAILED: {
			title: 'Withdrawal failed',
			description: 'Failed to withdraw funds from job in Oyster'
		}
	},
	ADD_FUND: {
		INITIATED: {
			title: 'Initiating deposit',
			description: 'Initiating deposit of funds to job in Oyster'
		},
		CREATED: {
			title: 'Deposit in progress',
			description: 'Deposit of funds to job is in progress'
		},
		SUCCESS: {
			title: 'Deposit successful',
			description: 'Successfully deposited funds to job in Oyster'
		},
		FAILED: {
			title: 'Deposit failed',
			description: 'Failed to deposit funds in job'
		}
	},
	CANCEL_STOP: {
		INITIATED: {
			title: 'Initiating rate revise cancellation',
			description: 'Initiating cancellation of rate revision in Oyster job'
		},
		CREATED: {
			title: 'Rate revise cancellation in progress',
			description: 'Cancellation of rate revision in Oyster job is in progress'
		},
		SUCCESS: {
			title: 'Rate revision cancelled successfully',
			description: 'Successfully cancelled rate revision for Oyster job'
		},
		FAILED: {
			title: 'Rate revision cancellation failed',
			description: 'Failed to cancel rate revision for Oyster job'
		}
	},
	REGISTER_OPERATOR: {
		INITIATED: {
			title: 'Initiating registration',
			description: 'Initiating registration as an operator on Oyster'
		},
		CREATED: {
			title: 'Registration in progress',
			description: 'Registration you as an operator in Oyster in progress'
		},
		SUCCESS: {
			title: 'Registration successful',
			description: 'Successfully registered as an operator on Oyster'
		},
		FAILED: {
			title: 'Registration failed',
			description: 'Failed to register you as an operator on Oyster'
		}
	},
	UPDATE_CP_URL: {
		INITIATED: {
			title: 'Initiating control plane update',
			description: 'Initiating CP url update for operator in Oyster'
		},
		CREATED: {
			title: 'Control plane update in progress',
			description: 'Control plane url update in progress for operator in Oyster'
		},
		SUCCESS: {
			title: 'Control plane update successful',
			description: 'Successfully updated control plane url for operator in Oyster'
		},
		FAILED: {
			title: 'Control plane update failed',
			description: 'Failed to update control plane url for operator in Oyster'
		}
	},
	REMOVE_OPERATOR: {
		INITIATED: {
			title: 'Initiating unregistration',
			description: 'Initiating unregistration of operator from Oyster'
		},
		CREATED: {
			title: 'Unregisteration in progress',
			description: 'Unregistering operator from Oyster in progress'
		},
		SUCCESS: {
			title: 'Unregisteration successful',
			description: 'Successfully unregistered operator from Oyster'
		},
		FAILED: {
			title: 'Unregisteration failed',
			description: 'Failed to unregister operator from Oyster'
		}
	},
	CREATE_JOB: {
		INITIATED: {
			title: 'Initiating job creation',
			description: 'Initiating creation of a new job in Oyster'
		},
		CREATED: {
			title: 'Job creation in progress',
			description: 'Job creation in Oyster is in progress'
		},
		SUCCESS: {
			title: 'Job creation successful',
			description: 'Successfully created a new job in Oyster'
		},
		FAILED: {
			title: 'Job creation failed',
			description: 'Failed to create a new job in Oyster'
		}
	},
	STOP_JOB: {
		INITIATED: {
			title: 'Initiating job stop',
			description: 'Initiating stop of a new job in Oyster'
		},
		CREATED: {
			title: 'Job stop in progress',
			description: 'Job stop in Oyster is in progress'
		},
		SUCCESS: {
			title: 'Job stop successful',
			description: 'Successfully stoppd the job in Oyster'
		},
		FAILED: {
			title: 'Job stop failed',
			description: 'Failed to stop job in Oyster'
		}
	},
	SETTLE_JOB: {
		INITIATED: {
			title: 'Initiating job settlement',
			description: 'Initiating job settlement for Oyster'
		},
		CREATED: {
			title: 'Job settlement in progress',
			description: 'Job settlement in progress for Oyster'
		},
		SUCCESS: {
			title: 'Job settled successfully',
			description: 'Successfully settled job in Oyster'
		},
		FAILED: {
			title: 'Job settlement failed',
			description: 'Failed to settle job in Oyster'
		}
	},
	UPDATE_ENCLAVE_URL_JOB: {
		INITIATED: {
			title: 'Initiating enclave url update',
			description: 'Initiating enclave url update for Oyster job'
		},
		CREATED: {
			title: 'Enclave url update in progress',
			description: 'Enclave url update in progress for Oyster job'
		},
		SUCCESS: {
			title: 'Enclave url update successfully',
			description: 'Successfully updated enclave url for Oyster job'
		},
		FAILED: {
			title: 'Enclave url update failed',
			description: 'Failed to update enclave url for Oyster job'
		}
	}
};

export const OYSTER_CREDIT_TXN_MESSAGES = {
	ADD_CREDITS_JOB: {
		INITIATED: {
			description: 'Initiating addition of credits to Oyster job'
		},
		CREATED: {
			description: 'Adding credits to your Oyster job'
		},
		SUCCESS: {
			description: 'Credits added to your Oyster job'
		},
		FAILED: {
			description: 'Failed to add credits to Oyster job'
		}
	},
	WITHDRAW_JOB_CREDIT: {
		INITIATED: {
			description: 'Initiating Oyster credit job withdrawal'
		},
		CREATED: {
			description: 'Withdrawing credits from Oyster job'
		},
		SUCCESS: {
			description: 'Withdrew credits from Oyster job'
		},
		FAILED: {
			description: 'Failed to withdraw credits from Oyster job'
		}
	},
	STOP_CREDIT_JOB: {
		INITIATED: {
			description: 'Initiating credit job stop'
		},
		CREATED: {
			description: 'Initiated credit job stop'
		},
		SUCCESS: {
			description: 'Stopping credit job'
		},
		FAILED: {
			description: 'Stopped credit job'
		}
	},
	CREATE_JOB_WITH_CREDIT: {
		INITIATED: {
			description: 'Initiating Oyster job creation using credits'
		},
		CREATED: {
			description: 'Creating a new Oyster job using credits'
		},
		SUCCESS: {
			description: 'Created a new Oyster job using credits'
		},
		FAILED: {
			description: 'Failed to create a new Oyster job usin credits'
		}
	},
	FINAL_CHANGE_BANDWIDTH: {
		INITIATED: {
			description: 'Initiating bandwidth rate revision'
		},
		CREATED: {
			description: 'Revising bandwidth rate'
		},
		SUCCESS: {
			description: 'Revised bandwidth rate'
		},
		FAILED: {
			description: 'Failed bandwidth rate revision'
		}
	},
	INIT_CHANGE_BANDWIDTH: {
		INITIATED: {
			description: 'Initiating bandwidth rate revision'
		},
		CREATED: {
			description: 'Initiating bandwidth revision'
		},
		SUCCESS: {
			description: 'Initiated bandwidth revision'
		},
		FAILED: {
			description: 'Failed bandwidth rate initialization'
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
			description: 'Initiating unregistration from Kalypso'
		},
		CREATED: {
			title: 'Unregister in progress',
			description: 'Unregistering you from Kalypso'
		},
		SUCCESS: {
			title: 'Successfully unregistered',
			description: 'Successfully unregistered from Kalypso'
		},
		FAILED: {
			title: 'Failed to unregister',
			description: 'Failed to unregister you from Kalypso'
		}
	},
	REGISTER_KALYPSO: {
		INITIATED: {
			title: 'Register initiated',
			description: 'Initiating registration in Kalypso'
		},
		CREATED: {
			title: 'Registering in progress',
			description: 'Registering you in Kalypso'
		},
		SUCCESS: {
			title: 'Successfully registered',
			description: 'Successfully registered in Kalypso!'
		},
		FAILED: {
			title: 'Failed to register',
			description: 'Failed to register you in Kalypso'
		}
	},
	UPDATE_KALYPSO: {
		INITIATED: {
			title: 'Update initiated',
			description: 'Initiating update of reward address in Kalypso'
		},
		CREATED: {
			title: 'Update in progress',
			description: 'Updating your reward address in Kalypso'
		},
		SUCCESS: {
			title: 'Successfully updated',
			description: 'Successfully updated reward address in Kalypso'
		},
		FAILED: {
			title: 'Failed to update',
			description: 'Failed to update reward address in Kalypso'
		}
	},
	INCREASE_STAKE_KALYPSO: {
		INITIATED: {
			title: 'Increase stake initiated',
			description: (value: string) =>
				`Initiating increase stake by ${removeTrailingZeros(value)} in Kalypso`
		},
		CREATED: {
			title: 'Stake increase in progress',
			description: (value: string) => `Increasing stake by ${removeTrailingZeros(value)} in Kalypso`
		},
		SUCCESS: {
			title: 'Successfully increased stake',
			description: (value: string) =>
				`Successfully added ${removeTrailingZeros(value)} stake in Kalypso`
		},
		FAILED: {
			title: 'Failed stake increase',
			description: 'Failed to increase stake in Kalypso'
		}
	},
	DECREASE_STAKE_KALYPSO: {
		INITIATED: {
			title: 'Decrease stake initiated',
			description: (value: string) => `Initiating decrease stake by ${value} in Kalypso`
		},
		CREATED: {
			title: 'Stake decrease in progress',
			description: (value: string) => `Withdrawing ${value} stake from Kalypso`
		},
		SUCCESS: {
			title: 'Successfully decreased stake',
			description: (value: string) => `Successfully withdrew ${value} stake from Kalypso`
		},
		FAILED: {
			title: 'Failed stake decrease',
			description: 'Failed to decrease stake from Kalypso'
		}
	},
	INITIATE_DECREASE_STAKE_KALYPSO: {
		INITIATED: {
			title: 'Initiating stake decrease',
			description: 'Initiating decrease stake in Kalypso'
		},
		CREATED: {
			title: 'Stake decrease initiation in progress',
			description: 'Requesting stake decrease in Kalypso'
		},
		SUCCESS: {
			title: 'Successfully initiated',
			description: 'Successfully initiated stake decrease in Kalypso'
		},
		FAILED: {
			title: 'Failed to initiate',
			description: 'Failed to initiate stake decrease in Kalypso'
		}
	},
	INCREASE_DECLARED_COMPUTE_KALYPSO: {
		INITIATED: {
			title: 'Increase declared compute initiated',
			description: 'Initiating declared compute increase in Kalypso'
		},
		CREATED: {
			title: 'Declared compute increase in progress',
			description: 'Increasing your declared compute in Kalypso'
		},
		SUCCESS: {
			title: 'Successfully increased declared compute',
			description: 'Successfully increased declared compute in Kalypso'
		},
		FAILED: {
			title: 'Failed declared compute increase',
			description: 'Failed to increase declared compute in Kalypso'
		}
	},
	INITIATE_DECREASE_DECLARED_COMPUTE_KALYPSO: {
		INITIATED: {
			title: 'Initiating declared compute decrease',
			description: 'Initiating intend to decrease declared compute in Kalypso'
		},
		CREATED: {
			title: 'Declared compute decrease initiate in progress',
			description: 'Requesting to initiate decrease declared compute in Kalypso'
		},
		SUCCESS: {
			title: 'Successfully initiated',
			description: 'Successfully initiated decrease declared compute in Kalypso'
		},
		FAILED: {
			title: 'Failed to initiate',
			description: 'Failed to initiate declared compute decrease in Kalypso'
		}
	},
	DECREASE_DECLARED_COMPUTE_KALYPSO: {
		INITIATED: {
			title: 'Declared compute decrease initiated',
			description: 'Initiating decrease declared compute in Kalypso'
		},
		CREATED: {
			title: 'Decreasing declared compute',
			description: 'Decreasing declared compute in Kalypso'
		},
		SUCCESS: {
			title: 'Successfully decreased declared compute',
			description: 'Successfully decreased declared compute in Kalypso'
		},
		FAILED: {
			title: 'Failed declared compute decrease',
			description: 'Failed to decrease declared compute in Kalypso'
		}
	}
};

export const BRIDGE_TXN_MESSAGES = {
	CONVERT: {
		POND_TO_MPOND: {
			INITIATED: {
				title: 'Conversion initiated',
				description: (value: string) =>
					`Initiating conversion of POND to ${removeTrailingZeros(value)} MPond.`
			},
			CREATED: {
				title: 'Conversion in progress',
				description: (value: string) => `Converting to ${removeTrailingZeros(value)} MPond.`
			},
			SUCCESS: {
				title: 'Conversion successful',
				description: (value: string) => `Converted to ${removeTrailingZeros(value)} MPond.`
			},
			FAILED: {
				title: 'Conversion failed',
				description: 'Unable to convert POND to MPond'
			}
		},
		MPOND_TO_POND: {
			INITIATED: {
				title: 'Conversion initiated',
				description: (value: string) =>
					`Initiating conversion of ${removeTrailingZeros(value)} MPond to POND.`
			},
			CREATED: {
				title: 'Conversion in progress',
				description: (value: string) => `Converting ${removeTrailingZeros(value)} MPond to POND.`
			},
			SUCCESS: {
				title: 'Conversion successful',
				description: (value: string) => `Converted ${removeTrailingZeros(value)} MPond to POND.`
			},
			FAILED: {
				title: 'Conversion failed',
				description: 'Unable to convert MPond to POND'
			}
		}
	},
	REQUEST: {
		INITIATED: {
			title: 'Initiating request',
			description: (value: string | number) =>
				`Initiating request for ${value} MPond to be converted to POND.`
		},
		CREATED: {
			title: 'Requesting conversion',
			description: (value: string | number) => `Requesting ${value} MPond to be converted to POND.`
		},
		SUCCESS: {
			title: 'Conversion request successful',
			description: (value: string | number) => `Requested ${value} MPond to be converted to POND.`
		},
		FAILED: {
			title: 'Conversion request failed',
			description: 'MPond conversion request has failed.'
		}
	},
	CANCEL: {
		INITIATED: {
			title: 'Initiating cancellation',
			description: 'Initiating cancellation of request for conversion of MPond to POND.'
		},
		CREATED: {
			title: 'Cancelling request',
			description: 'Cancelling request for conversion of MPond to POND.'
		},
		SUCCESS: {
			title: 'Request cancelled',
			description: 'Cancelled request for conversion of MPond to POND.'
		},
		FAILED: {
			title: 'Cancellation failed',
			description: 'Unable to cancel request for converting MPond to POND.'
		}
	}
};

export const RECEIVER_REWARDS_TXN_MESSAGES = {
	INITIATE: {
		INITIATED: {
			description: 'Initiating receiver rewards.'
		},
		CREATED: {
			description: 'Receiver rewards initiation in progress'
		},
		SUCCESS: {
			description: 'Successfully initiated receiver rewards'
		},
		FAILED: {
			description: 'Failed to initiate receiver rewards'
		}
	},
	ADD_BALANCE: {
		INITIATED: {
			description: (value: string) =>
				`Initiating adding ${removeTrailingZeros(value)} POND to rewards balance`
		},
		CREATED: {
			description: (value: string) => `Adding ${removeTrailingZeros(value)} POND to rewards balance`
		},
		SUCCESS: {
			description: (value: string) =>
				`Successfully added ${removeTrailingZeros(value)} POND to rewards balance`
		},
		FAILED: {
			description: (value: string) =>
				`Failed to add ${removeTrailingZeros(value)} POND to rewards balance`
		}
	},
	UPDATE_REWARDS: {
		INITIATED: {
			description: (value: string) =>
				`Initiating update ticket rewards to ${removeTrailingZeros(value)} POND`
		},
		CREATED: {
			description: (value: string) =>
				`Updating ticket rewards to ${removeTrailingZeros(value)} POND`
		},
		SUCCESS: {
			description: (value: string) =>
				`Successfully update ticket rewards to ${removeTrailingZeros(value)} POND`
		},
		FAILED: {
			description: (value: string) =>
				`Failed to update ticket rewards to ${removeTrailingZeros(value)} POND`
		}
	}
};

export const RECEIVER_STAKING_TXN_MESSAGES = {
	UPDATE_SIGNER: {
		INITIATED: {
			description: 'Initiating signer address update'
		},
		CREATED: {
			description: (address: string) => `Updating signer address to ${address}`
		},
		SUCCESS: {
			description: (address: string) => `Succesfully updated signer address to ${address}`
		},
		FAILED: {
			description: (address: string) => `Failed to update singer address to ${address}`
		}
	},
	DEPOSIT_STAKE: {
		INITIATED: {
			description: 'Initiating deposit for staking'
		},
		CREATED: {
			description: (value: string) => `Depositing ${removeTrailingZeros(value)} POND for staking`
		},
		SUCCESS: {
			description: (value: string) =>
				`Successfully deposited ${removeTrailingZeros(value)} POND as stake`
		},
		FAILED: {
			description: (value: string) =>
				`Failed to deposit ${removeTrailingZeros(value)} POND as stake`
		}
	},
	DEPOSIT_AND_SET_SIGNER: {
		INITIATED: {
			description: 'Initiating deposit and setting signer address'
		},
		CREATED: {
			description: (value: string) =>
				`Depositing ${removeTrailingZeros(value)} POND for staking and setting signer address`
		},
		SUCCESS: {
			description: (value: string) =>
				`Successfully deposited ${removeTrailingZeros(value)} POND as stake and set signer address`
		},
		FAILED: {
			description: (value: string) =>
				`Failed to deposit ${removeTrailingZeros(value)} POND as stake and set signer address`
		}
	},
	WITHDRAW_STAKE: {
		INITIATED: {
			description: (value: string) =>
				`Initiating withdraw of ${removeTrailingZeros(value)} POND from stake`
		},
		CREATED: {
			description: (value: string) => `Withdrawing ${removeTrailingZeros(value)} POND from stake`
		},
		SUCCESS: {
			description: (value: string) =>
				`Successfully withdrew ${removeTrailingZeros(value)} POND from stake`
		},
		FAILED: {
			description: (value: string) =>
				`Failed to withdraw ${removeTrailingZeros(value)} POND from stake`
		}
	}
};
