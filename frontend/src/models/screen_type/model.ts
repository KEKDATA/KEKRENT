import { createEvent, restore } from 'effector';

export enum ScreenType {
  Mobile = 'mobile',
  Tablet = 'tablet',
  Desktop = 'desktop',
}
const INITIAL_SCREEN_STATE = {
  isMobile: false,
  isTablet: false,
  isDesktop: false,
};

export const screenTypeChanged = createEvent<ScreenType | null>();
export const $currentScreenType = restore(screenTypeChanged, null);

export const $screenType = $currentScreenType.map((currentType) => {
  switch (currentType) {
    case ScreenType.Mobile:
      return { ...INITIAL_SCREEN_STATE, isMobile: true };
    case ScreenType.Tablet:
      return { ...INITIAL_SCREEN_STATE, isTablet: true };
    case ScreenType.Desktop:
      return { ...INITIAL_SCREEN_STATE, isDesktop: true };
    default:
      return INITIAL_SCREEN_STATE;
  }
});
export const $isMobileScreenType = $currentScreenType.map(
  (currentType) => currentType === ScreenType.Mobile,
);
