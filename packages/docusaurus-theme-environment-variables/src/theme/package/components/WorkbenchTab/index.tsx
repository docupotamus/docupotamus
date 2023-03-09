import Box from '@mui/material/Box';
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

export default function WorkbenchTab(): JSX.Element {
    const [entries, setEntries] = React.useState<Entry[]>([]);

    const enableHighlight = (entry: Entry) => {
        const className = styles['target--highlight'];
        if (className) {
            entry.element.classList.add(className);
        }
    };

    const disableHighlight = (entry: Entry) => {
        const className = styles['target--highlight'];
        if (className) {
            entry.element.classList.remove(className);
        }
    };

    const handleFocus = (entry: Entry) => {
        enableHighlight(entry);
        entry.element.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
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
        <Box>
            {/* TODO(dnguyen0304): Fix text styles convention. */}
            <h3
                className='ifm_text__reset'
                style={{
                    color: 'var(--docupotamus-color-grey-800)',
                    fontFamily: 'var(--docupotamus-font-family)',
                    fontSize: 'var(--font-size-0)',
                    fontWeight: 'var(--docupotamus-heading-font-weight)',
                    textTransform: 'uppercase',
                }}
            >
                environment variables
            </h3>
            <ul className={styles['entries-container']}>
                {entries.map((entry, index) => {
                    return (
                        <li key={`${KEY_PREFIX}-${entry.key}`}>
                            <TextField
                                autoComplete='off'
                                label={entry.key}
                                onBlur={() => disableHighlight(entry)}
                                onChange={(event) => handleChange(
                                    event,
                                    index,
                                )}
                                onFocus={() => handleFocus(entry)}
                                onMouseEnter={() => enableHighlight(entry)}
                                onMouseLeave={() => disableHighlight(entry)}
                                value={entry.currValue}
                                variant='outlined'
                                fullWidth
                                required
                            />
                        </li>
                    );
                })}
            </ul>
        </Box>
    );
};
