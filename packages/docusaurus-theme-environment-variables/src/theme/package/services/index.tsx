import { Variable } from '@docupotamus/theme-environment-variables';

export const formatDefault = (
    variable: Pick<Variable, 'defaultValue' | 'key'>,
): string => {
    return variable.defaultValue || `{{ ${variable.key} }}`;
};
