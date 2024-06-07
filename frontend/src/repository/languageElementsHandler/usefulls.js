export function getLanguageElementFromBaseIfNotExists(str, baseLanguageElementsHandler) {
    return (!(str?.substring(0, 4) === '###_'))
    ? str
    : baseLanguageElementsHandler.get(str.substring(4));
}
