import { Param } from '@doc8/theme-codeblock-param';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useParams } from '../../contexts/variables';
import { formatDefault } from '../../services';
import '../../styles.css';
import CopyButton from './CopyButton';
import styles from './styles.module.css';

const KEY_PREFIX = 'codeblockParam';

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
    color: 'var(--cbp-workbench-color-base)',
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
    const lineChunks: string[] = [];
    Array.from(codeBlock.children).forEach(lines => {
        const tokenChunks: string[] = [];
        Array.from(lines.children).forEach(token => {
            tokenChunks.push(token.textContent ?? '');
        });
        lineChunks.push(tokenChunks.join(''));
    });
    return lineChunks.join('\n');
};

export default function WorkbenchTab(): JSX.Element {
    const { params, setParams } = useParams();

    const [code, setCode] = React.useState<string>('');
    const focusIndexRef = React.useRef<number>();

    const enableHighlight = (param: Param) => {
        const className = styles.Target__highlight;
        if (className) {
            param.ref.current?.classList.add(className);
        }
    };

    const disableHighlight = (param: Param) => {
        const className = styles.Target__highlight;
        if (className) {
            param.ref.current?.classList.remove(className);
        }
    };

    const handleMouseLeave = (param: Param, currIndex: number) => {
        if (focusIndexRef.current === currIndex) {
            return;
        }
        disableHighlight(param);
    };

    const handleFocus = (param: Param, currIndex: number) => {
        focusIndexRef.current = currIndex;
        enableHighlight(param);
        param.ref.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
        // Update the code initially.
        setCode(parseCodeBlock(param.ref.current));
    };

    const handleBlur = (param: Param) => {
        focusIndexRef.current = undefined;
        disableHighlight(param);
        if (param.currValue) {
            return;
        }
        if (!param.ref.current) {
            return;
        }
        param.ref.current.innerText ||= formatDefault(param);
    };

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        currIndex: number,
    ) => {
        setParams(params => params.map((param, index) => {
            if (index !== currIndex) {
                return param;
            }
            return {
                ...param,
                currValue: event.target.value,
            };
        }));
        const param = params[currIndex];
        if (!param) {
            return;
        }
        if (param.ref.current) {
            param.ref.current.innerText = event.target.value;
        }
        if (currIndex !== focusIndexRef.current) {
            return;
        }
        // Update the code on change.
        setCode(parseCodeBlock(param.ref.current));
    };

    return (
        <Layout>
            <StyledList disablePadding>
                {params.map((param, index) => {
                    return (
                        <ListItem
                            key={`${KEY_PREFIX}-${index}-${param.name}`}
                            disablePadding
                        >
                            <StyledTextField
                                // See: https://stackoverflow.com/questions/12374442/chrome-ignores-autocomplete-off
                                autoComplete='no-thank-you'
                                label={param.name}
                                onBlur={() => handleBlur(param)}
                                onChange={(event) => handleChange(
                                    event,
                                    index,
                                )}
                                onFocus={() => handleFocus(param, index)}
                                onMouseEnter={() => enableHighlight(param)}
                                onMouseLeave={() => handleMouseLeave(
                                    param,
                                    index,
                                )}
                                value={param.currValue}
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
