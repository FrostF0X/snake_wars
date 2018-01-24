// not used in project explicitly but polyfills array and fix ts compile errors
// noinspection JSUnusedGlobalSymbols
interface Array<T> {
    // noinspection JSValidateJSDoc
    /**
     * Polyfill array fill method
     * @param {T} value
     * @returns {T[]}
     */
    fill(value: T): T[];

    /**
     * Polyfill array findIndex method
     * @param {(value: T) => boolean} callback
     * @returns {number}
     */
    findIndex(callback: (value: T) => boolean): number;
}
