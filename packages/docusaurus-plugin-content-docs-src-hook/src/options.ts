import type {
    AllPluginOptions,
    HookPluginOptions
} from '@doc8/plugin-content-docs-src-hook';
import {
    validateOptions as baseValidateOptions,
    type Options as BaseOptions,
    type PluginOptions as BasePluginOptions
} from '@docusaurus/plugin-content-docs';
import type { OptionValidationContext, Validate } from '@docusaurus/types';
import { Joi } from '@docusaurus/utils-validation';

const DEFAULT_OPTIONS: HookPluginOptions = {
    swizzleIsEnabled: true,
};

// TODO(dnguyen0304): Investigate missing labels.
const OptionsSchema = Joi.object<HookPluginOptions>({
    swizzleIsEnabled: Joi
        .boolean()
        .default(DEFAULT_OPTIONS.swizzleIsEnabled),
}).default(DEFAULT_OPTIONS);

export const validateOptions = (
    {
        validate,
        options,
    }: OptionValidationContext<AllPluginOptions, AllPluginOptions>
): AllPluginOptions => {
    const { swizzleIsEnabled, ...optionsBase } = options;

    const validateUntyped = validate as unknown;
    const validateBase = validateUntyped as
        Validate<BaseOptions, BasePluginOptions>;
    const validateSubset = validateUntyped as
        Validate<HookPluginOptions, HookPluginOptions>;

    const normalizedOptionsBase = baseValidateOptions({
        validate: validateBase,
        options: optionsBase,
    });
    const normalizedOptionsSubset = validateSubset(
        OptionsSchema,
        { swizzleIsEnabled },
    );

    return {
        ...normalizedOptionsBase,
        ...normalizedOptionsSubset,
    };
};
