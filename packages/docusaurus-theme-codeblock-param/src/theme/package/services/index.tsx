import { Variable } from '@doc8/theme-codeblock-param';

export const formatDefault = (
    variable: Pick<Variable, 'name' | 'defaultValue'>,
): string => {
    return variable.defaultValue || `{{ ${variable.name} }}`;
};
