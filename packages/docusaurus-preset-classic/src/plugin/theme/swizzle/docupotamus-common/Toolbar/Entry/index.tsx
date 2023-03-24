import type { WrapperProps } from '@docusaurus/types';
import ToolbarEntryInit from '@theme-init/docupotamus-common/Toolbar/Entry';
import {
    WorkbenchIcon as ParamWorkbenchIcon,
    WorkbenchTab as ParamWorkbenchTab
} from '@theme/docupotamus-codeblock-param';
import { useToolbar } from '@theme/docupotamus-common';
import type ToolbarEntryType from '@theme/docupotamus-common/Toolbar/Entry';
import {
    WorkbenchIcon as TaskListWorkbenchIcon,
    WorkbenchTab as TaskListWorkbenchTab
} from '@theme/docupotamus-task-list';
import * as React from 'react';
import useIsEnabled from '../../../../package/hooks/useIsEnabled';

type Props = Readonly<WrapperProps<typeof ToolbarEntryType>>;

export default function ToolbarEntryWrapper(props: Props): JSX.Element {
    const paramIsEnabled = useIsEnabled('param');
    const taskListIsEnabled = useIsEnabled('taskList');
    const { dispatchTabIdToConfig } = useToolbar();

    React.useEffect(() => {
        if (taskListIsEnabled) {
            dispatchTabIdToConfig({
                type: 'setTab',
                tabId: 'task-list',
                newValue: {
                    displayName: 'Task List',
                    Component: <TaskListWorkbenchTab />,
                    IconComponent: <TaskListWorkbenchIcon />,
                },
            });
        }
        if (paramIsEnabled) {
            dispatchTabIdToConfig({
                type: 'setTab',
                tabId: 'param',
                newValue: {
                    displayName: 'Parameters',
                    Component: <ParamWorkbenchTab />,
                    IconComponent: <ParamWorkbenchIcon />,
                },
            });
        }
    }, []);

    return (
        <ToolbarEntryInit {...props} />
    );
};
