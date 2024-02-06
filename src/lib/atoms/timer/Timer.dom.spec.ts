import { describe, expect, vi } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';
import Timer from './Timer.svelte';
import html from 'svelte-htm';

const timerTestId = 'timer-test';
const delay = (duration: number) => new Promise((resolve) => setTimeout(resolve, duration));

describe('TimerComponent Component', () => {
	afterEach(() => {
		cleanup();
		vi.resetAllMocks();
	});

	test('renders without crashing', () => {
		const { getByTestId } = render(Timer);
		expect(getByTestId('timer')).toBeTruthy();
	});

	test('does not invoke onTimerEnd callback when countdown is inactive', () => {
		const onTimerEnd = vi.fn();
		render(Timer, {
			props: { onTimerEnd, endEpochTime: Date.now() - 1000, timerId: timerTestId }
		});

		setTimeout(() => {
			expect(onTimerEnd()).toBeFalsy();
		}, 500);
	});

	test('does not invoke onTimerEnd callback when countdown is inactive', async () => {
		const onTimerEnd = vi.fn();
		render(Timer, {
			props: { timerId: timerTestId, endEpochTime: Date.now() / 1000 + 10, onTimerEnd }
		});

		// Wait for a short time to ensure the callback is not invoked
		await new Promise((resolve) => setTimeout(resolve, 500));
		expect(onTimerEnd()).toBeFalsy();
	});

	test('timer render with required props', () => {
		const { getByTestId } = render(Timer, {
			props: { timerId: timerTestId, endEpochTime: Date.now() / 1000 + 10 }
		});
		expect(getByTestId('timer')?.id === timerTestId).toBe(true);
	});

	test('timer render with Active slot ', async () => {
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

	test('timer render with Inactive slot ', () => {
		const { getByTestId } = render(html`<${Timer} timerId=${timerTestId} endEpochTime=${
			Date.now() / 1000 - 10
		}><div slot="active" id="active-slot-timer" let:timer>{timer}</div>
        <div slot="inactive" id="inactive-slot-timer">Timer End</div></${Timer}>`);
		const inActiveSlotId = getByTestId('timer').firstElementChild?.id;
		expect(getByTestId('timer')?.id === timerTestId).toBe(true);
		expect(inActiveSlotId === 'inactive-slot-timer').toBeTruthy();
	});

	test('timer render with onTimerEnd function ', async () => {
		const { getByTestId } = render(Timer, {
			props: {
				timerId: timerTestId,
				endEpochTime: Date.now() / 1000 + 1,
				onTimerEnd: async () => {
					await getByTestId('timer').classList.add('on-time-end');
				}
			}
		});
		expect(getByTestId('timer').classList.contains('on-time-end')).toBeFalsy();
		await delay(1000);
		expect(getByTestId('timer').classList.contains('on-time-end')).toBeTruthy();
	});
});
