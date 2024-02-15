import { Page } from "@playwright/test";

export async function extractRateColumnData(page: Page) {
    return await page.$$eval('tbody tr.main-row', rows => {
        return rows.map(row => {
            const rateCell = row.querySelector('td:nth-of-type(4)');
            return rateCell ? parseFloat(rateCell.textContent?.trim().replace('$', '') || '') : 0;
        });
    });
}

export async function extractVcpuColumnData(page: Page) {
    return await page.$$eval('tbody tr.main-row', rows => {
        return rows.map(row => {
            const vcpuCell = row.querySelector('td:nth-of-type(5)');
            return vcpuCell ? vcpuCell.textContent?.trim() : '';
        });
    });
}

export async function extractMemoryColumnData(page: Page) {
    return await page.$$eval('tbody tr.main-row', rows => {
        return rows.map(row => {
            const memoryCell = Array.from(row.children)[5];
            const memoryText = memoryCell ? memoryCell?.textContent?.trim() || '' : '';
            // Convert the memory string to an integer value representing MB/GB as needed for comparison
            const memoryValue = parseInt(memoryText);
            const isGB = memoryText.toLowerCase().includes('gb'); // Check if memory is specified in GB
            return isGB ? memoryValue * 1024 : memoryValue; // Assuming 'GB' means gigabytes and 'MB' means megabytes
        });
    });
}

// Function to check if an array is sorted numerically
export function isSortedNumerically(array: number[]) {
    for (let i = 1; i < array.length; i++) {
        if (array[i - 1] > array[i]) {
            return false;
        }
    }
    return true;
}