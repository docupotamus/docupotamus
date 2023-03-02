import type { WrapperProps } from '@docusaurus/types';
import RootInit from '@theme-init/Root';
import { RootDecorator as CommonDecorator } from '@theme/docupotamus-common';
import { RootDecorator as TaskListDecorator } from '@theme/docupotamus-task-list';
import type RootType from '@theme/Root';
import * as React from 'react';

type Props = Readonly<WrapperProps<typeof RootType>>;

export default function RootWrapper(props: Props): JSX.Element {
    return (
        <CommonDecorator>
            <TaskListDecorator>
                <RootInit {...props} />
            </TaskListDecorator>
        </CommonDecorator>
    );
};
