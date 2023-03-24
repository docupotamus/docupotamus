import type { WrapperProps } from '@docusaurus/types';
import RootInit from '@theme-init/Root';
import { RootDecorator as CommonDecorator } from '@theme/docupotamus-common';
import {
    RootDecorator as EnvironmentVariablesDecorator
} from '@theme/docupotamus-environment-variables';
import {
    RootDecorator as TaskListDecorator
} from '@theme/docupotamus-task-list';
import type RootType from '@theme/Root';
import * as React from 'react';
import ConditionalWrap from '../../package/components/ConditionalWrap';
import useIsEnabled from '../../package/hooks/useIsEnabled';

type Props = Readonly<WrapperProps<typeof RootType>>;

export default function RootWrapper(props: Props): JSX.Element {
    const envVarsIsEnabled = useIsEnabled('envVars');

    return (
        <ConditionalWrap wrappers={[
            {
                Component: CommonDecorator,
                isIncluded: true,
            },
            {
                Component: EnvironmentVariablesDecorator,
                isIncluded: envVarsIsEnabled,
            },
            {
                Component: TaskListDecorator,
                isIncluded: true,
            },
        ]}>
            <RootInit {...props} />
        </ConditionalWrap>
    );
};
