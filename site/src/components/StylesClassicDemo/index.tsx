import { Mark } from '@mui/base/useSlider';
import Box from '@mui/material/Box';
import Slider, { type SliderProps } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import * as React from 'react';

const backgroundColorDefault: string = 'color-primary';
const fontSizeDefault: string = 'font-size-0';
const marginVerticalDefault: string = 'space-l';

interface LayoutProps {
    readonly backgroundColor: string;
    readonly fontSize: string;
    readonly marginVertical: string;
};

const Layout = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'backgroundColor' && prop !== 'fontSize' && prop !== 'marginVertical'
})<LayoutProps>(({ backgroundColor, fontSize, marginVertical }) => ({
    '& > .MuiBox-root': {
        width: '100%',
        display: 'grid',
        placeItems: 'center',
        // TODO(dnguyen0304): Remove important flag.
        backgroundColor: `var(--ifm-${backgroundColor}) !important`,
    },
    '& > .MuiBox-root > h2': {
        color: 'var(--ifm-color-content-inverse)',
        fontSize: `var(--doc8-${fontSize})`,
        margin: `var(--doc8-${marginVertical}) 0`,
    },
}));

const toMapping = (marks: Mark[]): Map<number, string> => {
    return new Map(marks.map(mark => [mark.value, mark.label as string]));
};

const backgroundColorMarks: Mark[] = [
    {
        value: 0,
        label: backgroundColorDefault,
    },
    {
        value: 1,
        label: 'color-warning',
    },
    {
        value: 2,
        label: 'color-danger',
    },
];
const fontSizeMarks: Mark[] = [
    {
        value: 0,
        label: 'font-size--2',
    },
    {
        value: 1,
        label: 'font-size--1',
    },
    {
        value: 2,
        label: fontSizeDefault,
    },
    {
        value: 3,
        label: 'font-size-1',
    },
    {
        value: 4,
        label: 'font-size-2',
    },
    {
        value: 5,
        label: 'font-size-3',
    },
];
const marginVerticalMarks: Mark[] = [
    {
        value: 0,
        label: 'space-xs',
    },
    {
        value: 1,
        label: 'space-s',
    },
    {
        value: 2,
        label: 'space-m',
    },
    {
        value: 3,
        label: marginVerticalDefault,
    },
    {
        value: 4,
        label: 'space-xl',
    },
];

const backgroundColorMapping = toMapping(backgroundColorMarks);
const fontSizeMapping = toMapping(fontSizeMarks);
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
        <Layout
            backgroundColor={backgroundColor}
            fontSize={fontSize}
            marginVertical={marginVertical}
        >
            <Box>
                <h2>docupotamus</h2>
            </Box>
            <Slider
                defaultValue={0}
                step={1}
                max={backgroundColorMarks.length - 1}
                marks={backgroundColorMarks}
                onChange={handleBackgroundColorChange}
                {...sliderProps}
            />
            <Slider
                defaultValue={0}
                step={1}
                max={fontSizeMarks.length - 1}
                marks={fontSizeMarks}
                onChange={handleFontSizeChange}
                {...sliderProps}
            />
            <Slider
                defaultValue={3}
                step={1}
                max={marginVerticalMarks.length - 1}
                marks={marginVerticalMarks}
                onChange={handleMarginVerticalChange}
                {...sliderProps}
            />
        </Layout>
    );
};
