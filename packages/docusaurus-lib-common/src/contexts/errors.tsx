/**
 * This error is thrown when a context is consumed outside its provider. Allows
 * reusing a generic error message format and reduces bundle size. The hook's
 * name will be extracted from its stack, so only the provider's name is needed.
 *
 * Copied from:
 * https://github.com/facebook/docusaurus/blob/f21ee7c23b1e0e392f59435bbb50379f182c366c/packages/docusaurus-theme-common/src/utils/reactUtils.tsx#L75
 */
export class ReactContextError extends Error {
    constructor(providerName: string, additionalInfo?: string) {
        super();
        this.name = 'ReactContextError';
        this.message = `Hook ${this.stack?.split('\n')[1]?.match(/at (?:\w+\.)?(?<name>\w+)/)?.groups!
            .name ?? ''
            } was called outside the <${providerName}>. ${additionalInfo ?? ''}`;
    }
}
