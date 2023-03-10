import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import '../../styles.css';
import {
    DATA_ATTRIBUTE_DEFAULT_VALUE,
    DATA_ATTRIBUTE_NAME,
    TARGET_CLASS_NAME
} from '../PartitionedLineTokens';
import CopyButton from './CopyButton';
import styles from './styles.module.css';

const KEY_PREFIX = 'environmentVariable';

// TODO(dnguyen0304): Investigate adding isRequired.
interface Entry {
    readonly key: string;
    readonly defaultValue: string;
    readonly currValue: string;
    readonly element: HTMLElement;
};

const Layout = styled(Box)({
    height: '100%',

    display: 'flex',
    flexDirection: 'column',

    padding: 'var(--doc8-space-m)',
    paddingBottom: 'var(--doc8-space-xs)',
});

const StyledList = styled(List)({
    flexGrow: 1,

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    '& > li + li': {
        marginTop: 'var(--doc8-space-s)',
    },
});

const StyledTextField = styled(TextField)({
    color: 'var(--ev-workbench-color-base)',
    '& > .MuiFormLabel-root': {
        color: 'inherit',
        font: 'inherit',
        // Do not use a value higher than ~2px because it breaks the InputLabel
        // animation.
        letterSpacing: '0.9px',
        '&.Mui-focused': {
            color: 'var(--ifm-color-danger)',
        },
    },
    '& .MuiOutlinedInput-root': {
        color: 'inherit',
        font: 'inherit',
        borderRadius: 'var(--doc8-space-xs)',
        '& fieldset': {
            borderColor: 'currentColor',
        },
        '&:hover fieldset': {
            borderColor: 'var(--ifm-color-primary)',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'var(--ifm-color-primary)',
        },
    },
});

const formatDefault = (entry: Entry): string => {
    return entry.defaultValue || `{{ ${entry.key} }}`;
};

const parseCodeBlock = (target: HTMLElement): string => {
    const codeBlock = target.parentElement?.parentElement;
    if (!codeBlock) {
        return target.textContent ?? '';
    }
    const chunks: string[] = [];
    Array.from(codeBlock.children).forEach(lineToken => {
        Array.from(lineToken.children).forEach(token => {
            chunks.push(token.textContent ?? '');
        });
    });
    return chunks.join('');
};

export default function WorkbenchTab(): JSX.Element {
    const [entries, setEntries] = React.useState<Entry[]>([]);
    const [code, setCode] = React.useState<string>('');

    const focusIndexRef = React.useRef<number>();

    const enableHighlight = (entry: Entry) => {
        const className = styles.Target__highlight;
        if (className) {
            entry.element.classList.add(className);
        }
    };

    const disableHighlight = (entry: Entry) => {
        const className = styles.Target__highlight;
        if (className) {
            entry.element.classList.remove(className);
        }
    };

    const handleMouseLeave = (entry: Entry, currIndex: number) => {
        if (focusIndexRef.current === currIndex) {
            return;
        }
        disableHighlight(entry);
    };

    const handleFocus = (entry: Entry, currIndex: number) => {
        focusIndexRef.current = currIndex;
        enableHighlight(entry);
        entry.element.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
        // Update the code initially.
        setCode(parseCodeBlock(entry.element));
    };

    const handleBlur = (entry: Entry) => {
        focusIndexRef.current = undefined;
        disableHighlight(entry);
        if (!entry.currValue) {
            entry.element.innerText ||= formatDefault(entry);
        }
    };

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        currIndex: number,
    ) => {
        setEntries(entries => entries.map((entry, index) => {
            if (index !== currIndex) {
                return entry;
            }
            return {
                ...entry,
                currValue: event.target.value,
            };
        }));
        const entry = entries[currIndex];
        if (!entry) {
            return;
        }
        entry.element.innerText = event.target.value;
        if (currIndex !== focusIndexRef.current) {
            return;
        }
        // Update the code on change.
        setCode(parseCodeBlock(entry.element));
    };

    React.useEffect(() => {
        const newEntries: Entry[] = [];
        document.querySelectorAll(`.${TARGET_CLASS_NAME}`).forEach(element => {
            if (!(element instanceof HTMLElement)) {
                return;
            }
            const key = element.dataset[DATA_ATTRIBUTE_NAME];
            if (key === undefined) {
                return;
            }
            const defaultValue = element.dataset[DATA_ATTRIBUTE_DEFAULT_VALUE];
            if (defaultValue === undefined) {
                return;
            }
            const entry = {
                key,
                defaultValue,
                currValue: defaultValue,
                element,
            };
            element.replaceChildren(formatDefault(entry));
            newEntries.push(entry);
        });
        setEntries(newEntries);
    }, []);

    return (
        <Layout>
            <StyledList disablePadding>
                {entries.map((entry, index) => {
                    return (
                        <ListItem
                            key={`${KEY_PREFIX}-${index}-${entry.key}`}
                            disablePadding
                        >
                            <StyledTextField
                                // See: https://stackoverflow.com/questions/12374442/chrome-ignores-autocomplete-off
                                autoComplete='no-thank-you'
                                label={entry.key}
                                onBlur={() => handleBlur(entry)}
                                onChange={(event) => handleChange(
                                    event,
                                    index,
                                )}
                                onFocus={() => handleFocus(entry, index)}
                                onMouseEnter={() => enableHighlight(entry)}
                                onMouseLeave={() => handleMouseLeave(
                                    entry,
                                    index,
                                )}
                                value={entry.currValue}
                                variant='outlined'
                                fullWidth
                                required
                            />
                        </ListItem>
                    );
                })}
            </StyledList>
            <CopyButton code={code} />
        </Layout>
    );
};
