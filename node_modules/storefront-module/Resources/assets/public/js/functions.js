export function trans(langKey, replace = {}) {
    let line = window.FleetCart.langs[langKey];

    for (let key in replace) {
        line = line.replace(`:${key}`, replace[key]);
    }

    return line;
}
