import { Mark } from '@mui/base/useSlider';
import Box from '@mui/material/Box';
import Slider, { type SliderProps } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import * as React from 'react';

const backgroundColorDefault: string = 'color-primary';
const fontSizeDefault: string = 'font-size-3';
const marginVerticalDefault: string = 'space-xl';

const Layout = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

interface StyledBoxProps {
    readonly backgroundColor: string;
    readonly fontSize: string;
    readonly marginVertical: string;
};

const StyledBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'backgroundColor' && prop !== 'fontSize' && prop !== 'marginVertical'
})<StyledBoxProps>(({ backgroundColor, fontSize, marginVertical }) => ({
    '&.MuiBox-root': {
        width: '100%',
        display: 'grid',
        placeItems: 'center',
        // TODO(dnguyen0304): Remove important flag.
        backgroundColor: `var(--ifm-${backgroundColor}) !important`,
        marginTop: 'var(--doc8-space-l)',
    },
    '&.MuiBox-root > h2': {
        color: 'var(--ifm-color-content-inverse)',
        fontSize: `var(--doc8-${fontSize})`,
        marginTop: `var(--doc8-${marginVertical})`,
    },
    '&.MuiBox-root > h2:last-of-type': {
        marginBottom: `var(--doc8-${marginVertical})`,
    },
}));

const toMarks = (labels: string[]): Mark[] => {
    return labels.map((label, i) => ({ value: i, label }));
};

const toMapping = (marks: Mark[]): Map<number, string> => {
    return new Map(marks.map(mark => [mark.value, mark.label as string]));
};

const backgroundColorLabels: string[] = [
    backgroundColorDefault,
    'color-warning',
    'color-danger',
];
const fontSizeLabels: string[] = [
    'font-size-0',
    'font-size-1',
    'font-size-2',
    fontSizeDefault,
    'font-size-4',
    'font-size-5',
];
const marginVerticalLabels: string[] = [
    'space-xs',
    'space-s',
    'space-m',
    'space-l',
    marginVerticalDefault,
];

const backgroundColorMarks = toMarks(backgroundColorLabels);
const backgroundColorMapping = toMapping(backgroundColorMarks);
const fontSizeMarks = toMarks(fontSizeLabels);
const fontSizeMapping = toMapping(fontSizeMarks);
const marginVerticalMarks = toMarks(marginVerticalLabels);
const marginVerticalMapping = toMapping(marginVerticalMarks);

const sliderProps: Pick<SliderProps, 'size' | 'valueLabelDisplay'> = {
    size: 'small',
    valueLabelDisplay: 'off',
};

export default function StylesClassicDemo(): JSX.Element {
    const [backgroundColor, setBackgroundColor] =
        React.useState<string>(backgroundColorDefault);
    const [fontSize, setFontSize] =
        React.useState<string>(fontSizeDefault);
    const [marginVertical, setMarginVertical] =
        React.useState<string>(marginVerticalDefault);

    const handleBackgroundColorChange = (
        _: Event,
        value: number | number[],
    ) => {
        const newValue = backgroundColorMapping.get(value as number);
        if (newValue) {
            setBackgroundColor(newValue);
        }
    };

    const handleFontSizeChange = (
        _: Event,
        value: number | number[],
    ) => {
        const newValue = fontSizeMapping.get(value as number);
        if (newValue) {
            setFontSize(newValue);
        }
    };

    const handleMarginVerticalChange = (
        _: Event,
        value: number | number[],
    ) => {
        const newValue = marginVerticalMapping.get(value as number);
        if (newValue) {
            setMarginVertical(newValue);
        }
    };

    return (
        <Layout>
            <Box sx={{
                width: '85%',
                '& > * + *': {
                    marginTop: 'var(--doc8-space-xs)',
                },
            }}>
                <Slider
                    defaultValue={0}
                    step={1}
                    max={backgroundColorMarks.length - 1}
                    marks={backgroundColorMarks}
                    onChange={handleBackgroundColorChange}
                    {...sliderProps}
                />
                <Slider
                    defaultValue={3}
                    step={1}
                    max={fontSizeMarks.length - 1}
                    marks={fontSizeMarks}
                    onChange={handleFontSizeChange}
                    {...sliderProps}
                />
                <Slider
                    defaultValue={4}
                    step={1}
                    max={marginVerticalMarks.length - 1}
                    marks={marginVerticalMarks}
                    onChange={handleMarginVerticalChange}
                    {...sliderProps}
                />
            </Box>
            <StyledBox
                backgroundColor={backgroundColor}
                fontSize={fontSize}
                marginVertical={marginVertical}
            >
                <h2>minimalist</h2>
                <h2>responsive</h2>
                <h2>functional</h2>
                <h2>readable</h2>
            </StyledBox>
        </Layout>
    );
};
