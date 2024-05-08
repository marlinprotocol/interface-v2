<script lang="ts">
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import { oysterTokenMetadataStore } from '$lib/data-stores/oysterStore';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { bigNumberToString, epochToDurationString } from '$lib/utils/helpers/conversionHelper';
	import { staticImages } from '$lib/components/images/staticImages';
	import { cn } from '$lib/utils/helpers/commonHelper';
	import Timer from '$lib/atoms/timer/Timer.svelte';

	export let jobData: OysterInventoryDataModel;
	export let modalFor: string;
	$: ({ balance, durationLeft } = jobData);
	const commonStyleClass = 'h-[207px] rounded-xl flex items-center justify-center';
	const iconStyle = 'w-[64px] h-[64px] rounded-full bg-base-100 flex items-center justify-center ';
	const handleOnTimerEnd = () => {};
</script>

<div class="flex flex-col gap-4">
	<div class="flex gap-4">
		<div class="w-full">
			<InputCard variant="none" styleClass="bg-[#F4F4F6]">
				<div class={cn(commonStyleClass)}>
					<div>
						<div class="flex w-full justify-center">
							<div class={cn(iconStyle, 'bg-[#F4F9F0]')}>
								<img src={staticImages.walleticonOyster} alt="wallet" />
							</div>
						</div>

						<div class="mt-4 text-lg font-light">Current Balance</div>
						<div class="text-xl font-semibold">
							{bigNumberToString(balance, $oysterTokenMetadataStore.decimal)}
							{$oysterTokenMetadataStore.currency}
						</div>
					</div>
				</div>
			</InputCard>
		</div>
		<div class="w-full">
			<InputCard variant="none" styleClass="bg-[#F4F4F6]">
				<div class={cn(commonStyleClass)}>
					<div>
						<div class="flex w-full justify-center">
							<div class={cn(iconStyle, 'bg-[#FCEFD4]')}>
								<img src={staticImages.clockIcon} alt="wallet" />
							</div>
						</div>
						<div class="mt-4 text-lg font-light">Duration Left</div>
						<Timer
							useGivenTime
							timerId="timer-for-{modalFor}"
							endEpochTime={durationLeft}
							onTimerEnd={() => handleOnTimerEnd()}
						>
							<div slot="active" let:timer class="w-full">
								<div class="text-xl font-semibold">
									{durationLeft === 0 ? 'Ended' : epochToDurationString(timer, false)}
								</div>
							</div>
						</Timer>
					</div>
				</div>
			</InputCard>
		</div>
	</div>
</div>
