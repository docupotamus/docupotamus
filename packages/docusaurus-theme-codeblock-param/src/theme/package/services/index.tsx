import { Param } from '@doc8/theme-codeblock-param';

export const formatDefault = (
    param: Pick<Param, 'name' | 'defaultValue'>,
): string => {
    return param.defaultValue || `{{ ${param.name} }}`;
};
