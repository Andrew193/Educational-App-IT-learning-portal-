export function importAll(r) {
    let files = {};
    r.keys().map((item, index) => { files[item.replace('./', '')] = r(item); });
    return files;
}

export function withDelay(interval, callback) {
    let debounceTimeoutId;

    return function (...args) {
        clearTimeout(debounceTimeoutId);
        debounceTimeoutId = setTimeout(() => callback.apply(this, args), interval);
    };
}

export function createArrayWithPresetLengthAndValues(arrayLength, presetValue) {
    return Array.apply(null, Array(arrayLength)).map(() => presetValue)
}

export function createDeepCopy(data) {
    return JSON.parse(JSON.stringify(data));
}
