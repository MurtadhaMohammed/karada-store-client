export function isEnglish(text) {
    const arabicRegex = /[\u0600-\u06FF]/;
    return !arabicRegex.test(text);
}