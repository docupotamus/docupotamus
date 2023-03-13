import { Variable } from '@docupotamus/theme-environment-variables';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useVariables } from '../../contexts/variables';
import { formatDefault } from '../../services';
import '../../styles.css';
import CopyButton from './CopyButton';
import styles from './styles.module.css';

const KEY_PREFIX = 'environmentVariable';

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

const parseCodeBlock = (target: HTMLElement | null): string => {
    const codeBlock = target?.parentElement?.parentElement;
    if (!codeBlock) {
        return target?.textContent ?? '';
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
    const { variables, setVariables } = useVariables();

    const [code, setCode] = React.useState<string>('');
    const focusIndexRef = React.useRef<number>();

    const enableHighlight = (variable: Variable) => {
        const className = styles.Target__highlight;
        if (className) {
            variable.ref.current?.classList.add(className);
        }
    };

    const disableHighlight = (variable: Variable) => {
        const className = styles.Target__highlight;
        if (className) {
            variable.ref.current?.classList.remove(className);
        }
    };

    const handleMouseLeave = (variable: Variable, currIndex: number) => {
        if (focusIndexRef.current === currIndex) {
            return;
        }
        disableHighlight(variable);
    };

    const handleFocus = (variable: Variable, currIndex: number) => {
        focusIndexRef.current = currIndex;
        enableHighlight(variable);
        variable.ref.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
        // Update the code initially.
        setCode(parseCodeBlock(variable.ref.current));
    };

    const handleBlur = (variable: Variable) => {
        focusIndexRef.current = undefined;
        disableHighlight(variable);
        // TODO
        if (!variable.currValue && variable.ref.current) {
            variable.ref.current.innerText ||= formatDefault(variable);
        }
    };

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        currIndex: number,
    ) => {
        setVariables(variables => variables.map((variable, index) => {
            if (index !== currIndex) {
                return variable;
            }
            return {
                ...variable,
                currValue: event.target.value,
            };
        }));
        const variable = variables[currIndex];
        if (!variable) {
            return;
        }
        // TODO
        if (variable.ref.current) {
            variable.ref.current.innerText = event.target.value;
        }
        if (currIndex !== focusIndexRef.current) {
            return;
        }
        // Update the code on change.
        setCode(parseCodeBlock(variable.ref.current));
    };

    return (
        <Layout>
            <StyledList disablePadding>
                {variables.map((variable, index) => {
                    return (
                        <ListItem
                            key={`${KEY_PREFIX}-${index}-${variable.name}`}
                            disablePadding
                        >
                            <StyledTextField
                                // See: https://stackoverflow.com/questions/12374442/chrome-ignores-autocomplete-off
                                autoComplete='no-thank-you'
                                label={variable.name}
                                onBlur={() => handleBlur(variable)}
                                onChange={(event) => handleChange(
                                    event,
                                    index,
                                )}
                                onFocus={() => handleFocus(variable, index)}
                                onMouseEnter={() => enableHighlight(variable)}
                                onMouseLeave={() => handleMouseLeave(
                                    variable,
                                    index,
                                )}
                                value={variable.currValue}
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
