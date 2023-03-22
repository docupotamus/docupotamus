import type {
    PluginOptions as HookPluginOptions
} from '@doc8/plugin-content-docs-src-hook';
import {
    validateOptions as baseValidateOptions,
    type Options as BaseOptions,
    type PluginOptions as BasePluginOptions
} from '@docusaurus/plugin-content-docs';
import type { OptionValidationContext, Validate } from '@docusaurus/types';
import { Joi } from '@docusaurus/utils-validation';

interface HookPluginOptionsSubset extends Pick<
    HookPluginOptions, 'swizzleIsEnabled'
> { };

const DEFAULT_OPTIONS: HookPluginOptionsSubset = {
    swizzleIsEnabled: true,
};

// TODO(dnguyen0304): Investigate missing labels.
const OptionsSchema = Joi.object<HookPluginOptionsSubset>({
    swizzleIsEnabled: Joi
        .boolean()
        .default(DEFAULT_OPTIONS.swizzleIsEnabled),
}).default(DEFAULT_OPTIONS);

export const validateOptions = (
    {
        validate,
        options,
    }: OptionValidationContext<HookPluginOptions, HookPluginOptions>
): HookPluginOptions => {
    const { swizzleIsEnabled, ...optionsBase } = options;

    const validateUntyped = validate as unknown;
    const validateBase = validateUntyped as
        Validate<BaseOptions, BasePluginOptions>;
    const validateSubset = validateUntyped as
        Validate<HookPluginOptionsSubset, HookPluginOptionsSubset>;

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
