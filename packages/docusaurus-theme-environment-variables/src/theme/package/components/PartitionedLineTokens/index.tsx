import type { Props as LineProps } from '@theme/CodeBlock/Line';
import * as React from 'react';

export const TARGET_CLASS_NAME = 'DocupotamusEnvironmentVariable-container';
export const DATA_ATTRIBUTE_NAME = 'environmentVariableName';
export const DATA_ATTRIBUTE_DEFAULT_VALUE = 'environmentVariableDefaultValue';
// TODO(dnguyen0304): Refactor to RegExp and String.raw to reduce duplicated
//   code.
//   See: https://stackoverflow.com/a/43391072
const REGEX = /\{\{\s\S+\s\}\}/g;
// See: https://stackoverflow.com/a/25221523
const REGEX_SPLIT = /(\{\{\s\S+\s\}\})/g;

// TODO(dnguyen0304): Investigate if importing from prism-react-renderer is
//   possible.
interface PrismToken {
    types: string[];
    content: string;
    empty?: boolean;
};

interface Partition {
    readonly start: number;
    readonly end: number;
    readonly key: string;
    readonly defaultValue: string;
};

// TODO(dnguyen0304): Investigate refactoring to a generator function.
const splitPlainTokens = (line: PrismToken[]): PrismToken[] => {
    const tokens: PrismToken[] = [];
    line.forEach(token => {
        if (token.types[0] === 'plain') {
            const contentChunks = token.content.split(REGEX_SPLIT);
            contentChunks.forEach(contentChunk => {
                tokens.push({
                    ...token,
                    content: contentChunk,
                });
            });
        } else {
            tokens.push(token);
        }
    });
    return tokens;
};

const getPartitions = (line: PrismToken[]): Partition[] => {
    const text = line.map(token => token.content).join('');
    const matches = [
        // See: https://github.com/microsoft/TypeScript/issues/36788
        ...text.matchAll(REGEX) as IterableIterator<RegExpExecArray>,
    ];
    const partitions: Partition[] = [];
    matches.forEach(match => {
        const value = match[0].slice(3, -3);
        // TODO(dnguyen0304): Add validation.
        const [key, defaultValue] =
            (value.includes('='))
                ? value.split('=') as [string, string]
                : [value, ''];
        partitions.push({
            start: match.index,
            end: match.index + match[0].length,
            key,
            defaultValue,
        });
    });
    return partitions;
};

interface Props extends Pick<LineProps, 'getTokenProps'> {
    line: PrismToken[];
};

export default function PartitionedLines(
    {
        line,
        getTokenProps,
    }: Props,
): JSX.Element {
    const lineTokens: JSX.Element[] = [];
    const tokens = splitPlainTokens(line);
    const partitions = getPartitions(tokens);

    let temp: JSX.Element[] = [];
    let currCharacterIndex = 0;
    let currPartitionIndex = 0;

    tokens.forEach((token, key) => {
        const lineToken = <span key={key} {...getTokenProps({ token, key })} />;
        const currPartition = partitions[currPartitionIndex];
        if (!currPartition) {
            // Add all remaining line tokens without changes.
            lineTokens.push(lineToken);
            return;
        }

        const isBeforeStart = currCharacterIndex < currPartition.start;
        const isAfterStart = currCharacterIndex >= currPartition.start;
        const isBeforeEnd = currCharacterIndex < currPartition.end;
        const isAfterEnd = currCharacterIndex > currPartition.end;

        const isOutside = isBeforeStart || isAfterEnd;
        const isBetween = isAfterStart && isBeforeEnd;
        const isImmediatelyAfterEnd = currCharacterIndex === currPartition.end;

        if (isOutside) {
            lineTokens.push(lineToken);
        } else if (isBetween) {
            temp.push(lineToken);
        } else if (isImmediatelyAfterEnd) {
            // Flush the temporary line tokens.
            lineTokens.push(
                <span
                    className={TARGET_CLASS_NAME}
                    data-environment-variable-name={currPartition.key}
                    data-environment-variable-default-value={
                        currPartition.defaultValue
                    }
                >
                    {temp}
                </span>
            );
            temp = [];
            currPartitionIndex += 1;
            // Process the current line token.
            lineTokens.push(lineToken);
        }
        currCharacterIndex += token.content.length;
    });

    return (
        <>
            {lineTokens}
        </>
    );
};
