/**
 * Converts a string key into a more human-readable format by performing transformations
 * such as replacing underscores with spaces, splitting camelCase words, and capitalizing
 * the first letter of each word.
 *
 * @param {string} key - The string to be transformed into a human-readable format.
 * @return {string} A transformed string with improved readability.
 */
export function humanize(key: string): string {
    return key
        .replace(/_/g, ' ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/\b\w/g, (c) => c.toUpperCase());
}
