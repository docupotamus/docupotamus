import * as React from 'react';
import { TasksProvider } from '../../package/contexts/tasks';
import '../../package/styles.css';

interface Props {
    readonly children: React.ReactNode;
};

export default function RootDecorator({ children }: Props): JSX.Element {
    return (
        <TasksProvider>
            {children}
        </TasksProvider>
    );
};
