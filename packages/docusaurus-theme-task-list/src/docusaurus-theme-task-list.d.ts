declare module '@docusaurus/theme-task-list' {
    import { CheckboxProps } from '@mui/material/Checkbox';
    import type { KeySequence } from 'react-hotkeys';

    interface TaskListThemeConfig {
        readonly checkbox: {
            readonly color: React.CSSProperties['color'];
            readonly shape: CheckboxShape;
            readonly size: CheckboxProps['size'];
        };
        readonly progressBar: {
            readonly isEnabled: boolean;
            readonly color: React.CSSProperties['color'];
        };
    }

    type CheckboxShape = 'circle' | 'square';

    type KeyBindings =
        | 'TAB_PREVIOUS'
        | 'TAB_NEXT';

    type KeyMap = {
        [key in KeyBindings]: KeySequence;
    };

    type KeyHandlers = {
        [key in KeyBindings]: (
            keyboardEvent?: KeyboardEvent | undefined,
        ) => void;
    };
}
