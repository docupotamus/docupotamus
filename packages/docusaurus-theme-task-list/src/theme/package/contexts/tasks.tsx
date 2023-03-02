import * as React from 'react';
import { ReactContextError } from './errors';

interface TaskItemData {
    readonly label: string;
    isChecked: boolean;
};

interface TaskListData {
    readonly items: TaskItemData[];
};

// locationPath to taskListId to taskList
interface KeyedTaskListData extends Map<string, Map<string, TaskListData>> { };

type Action =
    | {
        type: 'setTaskList';
        path: string;
        taskListId: string;
        labels: string[];
    }
    | {
        type: 'setIsChecked';
        path: string;
        taskListId: string;
        itemIndex: number;
        newValue: boolean;
    };

const reducer = (
    prev: KeyedTaskListData,
    action: Action,
): KeyedTaskListData => {
    const newMapping = new Map(prev);
    if (action.type === 'setTaskList') {
        if (!newMapping.has(action.path)) {
            newMapping.set(action.path, new Map<string, TaskListData>());
        }
        newMapping.get(action.path)?.set(action.taskListId, {
            items: action.labels.map(label => ({
                label,
                isChecked: false,
            }))
        });
    }
    if (action.type === 'setIsChecked') {
        const idToTaskList =
            newMapping.get(action.path) ?? new Map<string, TaskListData>();
        const taskList = idToTaskList.get(action.taskListId) ?? { items: [] };
        const taskItem = taskList.items[action.itemIndex];
        if (taskItem) {
            taskItem.isChecked = action.newValue;
        }
    }
    return newMapping;
};

interface ContextValue {
    readonly tasks: KeyedTaskListData;
    readonly dispatchTasks: React.Dispatch<Action>;
};

const Context = React.createContext<ContextValue | undefined>(undefined);

const useContextValue = (): ContextValue => {
    const [tasks, dispatchTasks] = React.useReducer(reducer, new Map());

    return React.useMemo(
        () => ({
            tasks,
            dispatchTasks,
        }),
        [
            tasks,
            dispatchTasks,
        ],
    );
};

interface Props {
    readonly children: React.ReactNode;
};

export const TasksProvider = ({ children }: Props): JSX.Element => {
    const value = useContextValue();

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
};

export const useTasks = (): ContextValue => {
    const context = React.useContext(Context);
    if (context === undefined) {
        throw new ReactContextError('TasksProvider');
    }
    return context;
};
