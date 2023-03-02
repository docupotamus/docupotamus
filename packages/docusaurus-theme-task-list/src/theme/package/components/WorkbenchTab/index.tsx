import type {
    KeyHandlers as KeyHandlersType,
    KeyMap as KeyMapType
} from '@docusaurus/theme-task-list';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { HotKeys } from 'react-hotkeys';
import { CLASS_NAME } from '../../components/TaskList/List';
import { useTasks } from '../../contexts/tasks';
import ButtonGroup from './ButtonGroup';
import Tabs from './Tabs';

const keyMap: KeyMapType = {
    TAB_PREVIOUS: 'left',
    TAB_NEXT: 'right',
};

const Layout = styled(HotKeys)({
    height: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    color: 'var(--tl-workbench-color-base)',
    padding: 'var(--d9s-space-m)',
    paddingBottom: 'var(--d9s-space-xs)',
});

const useTaskListIds = (): string[] => {
    const { tasks } = useTasks();

    const [taskListIds, setTaskListIds] = React.useState<string[]>([]);

    React.useEffect(() => {
        setTaskListIds(Array.from(tasks.get(location.pathname)?.keys() ?? []));
    }, [tasks]);

    return taskListIds;
};

export default function WorkbenchTab(): JSX.Element {
    const taskListIds = useTaskListIds();

    const [tabIndex, setTabIndex] = React.useState<number>(0);
    const [tabIndexMax, setTabIndexMax] = React.useState<number>(0);

    const handlePreviousClick = () => {
        setTabIndex(prev => (prev === 0) ? prev : prev - 1);
    };

    const handleNextClick = () => {
        setTabIndex(prev => (prev === tabIndexMax) ? prev : prev + 1);
    };

    // TODO(dnguyen0304): Fix missing SSR defensive coding.
    // TODO(dnguyen0304): Investigate caching the elements.
    const handleScrollToClick = () => {
        document
            .querySelectorAll(`.${CLASS_NAME}`)[tabIndex]
            ?.scrollIntoView({
                block: 'center',
                behavior: 'smooth',
            });
    };

    const handlers: KeyHandlersType = {
        TAB_PREVIOUS: handlePreviousClick,
        TAB_NEXT: handleNextClick,
    };

    React.useEffect(() => {
        setTabIndexMax(taskListIds.length - 1);
    }, [taskListIds]);

    return (
        // TODO(dnguyen0304): Fix keyboard shortcuts for task items, possibly
        //   because of focus.
        <Layout keyMap={keyMap} handlers={handlers}>
            <Tabs
                taskListIds={taskListIds}
                tabIndex={tabIndex}
            />
            <ButtonGroup
                onPreviousClick={handlePreviousClick}
                onNextClick={handleNextClick}
                onScrollToClick={handleScrollToClick}
            />
        </Layout>
    );
};
