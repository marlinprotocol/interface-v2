interface BandwidthRate {
	region: string;
	region_code: string;
	rate: number;
}
// rates are per gb in USDC i.e 10^6
export const BANDWIDTH_RATES: BandwidthRate[] = [
	{
		region: 'US East (Ohio)',
		region_code: 'us-east-2',
		rate: 90000
	},
	{
		region: 'US East (N. Virginia)',
		region_code: 'us-east-1',
		rate: 90000
	},
	{
		region: 'US West (N. California)',
		region_code: 'us-west-1',
		rate: 90000
	},
	{
		region: 'US West (Oregon)',
		region_code: 'us-west-2',
		rate: 90000
	},
	{
		region: 'Africa (Cape Town)',
		region_code: 'af-south-1',
		rate: 154000
	},
	{
		region: 'Asia Pacific (Hong Kong)',
		region_code: 'ap-east-1',
		rate: 120000
	},
	{
		region: 'Asia Pacific (Jakarta)',
		region_code: 'ap-southeast-3',
		rate: 132000
	},
	{
		region: 'Asia Pacific (Mumbai)',
		region_code: 'ap-south-1',
		rate: 109300
	},
	{
		region: 'Asia Pacific (Osaka)',
		region_code: 'ap-northeast-3',
		rate: 114000
	},
	{
		region: 'Asia Pacific (Seoul)',
		region_code: 'ap-northeast-2',
		rate: 126000
	},
	{
		region: 'Asia Pacific (Singapore)',
		region_code: 'ap-southeast-1',
		rate: 120000
	},
	{
		region: 'Asia Pacific (Sydney)',
		region_code: 'ap-southeast-2',
		rate: 114000
	},
	{
		region: 'Asia Pacific (Tokyo)',
		region_code: 'ap-northeast-1',
		rate: 114000
	},
	{
		region: 'Canada (Central)',
		region_code: 'ca-central-1',
		rate: 90000
	},
	{
		region: 'Europe (Frankfurt)',
		region_code: 'eu-central-1',
		rate: 90000
	},
	{
		region: 'Europe (Ireland)',
		region_code: 'eu-west-1',
		rate: 90000
	},
	{
		region: 'Europe (London)',
		region_code: 'eu-west-2',
		rate: 90000
	},
	{
		region: 'Europe (Milan)',
		region_code: 'eu-south-1',
		rate: 90000
	},
	{
		region: 'Europe (Paris)',
		region_code: 'eu-west-3',
		rate: 90000
	},
	{
		region: 'Europe (Stockholm)',
		region_code: 'eu-north-1',
		rate: 90000
	},
	{
		region: 'Middle East (Bahrain)',
		region_code: 'me-south-1',
		rate: 117000
	},
	{
		region: 'South America (São Paulo)',
		region_code: 'sa-east-1',
		rate: 150000
	},
	{
		region: 'AWS GovCloud (US-East)',
		region_code: 'us-gov-east-1',
		rate: 155000
	},
	{
		region: 'AWS GovCloud (US-West)',
		region_code: 'us-gov-west-1',
		rate: 155000
	}
];

// lookup table for bandwidth rates with region code as key and rate as value
export const BANDWIDTH_RATES_LOOKUP: { [key: string]: number } = BANDWIDTH_RATES.reduce(
	(acc, { region_code, rate }) => ({ ...acc, [region_code]: rate }),
	{}
);
