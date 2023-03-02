import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CircleCheckedFilled from '@mui/icons-material/CheckCircle';
import CircleUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import useTaskListThemeConfig from '../../../../hooks/useTaskListThemeConfig';

const StyledFormControlLabel = styled(FormControlLabel)({
    borderRadius: 'var(--d9s-space-3xs-2xs)',
    padding: '0.2rem 0.7rem 0.2rem 0.5rem',
    transition: 'var(--ifm-hover-overlay-transition)',
    '&:hover': {
        backgroundColor: 'var(--ifm-hover-overlay)',
    },
    '& .MuiFormControlLabel-label': {
        fontFamily: 'inherit',
    },
    '&:hover :not(.Mui-checked) + .MuiFormControlLabel-label': {
        color: 'var(--ifm-color-primary)',
    },
    '& .Mui-checked + .MuiFormControlLabel-label': {
        opacity: 0.5,
        textDecorationLine: 'line-through',
    },
});

interface Props extends Pick<FormControlLabelProps, 'label'> {
    readonly isChecked: boolean;
    readonly setIsChecked: (newValue: boolean) => void;
};

export default function Item(
    {
        label,
        isChecked,
        setIsChecked,
    }: Props,
): JSX.Element {
    const {
        checkbox: {
            color,
            shape,
            size,
        },
    } = useTaskListThemeConfig();

    const [iconChecked, setIconChecked] =
        React.useState<JSX.Element>(<CheckBoxIcon />);
    const [iconNotChecked, setIconNotChecked] =
        React.useState<JSX.Element>(<CheckBoxOutlineBlankIcon />);

    React.useEffect(() => {
        if (shape === 'circle') {
            setIconChecked(<CircleCheckedFilled />);
            setIconNotChecked(<CircleUnchecked />);
        }
        if (shape === 'square') {
            setIconChecked(<CheckBoxIcon />);
            setIconNotChecked(<CheckBoxOutlineBlankIcon />);
        }
    }, [shape]);

    return (
        <StyledFormControlLabel
            checked={isChecked}
            control={
                <Checkbox
                    icon={iconNotChecked}
                    checkedIcon={iconChecked}
                    size={size}
                    sx={{
                        color: 'currentColor',
                        '&.Mui-checked .MuiSvgIcon-root': {
                            fill: `${color}`,
                        },
                    }}
                />
            }
            label={label}
            onChange={() => setIsChecked(!isChecked)}
        />
    );
};
