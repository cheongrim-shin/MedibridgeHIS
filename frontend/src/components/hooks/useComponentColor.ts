import { useLayoutContext } from '../layout/Layout.context';
import type { ComponentColor } from '../types';

/**
 * 컴포넌트의 prop color와 전역 LayoutContext의 테마 컬러를 병합하여 최종 적용할 컬러를 반환합니다.
 * @param propColor 컴포넌트 프롭으로 전달된 color (선택 사항)
 * @param defaultColor 전역 컨텍스트가 없을 때 사용할 백업 기본값 (기본값 'green')
 */
export const useComponentColor = (
    propColor?: ComponentColor,
    defaultColor: ComponentColor = 'green'
): ComponentColor => {
    const layoutContext = useLayoutContext();
    const layoutColor = layoutContext?.color;

    return propColor || layoutColor || defaultColor;
};
