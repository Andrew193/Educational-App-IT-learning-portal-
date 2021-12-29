export function importAll(r) {
    let files = {};
    r.keys().map((item, index) => { files[item.replace('./', '')] = r(item); });
    return files;
}

