import type { WrapperProps } from '@docusaurus/types';
import ToolbarEntryInit from '@theme-init/docupotamus-common/Toolbar/Entry';
import { useToolbar } from '@theme/docupotamus-common';
import type ToolbarEntryType from '@theme/docupotamus-common/Toolbar/Entry';
import {
    WorkbenchIcon as EnvironmentVariablesWorkbenchIcon,
    WorkbenchTab as EnvironmentVariablesWorkbenchTab
} from '@theme/docupotamus-environment-variables';
import {
    WorkbenchIcon as TaskListWorkbenchIcon,
    WorkbenchTab as TaskListWorkbenchTab
} from '@theme/docupotamus-task-list';
import * as React from 'react';
import useIsEnabled from '../../../../package/hooks/useIsEnabled';

type Props = Readonly<WrapperProps<typeof ToolbarEntryType>>;

export default function ToolbarEntryWrapper(props: Props): JSX.Element {
    const envVarsIsEnabled = useIsEnabled('envVars');
    const { dispatchTabIdToConfig } = useToolbar();

    React.useEffect(() => {
        dispatchTabIdToConfig({
            type: 'setTab',
            tabId: 'task-list',
            newValue: {
                displayName: 'Task List',
                Component: <TaskListWorkbenchTab />,
                IconComponent: <TaskListWorkbenchIcon />,
            },
        });
        if (envVarsIsEnabled) {
            dispatchTabIdToConfig({
                type: 'setTab',
                tabId: 'environment-variables',
                newValue: {
                    displayName: 'Environment Variables',
                    Component: <EnvironmentVariablesWorkbenchTab />,
                    IconComponent: <EnvironmentVariablesWorkbenchIcon />,
                },
            });
        }
    }, []);

    return (
        <ToolbarEntryInit {...props} />
    );
};
