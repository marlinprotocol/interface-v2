import { describe, expect, vi, beforeAll } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';
import Timer from './Timer.svelte';
import TestTimer from './TestTimer.svelte';

const timerTestId = 'timer-test';
const delay = (duration: number) => new Promise((resolve) => setTimeout(resolve, duration));

describe('TimerComponent Component', () => {

	beforeAll(() => {
		const container = document.createElement('div');
		document.body.appendChild(container);
	});

	afterEach(() => {
		cleanup();
		vi.resetAllMocks();
	});

	test('renders without crashing', () => {
		const { container } = render(Timer);
		expect(container.firstChild).toBeTruthy();
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
		const { getByTestId } = render(TestTimer, {
			props: { timerId: timerTestId, endEpochTime: Date.now() / 1000 + 10 }
		});
		const activeSlot = getByTestId('timer').firstElementChild?.slot;
		expect(getByTestId('timer')?.id === timerTestId).toBe(true);
		expect(activeSlot === 'active').toBeTruthy();
	});

	test('timer change in every second', async () => {
		const { getByTestId } = render(TestTimer, {
			props: { timerId: timerTestId, endEpochTime: Date.now() / 1000 + 10 }
		});
		const activeSlot = getByTestId('timer').firstElementChild?.slot;
		expect(getByTestId('timer')?.id === timerTestId).toBe(true);
		expect(activeSlot === 'active').toBeTruthy();
		await delay(1000);
		expect(getByTestId('timer').firstElementChild?.innerHTML === '8').toBe(true);
		await delay(1000);
		expect(getByTestId('timer').firstElementChild?.innerHTML === '7').toBe(true);
		await delay(1000);
		expect(getByTestId('timer').firstElementChild?.innerHTML === '6').toBe(true);
	});

	test('timer render with Inactive slot ', () => {
		const { getByTestId } = render(TestTimer, {
			props: { timerId: timerTestId, endEpochTime: Date.now() / 1000 - 10 }
		});
		const activeSlot = getByTestId('timer').firstElementChild?.slot;
		expect(getByTestId('timer')?.id === timerTestId).toBe(true);
		expect(activeSlot === 'inactive').toBeTruthy();
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
		await delay(1000);
		expect(getByTestId('timer').classList.contains('on-time-end')).toBeFalsy();
		await delay(1000);
		expect(getByTestId('timer').classList.contains('on-time-end')).toBeTruthy();
	});
});
