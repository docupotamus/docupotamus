import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useTasks } from '../../../contexts/tasks';
import useTaskListThemeConfig from '../../../hooks/useTaskListThemeConfig';
import Item from './Item';
import LinearProgress from './LinearProgress';

export const CLASS_NAME: string = 'DocupotamusTaskList_layout';

const StyledBox = styled(Box)({
    position: 'relative',

    '&.MuiBox-root': {
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--d9s-space-3xs-2xs)',
        marginTop: 'var(--ifm-leading)',
        marginBottom: 'var(--ifm-leading)',
    },
    '&.MuiBox-root .MuiFormGroup-root': {
        paddingLeft: 'var(--d9s-space-xs)',
    },
    '& .MuiFormControlLabel-root + .MuiFormControlLabel-root': {
        marginTop: 'var(--d9s-list-item-gap-2xs)',
    },
});

interface Props {
    readonly path: string;
    readonly taskListId: string;
};

export default function List(
    {
        path,
        taskListId,
    }: Props,
): JSX.Element {
    const {
        progressBar: {
            isEnabled: progressBarIsEnabled,
        },
    } = useTaskListThemeConfig();
    const { tasks, dispatchTasks } = useTasks();

    const [progress, setProgress] = React.useState<number>(0);

    const taskItemsData = tasks.get(path)?.get(taskListId)?.items ?? [];

    React.useEffect(() => {
        const isCheckedCount = taskItemsData
            .map(x => x.isChecked)
            .filter(Boolean)
            .length;
        const newProgress =
            (taskItemsData.length)
                ? Math.floor(isCheckedCount / taskItemsData.length * 100)
                : 0;
        setProgress(newProgress);
    }, [tasks]);

    return (
        <StyledBox className={CLASS_NAME}>
            {progressBarIsEnabled && <LinearProgress value={progress} />}
            <FormGroup>
                {taskItemsData.map(({ label, isChecked }, itemIndex) => {
                    return (
                        <Item
                            // If items are modified, update how the key is
                            // generated.
                            key={`taskItem-${itemIndex}`}
                            label={label}
                            isChecked={isChecked}
                            setIsChecked={(newValue: boolean) => dispatchTasks({
                                type: 'setIsChecked',
                                path,
                                taskListId,
                                itemIndex,
                                newValue,
                            })}
                        />
                    );
                })}
            </FormGroup>
        </StyledBox>
    );
};
