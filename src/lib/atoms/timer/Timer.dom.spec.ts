import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render } from '@testing-library/svelte';
import TimerComponent from './Timer.svelte';

function execute(func: () => void, time: number) {
    setInterval(func, time)
}

const mockFn = vi.fn(() => { })

describe('TimerComponent', () => {
    beforeAll(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.restoreAllMocks()
    });

    it('calls onTimerEnd when the countdown reaches zero', async () => {
        const endEpochTime = Math.floor(Date.now() / 1000) + 1; // 1 second from now
        render(TimerComponent, { endEpochTime, timerId: 'timer2', onTimerEnd: mockFn });
        execute(mockFn, endEpochTime)
        vi.advanceTimersByTime(endEpochTime);
        expect(mockFn).toHaveBeenCalled();
    });

});