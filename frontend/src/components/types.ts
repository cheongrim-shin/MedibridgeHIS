export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg';

export type ComponentColor =
    | 'indigo'
    | 'green'
    | 'red'
    | 'gray'
    | 'slate'
    | 'teal'
    | 'amber'
    | 'blue'
    | 'violet'
    | 'none';

export interface BaseUIProps {
    size?: ComponentSize;
    color?: ComponentColor;
}





