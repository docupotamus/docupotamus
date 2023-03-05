import type { WrapperProps } from '@docusaurus/types';
import ToolbarEntryInit from '@theme-init/docupotamus-common/Toolbar/Entry';
import { useToolbar } from '@theme/docupotamus-common';
import type ToolbarEntryType from '@theme/docupotamus-common/Toolbar/Entry';
import { WorkbenchIcon, WorkbenchTab } from '@theme/docupotamus-task-list';
import * as React from 'react';

type Props = Readonly<WrapperProps<typeof ToolbarEntryType>>;

export default function ToolbarEntryWrapper(props: Props): JSX.Element {
    const { dispatchTabIdToConfig } = useToolbar();

    React.useEffect(() => {
        dispatchTabIdToConfig({
            type: 'setTab',
            tabId: 'task-list',
            newValue: {
                tabId: 'task-list',
                displayName: 'Task List',
                Component: <WorkbenchTab />,
                IconComponent: <WorkbenchIcon />,
            },
        })
    }, []);

    return (
        <ToolbarEntryInit {...props} />
    );
};
