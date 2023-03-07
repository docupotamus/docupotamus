import { Mark } from '@mui/base/useSlider';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import * as React from 'react';

const backgroundColorDefault: string = 'color-primary';
const marginVerticalDefault: string = 'space-l';

interface LayoutProps {
    readonly backgroundColor: React.CSSProperties['backgroundColor'];
    readonly marginVertical: React.CSSProperties['margin'];
};

const Layout = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'backgroundColor' && prop !== 'marginVertical'
})<LayoutProps>(({ backgroundColor, marginVertical }) => ({
    '& > .MuiBox-root': {
        width: '100%',
        display: 'grid',
        placeItems: 'center',
        // TODO(dnguyen0304): Remove important flag.
        backgroundColor: `var(--ifm-${backgroundColor}) !important`,
    },
    '& > .MuiBox-root > h2': {
        color: 'var(--ifm-color-content-inverse)',
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
const marginVerticalMapping = toMapping(marginVerticalMarks);

export default function StylesClassicDemo(): JSX.Element {
    const [backgroundColor, setBackgroundColor] =
        React.useState<string>(backgroundColorDefault);
    const [marginVertical, setMarginVertical] =
        React.useState<React.CSSProperties['margin']>(marginVerticalDefault);

    const handleBackgroundColorChange = (
        _: Event,
        value: number | number[],
    ) => {
        const newValue = backgroundColorMapping.get(value as number);
        if (newValue) {
            setBackgroundColor(newValue);
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
            marginVertical={marginVertical}
        >
            <Box>
                <h2>doc8</h2>
            </Box>
            <Slider
                defaultValue={0}
                step={1}
                max={backgroundColorMarks.length - 1}
                marks={backgroundColorMarks}
                onChange={handleBackgroundColorChange}
                size='small'
                valueLabelDisplay='off'
            />
            <Slider
                defaultValue={3}
                step={1}
                max={marginVerticalMarks.length - 1}
                marks={marginVerticalMarks}
                onChange={handleMarginVerticalChange}
                size='small'
                valueLabelDisplay='off'
            />
        </Layout>
    );
};
