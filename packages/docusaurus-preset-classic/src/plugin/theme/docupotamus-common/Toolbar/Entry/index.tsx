import type { WrapperProps } from '@docusaurus/types';
import ToolbarEntryInit from '@theme-init/docupotamus-common/Toolbar/Entry';
import { useToolbar } from '@theme/docupotamus-common';
import type ToolbarEntryType from '@theme/docupotamus-common/Toolbar/Entry';
import { WorkbenchIcon } from '@theme/docupotamus-task-list';
import * as React from 'react';

type Props = Readonly<WrapperProps<typeof ToolbarEntryType>>;

export default function ToolbarEntryWrapper(props: Props): JSX.Element {
    const { dispatchTabIdToConfig } = useToolbar();

    React.useEffect(() => {
        dispatchTabIdToConfig({
            type: 'setTab',
            tabId: 'task-list',
            newValue: {
                displayName: 'Task List',
                Component: React.lazy(() => import('@theme/docupotamus-task-list').then(module => ({ default: module.WorkbenchTab }))),
                IconComponent: <WorkbenchIcon />,
            },
        })
    }, []);

    return (
        <ToolbarEntryInit {...props} />
    );
};
