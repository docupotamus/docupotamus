import type { WrapperProps } from '@docusaurus/types';
import ToolbarEntryInit from '@theme-init/docupotamus-common/Toolbar/Entry';
import { useToolbar } from '@theme/docupotamus-common';
import type ToolbarEntryType from '@theme/docupotamus-common/Toolbar/Entry';
import {
    WorkbenchIcon as EnvironmentVariablesWorkbenchIcon
} from '@theme/docupotamus-environment-variables';
import {
    WorkbenchIcon as TaskListWorkbenchIcon
} from '@theme/docupotamus-task-list';
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
                Component: React.lazy(() =>
                    import('@theme/docupotamus-task-list')
                        .then(module => ({ default: module.WorkbenchTab }))),
                IconComponent: <TaskListWorkbenchIcon />,
            },
        });
        dispatchTabIdToConfig({
            type: 'setTab',
            tabId: 'environment-variables',
            newValue: {
                displayName: 'Environment Variables',
                Component: React.lazy(() =>
                    import('@theme/docupotamus-environment-variables')
                        .then(module => ({ default: module.WorkbenchTab }))),
                IconComponent: <EnvironmentVariablesWorkbenchIcon />,
            },
        });
    }, []);

    return (
        <ToolbarEntryInit {...props} />
    );
};
