'use strict';

export function getQueryVariable(variable) {
    let query = window.location.search.substring(1);
    let lets = query.split('&');
    for (let i = 0; i < lets.length; i++) {
        let pair = lets[i].split('=');
        if (decodeURIComponent(pair[0]) === variable) {
            return decodeURIComponent(pair[1]).replace(/\+/g, ' ');
        }
    }
    return undefined;
}
