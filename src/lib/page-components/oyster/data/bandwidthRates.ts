interface BandwidthRate {
	region: string;
	region_code: string;
	rate: bigint;
}
// rates are per gb per second in 10^18
export const BANDWIDTH_RATES: BandwidthRate[] = [
	{
		region: 'US East (N. Virginia)',
		region_code: 'us-east-1',
		rate: BigInt('90000000000000000')
	},
	{
		region: 'US East (Ohio)',
		region_code: 'us-east-2',
		rate: BigInt('90000000000000000')
	},
	{
		region: 'US West (N. California)',
		region_code: 'us-west-1',
		rate: BigInt('90000000000000000')
	},
	{
		region: 'US West (Oregon)',
		region_code: 'us-west-2',
		rate: BigInt('90000000000000000')
	},
	{
		region: 'Canada (Central)',
		region_code: 'ca-central-1',
		rate: BigInt('90000000000000000')
	},
	{
		region: 'South America (São Paulo)',
		region_code: 'sa-east-1',
		rate: BigInt('150000000000000000')
	},
	{
		region: 'Europe (Stockholm)',
		region_code: 'eu-north-1',
		rate: BigInt('90000000000000000')
	},
	{
		region: 'Europe (Paris)',
		region_code: 'eu-west-3',
		rate: BigInt('90000000000000000')
	},
	{
		region: 'Europe (London)',
		region_code: 'eu-west-2',
		rate: BigInt('90000000000000000')
	},
	{
		region: 'Europe (Ireland)',
		region_code: 'eu-west-1',
		rate: BigInt('90000000000000000')
	},
	{
		region: 'Europe (Frankfurt)',
		region_code: 'eu-central-1',
		rate: BigInt('90000000000000000')
	},
	{
		region: 'Europe (Zurich)',
		region_code: 'eu-central-2',
		rate: BigInt('90000000000000000')
	},
	{
		region: 'Europe (Milan)',
		region_code: 'eu-south-1',
		rate: BigInt('90000000000000000')
	},
	{
		region: 'Europe (Spain)',
		region_code: 'eu-south-2',
		rate: BigInt('90000000000000000')
	},
	{
		region: 'Middle East (Bahrain)',
		region_code: 'me-south-1',
		rate: BigInt('117000000000000000')
	},
	{
		region: 'Middle East (UAE)',
		region_code: 'me-central-1',
		rate: BigInt('110000000000000000')
	},
	{
		region: 'Africa (Cape Town)',
		region_code: 'af-south-1',
		rate: BigInt('154000000000000000')
	},
	{
		region: 'Asia Pacific (Mumbai)',
		region_code: 'ap-south-1',
		rate: BigInt('109300000000000000')
	},
	{
		region: 'Asia Pacific (Hyderabad)',
		region_code: 'ap-south-2',
		rate: BigInt('109300000000000000')
	},
	{
		region: 'Asia Pacific (Tokyo)',
		region_code: 'ap-northeast-1',
		rate: BigInt('114000000000000000')
	},
	{
		region: 'Asia Pacific (Seoul)',
		region_code: 'ap-northeast-2',
		rate: BigInt('126000000000000000')
	},
	{
		region: 'Asia Pacific (Osaka)',
		region_code: 'ap-northeast-3',
		rate: BigInt('114000000000000000')
	},
	{
		region: 'Asia Pacific (Singapore)',
		region_code: 'ap-southeast-1',
		rate: BigInt('120000000000000000')
	},
	{
		region: 'Asia Pacific (Sydney)',
		region_code: 'ap-southeast-2',
		rate: BigInt('114000000000000000')
	},
	{
		region: 'Asia Pacific (Jakarta)',
		region_code: 'ap-southeast-3',
		rate: BigInt('132000000000000000')
	},
	{
		region: 'Asia Pacific (Melbourne)',
		region_code: 'ap-southeast-4',
		rate: BigInt('114000000000000000')
	},
	{
		region: 'Asia Pacific (Hong Kong)',
		region_code: 'ap-east-1',
		rate: BigInt('120000000000000000')
	}
];

// lookup table for bandwidth rates with region code as key and rate as value
export const BANDWIDTH_RATES_LOOKUP: { [key: string]: number } = BANDWIDTH_RATES.reduce(
	(acc, { region_code, rate }) => ({ ...acc, [region_code]: rate }),
	{}
);
