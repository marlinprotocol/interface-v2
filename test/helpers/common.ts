export const findSmallerNumber = (num: number) => {
    // JavaScript provides a constant Number.EPSILON which represents
    // the smallest interval between two representable numbers.
    // You could also choose a different decrement value if needed.
    const decrement = Number.EPSILON;

    // Subtract the decrement from the number to get a smaller number.
    const smallerNumber = num - decrement;

    return smallerNumber;
}

export const isSortedAlphabetically = (array: string[]) => {
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i].localeCompare(array[i + 1]) > 0) {
            return false;
        }
    }
    return true;
}