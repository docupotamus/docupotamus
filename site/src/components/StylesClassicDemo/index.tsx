import { Mark } from '@mui/base/useSlider';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import * as React from 'react';

const backgroundColorDefault: string = '--ifm-color-primary';

interface LayoutProps {
    readonly backgroundColor: string;
};

const Layout = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'backgroundColor'
})<LayoutProps>(({ backgroundColor }) => ({
    '& > .MuiBox-root': {
        width: '100%',
        display: 'grid',
        placeItems: 'center',
        // TODO(dnguyen0304): Remove important flag.
        backgroundColor: `var(${backgroundColor}) !important`,
    },
    '& > .MuiBox-root > h2': {
        color: 'var(--ifm-color-content-inverse)',
        margin: 'var(--doc8-space-l) 0',
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
        value: 50,
        label: '--ifm-color-warning',
    },
    {
        value: 100,
        label: '--ifm-color-danger',
    },
];

const backgroundColorMapping = toMapping(backgroundColorMarks);

export default function StylesClassicDemo(): JSX.Element {
    const [backgroundColor, setBackgroundColor] =
        React.useState<string>(backgroundColorDefault);

    const handleBackgroundColorChange = (
        _: Event,
        value: number | number[],
    ) => {
        const newValue = backgroundColorMapping.get(value as number);
        if (newValue) {
            setBackgroundColor(newValue);
        }
    };

    return (
        <Layout backgroundColor={backgroundColor}>
            <Box>
                <h2>doc8</h2>
            </Box>
            <Slider
                defaultValue={0}
                marks={backgroundColorMarks}
                max={100}
                onChange={handleBackgroundColorChange}
                step={50}
                valueLabelDisplay='auto'
            />
        </Layout>
    );
};
