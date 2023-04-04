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
                POND: (value) => `Depositing ${value} POND.`,
                /**
                 * @param value
                 * @returns `Deposited ${value} POND.`
                 */
                POND_DEPOSITED: (value) => `Deposited ${value} POND.`,
                /**
                 * @param value
                 * @returns `Depositing ${value} MPOND`
                 */
                MPOND: (value) => `Depositing ${value} MPOND.`,
                /**
                 * @param value
                 * @returns `Deposited ${value} MPOND`
                 */
                MPOND_DEPOSITED: (value) => `Deposited ${value} MPOND.`
            },
            APPROVE: {
                /**
                 * @param value
                 * @returns `Approving ${value} POND.`
                 */
                POND: (value) => `Approving ${value} POND.`,
                /**
                 * @param value
                 * @returns `Approved ${value} POND.`
                 */
                POND_APPROVED: (value) => `Approved ${value} POND.`,
                /**
                 * @param value
                 * @returns `Approving ${value} MPOND.`
                 */
                MPOND: (value) => `Approving ${value} MPOND.`,
                /**
                 * @param value
                 * @returns `Approved ${value} MPOND.`
                 */
                MPOND_APPROVED: (value) => `Approved ${value} MPOND.`
            },
            WITHDRAW: {
                /**
                 * @param value
                 * @returns `Withdrawing ${value} POND.`
                 */
                POND: (value) => `Withdrawing ${value} POND.`,
                /**
                 * @param value
                 * @returns `Withdrew ${value} POND.`
                 */
                POND_WITHDREW: (value) => `Withdrew ${value} POND.`,
                /**
                 * @param value
                 * @returns `Withdrawing ${value} MPOND.`
                 */
                MPOND: (value) => `Withdrawing ${value} MPOND.`,
                /**
                 * @param value
                 * @returns `Withdrew ${value} MPOND.`
                 */
                MPOND_WITHDREW: (value) => `Withdrew ${value} MPOND.`
            },
            UPDATE_SIGNER: {
                /**
                 * @param address
                 * @returns `Updating signer address to ${address}.`
                 */
                UPDATING: (address) => `Updating signer address to ${address}.`,
                /**
                 * @param address
                 * @returns `Updated signer address to ${address}.`
                 */
                SUCCESS: (address) => `Updated signer address to ${address}.`
            },
            CONVERT: {
                /**
                 * @param value
                 * @returns `Converting ${value} POND`
                 */
                POND_TO_MPOND_CONVERTING: (value) => `Converting ${value} POND.`,
                /**
                 * @param value
                 * @returns `Converting ${value} MPOND`
                 */
                MPOND_TO_POND_CONVERTING: (value) => `Converting ${value} MPOND.`,
                /**
                 * @param value
                 * @returns `Converted ${value} POND`
                 */
                POND_TO_MPOND_CONVERTED: (value) => `Converted ${value} POND.`,
                /**
                 * @param value
                 * @returns `Converted ${value} MPOND`
                 */
                MPOND_TO_POND_CONVERTED: (value) => `Converted ${value} MPOND.`
            },
            REQUEST: {
                /**
                 * @param value
                 * @returns `Requesting ${value} MPOND to be converted to POND`
                 */
                MPOND_TO_POND_REQUESTING: (value) => `Requesting ${value} MPOND to be converted to POND.`,
                /**
                 * @param value
                 * @returns `Requested ${value} MPOND to be converted to POND`
                 */
                MPOND_TO_POND_REQUESTED: (value) => `Requested ${value} MPOND to be converted to POND.`,
                /**
                 * @returns 'Cancelling request for conversion of MPOND to POND.'
                 */
                MPOND_TO_POND_CANCELLING: 'Cancelling request for conversion of MPOND to POND.',
                /**
                 * @returns 'Cancelled request for conversion of MPOND to POND.'
                 */
                MPOND_TO_POND_CANCELLED: 'Cancelled request for conversion of MPOND to POND.'
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
//# sourceMappingURL=messages.js.map