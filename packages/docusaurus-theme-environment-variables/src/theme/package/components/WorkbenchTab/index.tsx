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
    justifyContent: 'center',
});

const StyledList = styled(List)({
    padding: '0 var(--doc8-space-m)',
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

export default function WorkbenchTab(): JSX.Element {
    const [entries, setEntries] = React.useState<Entry[]>([]);

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

    const handleMouseLeave = (entry: Entry, index: number) => {
        if (focusIndexRef.current === index) {
            return;
        }
        disableHighlight(entry);
    };

    const handleFocus = (entry: Entry, index: number) => {
        focusIndexRef.current = index;
        enableHighlight(entry);
        entry.element.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
    };

    const handleBlur = (entry: Entry) => {
        focusIndexRef.current = undefined;
        disableHighlight(entry);
    };

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        changeIndex: number,
    ) => {
        setEntries(entries => entries.map((entry, index) => {
            if (index !== changeIndex) {
                return entry;
            }
            return {
                ...entry,
                currValue: event.target.value,
            };
        }));
        const entry = entries[changeIndex];
        if (!entry) {
            return;
        }
        entry.element.innerText = event.target.value;
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
            element.replaceChildren(entry.defaultValue || `{{ ${entry.key} }}`);
            newEntries.push(entry);
        });
        setEntries(newEntries);
    }, []);

    return (
        <Layout>
            <StyledList>
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
        </Layout>
    );
};
