import { useLocation } from '@docusaurus/router';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTasks } from '../../contexts/tasks';
import useLabelsParsed from '../../hooks/useLabelsParsed';
import List from './List';
// import WorkbenchButton from './WorkbenchButton';
import styles from './WorkbenchButton/styles.module.css';

const Layout = styled(Box)({
    position: 'relative',

    [`&.MuiBox-root:hover .${styles.WorkbenchButton_layout},
      &.MuiBox-root:focus .${styles.WorkbenchButton_layout}`]: {
        opacity: 1,
        visibility: 'visible',
    },
});

interface Props {
    readonly children: React.ReactNode;
};

export default function TaskList(
    {
        children,
    }: Props,
): JSX.Element {
    const labels = useLabelsParsed(children);
    const location = useLocation();
    const { dispatchTasks } = useTasks();

    const [taskListId, setTaskListId] = React.useState<string>('');

    React.useEffect(() => {
        if (!labels.length) {
            return;
        }
        const newTaskListId = uuidv4();
        setTaskListId(newTaskListId);
        dispatchTasks({
            type: 'setTaskList',
            path: location.pathname,
            taskListId: newTaskListId,
            labels,
        });
    }, [labels]);

    return (
        <Layout className='DocupotamusTaskList'>
            <List
                path={location.pathname}
                taskListId={taskListId}
            />
            {/* <WorkbenchButton /> */}
        </Layout>
    );
};
