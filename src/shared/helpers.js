import {
    ELEMENT_TYPES,
    MAX_WEIGHT,
    MIN_WEIGHT,
    TEETER_TOTTER_WIDTH
} from "../consts/constants";

export function generateRandomElem() {
    const id = '_' + Math.random().toString(36).substr(2, 9);
    const type = ELEMENT_TYPES[Math.floor(Math.random() * 3)];
    const weight = Math.floor(Math.random() * MAX_WEIGHT) + MIN_WEIGHT;
    const offset = Math.floor(Math.random() * (TEETER_TOTTER_WIDTH / 2)) + 1;
    console.log(offset)
    const height = weight * 8;
    return {
        id,
        type,
        weight,
        offset,
        height
    }
}

export function getBlockPower(array) {
    return array.reduce((acc, item) => {
        return acc += item.weight * item.offset
    }, 0)
}