import Box from '@mui/material/Box';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import * as React from 'react';

type WidthName = 'm' | 'l';

const WidthNameToValue: Record<WidthName, string> = {
    'm': '60%',
    'l': '80%',
};

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
    readonly sx?: SxProps<Theme> | undefined;
    readonly width?: WidthName;
};

export default function FlexImage(
    {
        sx,
        ...imgProps
    }: Props
): JSX.Element {
    const { width = 'm', ...rest } = imgProps;

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 'var(--ifm-leading)',
            ...sx,
        }}>
            <img width={WidthNameToValue[width]} {...rest} />
        </Box>
    );
};
