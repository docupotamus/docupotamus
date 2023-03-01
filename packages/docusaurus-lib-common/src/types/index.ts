import type { KeySequence } from 'react-hotkeys';

// Contiguous region of content.
export interface Target {
    // Target unique identifier.
    readonly id: string;

    // TODO(dnguyen0304): Add repository information.
    // Page containing the target.
    readonly source: Source;

    // Root to reference for relative selector paths.
    readonly selectorRoot: RangeSelector;

    // Serialized queries for locating a target on a page.
    readonly selectors: readonly Selector[];

    // Short excerpt of text.
    readonly snippet: string;
};

export interface Source {
    readonly href: string;
};

// Locates a region of content using XPaths and character offsets.
export interface RangeSelector {
    readonly type: 'RangeSelector';
    readonly startContainer: string;
    readonly startOffset: number;
    readonly endContainer: string;
    readonly endOffset: number;
};

// Serialized queries for locating a target on a page.
export interface Selector extends RangeSelector { };

export type KeyMap<T extends string> = {
    [key in T]: KeySequence;
};

export type KeyHandlers<T extends string> = {
    [key in T]: (
        keyboardEvent?: KeyboardEvent | undefined,
    ) => void;
};
