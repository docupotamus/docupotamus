import Box from '@mui/material/Box';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import * as React from 'react';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
    readonly sx?: SxProps<Theme> | undefined;
};

export default function FlexImage(
    {
        sx,
        ...imgProps
    }: Props
): JSX.Element {
    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 'var(--ifm-leading)',
            ...sx,
        }}>
            <img width='60%' {...imgProps} />
        </Box>
    );
};
