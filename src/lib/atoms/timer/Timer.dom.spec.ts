import { describe, expect, vi } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';
import Timer from './Timer.svelte';
import html from '@playpilot/svelte-htm';
import { tick } from 'svelte';

const timerTestId = 'timer-test';
const delay = (duration: number) => new Promise((resolve) => setTimeout(resolve, duration));

describe('TimerComponent Component', () => {
	afterEach(() => {
		cleanup();
		vi.resetAllMocks();
	});

	it('renders without crashing', () => {
		const { getByTestId } = render(Timer);
		expect(getByTestId('timer')).toBeTruthy();
		expect(getByTestId('timer')).toMatchSnapshot();
	});

	it('does not invoke onTimerEnd callback when countdown is inactive', () => {
		const onTimerEnd = vi.fn();
		render(Timer, {
			props: { onTimerEnd, endEpochTime: Date.now() - 1000, timerId: timerTestId }
		});

		setTimeout(() => {
			expect(onTimerEnd()).toBeFalsy();
		}, 500);
	});

	it('does not invoke onTimerEnd callback when countdown is inactive', async () => {
		const onTimerEnd = vi.fn();
		render(Timer, {
			props: { timerId: timerTestId, endEpochTime: Date.now() / 1000 + 10, onTimerEnd }
		});

		// Wait for a short time to ensure the callback is not invoked
		await new Promise((resolve) => setTimeout(resolve, 500));
		expect(onTimerEnd()).toBeFalsy();
	});

	it('renders with required props', () => {
		const { getByTestId } = render(Timer, {
			props: { timerId: timerTestId, endEpochTime: Date.now() / 1000 + 10 }
		});
		expect(getByTestId('timer')?.id === timerTestId).toBe(true);
	});

	it('renders with Active slot ', async () => {
		const { getByTestId } = render(
			html`<${Timer} timerId=${timerTestId} endEpochTime=${
				Date.now() / 1000 + 10
			}><div slot="active" id="active-slot-timer" let:timer>{timer}</div>
            <div slot="inactive" id="inactive-slot-timer">Timer End</div></${Timer}>`
		);
		const activeSlotId = getByTestId('timer').firstElementChild?.id;
		expect(getByTestId('timer')?.id === timerTestId).toBe(true);
		expect(activeSlotId === 'active-slot-timer').toBeTruthy();
	});

	it('renders with Inactive slot ', () => {
		const { getByTestId } = render(html`<${Timer} timerId=${timerTestId} endEpochTime=${
			Date.now() / 1000 - 10
		}><div slot="active" id="active-slot-timer" let:timer>{timer}</div>
        <div slot="inactive" id="inactive-slot-timer">Timer End</div></${Timer}>`);
		const inActiveSlotId = getByTestId('timer').firstElementChild?.id;
		expect(getByTestId('timer')?.id === timerTestId).toBe(true);
		expect(inActiveSlotId === 'inactive-slot-timer').toBeTruthy();
	});

	it('invokes onTimerEnd function when the timer ends', async () => {
		const { getByTestId } = render(Timer, {
			props: {
				timerId: timerTestId,
				endEpochTime: Date.now() / 1000 + 1,
				onTimerEnd: () => {
					getByTestId('timer').classList.add('on-time-end');
				}
			}
		});
		expect(getByTestId('timer').classList.contains('on-time-end')).toBeFalsy();
		await delay(1100);
		await tick();
		expect(getByTestId('timer').classList.contains('on-time-end')).toBeTruthy();
	});
});
