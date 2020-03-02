let curId = -1;

/**
 * @param {string} prefix
 * @param {string} [separator]
 */
function generateId (prefix, separator) {
    curId = curId + 1;
    return `${String(prefix || '')}${String(separator || '-')}${curId}`;
}

export default generateId;