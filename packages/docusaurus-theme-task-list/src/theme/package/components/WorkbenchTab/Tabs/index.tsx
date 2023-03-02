import { useLocation } from '@docusaurus/router';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import List from '../../TaskList/List';

const ClippingBox = styled(Box)({
    width: '100%',
    flexGrow: 1,

    overflowX: 'hidden',
});

interface LayoutProps {
    tabIndex: number;
};

const Layout = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'tabIndex'
})<LayoutProps>(({ tabIndex }) => ({
    height: '100%',

    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: '100%',
    alignItems: 'center',

    translate: `calc(-100% * ${tabIndex}) 0`,
    transition: `
        translate
        var(--ifm-transition-fast)
        var(--ifm-transition-timing-default)
    `,
}));

interface Props {
    readonly taskListIds: string[];
    readonly tabIndex: number;
};

export default function Tabs(
    {
        taskListIds,
        tabIndex,
    }: Props
): JSX.Element {
    const location = useLocation();

    return (
        <ClippingBox>
            <Layout tabIndex={tabIndex}>
                {taskListIds.map(taskListId => {
                    return (
                        <List
                            path={location.pathname}
                            taskListId={taskListId}
                        />
                    );
                })}
            </Layout>
        </ClippingBox>
    );
};
