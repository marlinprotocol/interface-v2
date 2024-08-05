import { describe, it, expect } from 'vitest';
import {
	modifyReceiverStakingData,
	modifyAllowancesData,
	modifyPondToMpondConversionHistory,
	modifyMPondToPondConversionHistory,
	modifyReceiverRewardsData
} from './subgraphModifier';
import {
	DEFAULT_RECEIVER_REWARDS_STORE,
	DEFAULT_RECEIVER_STAKING_DATA
} from '$lib/utils/constants/storeDefaults';

describe('subgraphModifier', () => {
	it('should return default staking data when no data is provided', () => {
		const result = modifyReceiverStakingData({});
		expect(result).toEqual(DEFAULT_RECEIVER_STAKING_DATA);
	});

	it('should update staking data with provided balance and snapshots', () => {
		const data = {
			receiverBalance: { balance: '1000', signer: '0x123' },
			receiverBalanceSnapshots: [{ epoch: 1, balance: '500' }],
			params: [
				{ id: 'START_TIME', value: '1609459200' },
				{ id: 'EPOCH_LENGTH', value: '604800' }
			]
		};
		const result = modifyReceiverStakingData(data);
		expect(result.stakedBalance).toBe(BigInt(1000n));
		expect(result.queuedBalance).toBe(BigInt(0n));
		expect(result.signer).toBe('0x123');
	});

	it('should return default rewards data when no data is provided', () => {
		const result = modifyReceiverRewardsData({});
		expect(result).toEqual(DEFAULT_RECEIVER_REWARDS_STORE);
	});

	it('should update rewards data with provided receiver rewards', () => {
		const data = {
			receiverRewards: [{ amount: '1000', rewardPerEpoch: '100' }],
			params: [
				{ id: 'START_TIME', value: '1609459200' },
				{ id: 'EPOCH_LENGTH', value: '604800' }
			],
			pondApprovals: [{ value: '500' }],
			ticketsIssueds: [{ epoch: '10' }]
		};
		const result = modifyReceiverRewardsData(data);
		expect(result.rewardBalance).toBe(BigInt(1000));
		expect(result.rewardPerEpoch).toBe(BigInt(100));
		expect(result.amountApproved).toBe(BigInt(500));
		expect(result.lastTicketIssuedEpoch).toBe(10);
	});

	it('should return default allowances when no data is provided', () => {
		const result = modifyAllowancesData({});
		expect(result).toEqual({ pond: 0n, mPond: 0n });
	});

	it('should update allowances with provided approvals', () => {
		const data = {
			pondApprovals: [{ value: '1000' }],
			mpondApprovals: [{ value: '500' }]
		};
		const result = modifyAllowancesData(data);
		expect(result.pond).toBe(BigInt(1000));
		expect(result.mPond).toBe(BigInt(500));
	});

	it('should return undefined when no users are provided', () => {
		const result = modifyPondToMpondConversionHistory([]);
		expect(result).toBeUndefined();
	});

	it('should update conversion history with provided user data', () => {
		const users = [
			{
				pondToMpondConversions: [
					{
						pondConverted: '1000',
						mpondReceived: '10',
						timestamp: '1609459200',
						transactionHash: '0xabc'
					}
				]
			}
		];
		const result = modifyPondToMpondConversionHistory(users);
		expect(result).toEqual([
			{
				pondConverted: BigInt(1000),
				mpondReceived: BigInt(10),
				timestamp: 1609459200,
				transactionHash: '0xabc'
			}
		]);
	});

	it('should return undefined when no user or state data is provided', () => {
		const result = modifyMPondToPondConversionHistory({ users: [], states: [] });
		expect(result).toBeUndefined();
	});

	it('should update conversion history with provided request data', () => {
		const mpondToPondHistoryData = {
			users: [
				{
					mpondToPondConversions: [],
					requests: [
						{
							id: '1',
							mpondAmount: '1000',
							mpondConverted: '500',
							releaseTime: '1609459200',
							requestEpoch: '10',
							timestamp: '1609459200',
							transactionHash: '0xabc',
							isCancelled: false,
							cancelHash: null
						}
					]
				}
			],
			states: [
				{
					liqudityReleaseEpochs: '604800',
					liquidityBP: '0.1',
					liquidityStartTime: '1609459200'
				}
			]
		};
		const result = modifyMPondToPondConversionHistory(mpondToPondHistoryData);
		expect(result).toBeDefined();
		expect(result?.[0].id).toBe('1');
		expect(result?.[0].mpondAmount).toBe(BigInt(1000));
		expect(result?.[0].mpondConverted).toBe(BigInt(500));
	});
});
