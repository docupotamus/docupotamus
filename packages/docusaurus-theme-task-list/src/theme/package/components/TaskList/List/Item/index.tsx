import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CircleCheckedFilled from '@mui/icons-material/CheckCircle';
import CircleUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import useThemeConfig from '../../../../hooks/useThemeConfig';

interface StyledFormControlLabelProps {
    readonly hoverColor: React.CSSProperties['color'];
    readonly hoverColorBackground: React.CSSProperties['color'];
};

const StyledFormControlLabel = styled(FormControlLabel, {
    shouldForwardProp: (prop) => prop !== 'hoverColor' && prop !== 'hoverColorBackground'
})<StyledFormControlLabelProps>(({ hoverColor, hoverColorBackground }) => ({
    borderRadius: 'var(--doc8-space-3xs-2xs)',
    padding: '0.2rem 0.7rem 0.2rem 0.5rem',
    transition: 'var(--ifm-hover-overlay-transition)',
    '&:hover, &:focus': {
        backgroundColor: hoverColorBackground,
    },
    '& .MuiFormControlLabel-label': {
        fontFamily: 'inherit',
    },
    [`&:hover :not(.Mui-checked) + .MuiFormControlLabel-label,
      &:focus :not(.Mui-checked) + .MuiFormControlLabel-label`]: {
        color: hoverColor,
    },
    '& .Mui-checked + .MuiFormControlLabel-label': {
        opacity: 0.5,
        textDecorationLine: 'line-through',
    },
}));

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
        content: {
            hoverColor,
            hoverColorBackground,
        },
    } = useThemeConfig();

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
            hoverColor={hoverColor}
            hoverColorBackground={hoverColorBackground}
            label={label}
            onChange={() => setIsChecked(!isChecked)}
        />
    );
};
