import { ScreenType, screenTypeChanged } from 'models/screen_type/model';
import { useEffect } from 'react';

export enum DefaultBreakpoints {
  Desktop = 992,
  Tablet = 768,
  Mobile = 320,
}

export const calculateCurrentScreenType = () => ({
  isMobile: window.innerWidth < DefaultBreakpoints.Tablet,
  isTablet:
    window.innerWidth >= DefaultBreakpoints.Tablet &&
    window.innerWidth < DefaultBreakpoints.Desktop,
  isDesktop: window.innerWidth >= DefaultBreakpoints.Desktop,
});

const setScreenType = ({
  isMobile,
  isTablet,
  isDesktop,
}: {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}) => {
  switch (true) {
    case isMobile: {
      return screenTypeChanged(ScreenType.Mobile);
    }

    case isTablet: {
      return screenTypeChanged(ScreenType.Tablet);
    }

    case isDesktop: {
      return screenTypeChanged(ScreenType.Desktop);
    }

    default: {
      return;
    }
  }
};

export const useScreenType = () => {
  useEffect(() => {
    setScreenType(calculateCurrentScreenType());
    const desktopQueryList = matchMedia(
      `(min-width: ${DefaultBreakpoints.Desktop}px)`,
    );
    const tabletQueryList = matchMedia(
      `(min-width: ${DefaultBreakpoints.Tablet}px) and (max-width: ${
        DefaultBreakpoints.Desktop - 1
      }px)`,
    );
    const mobileQueryList = matchMedia(
      `(max-width: ${DefaultBreakpoints.Tablet}px)`,
    );

    mobileQueryList.addEventListener('change', () =>
      screenTypeChanged(ScreenType.Mobile),
    );
    tabletQueryList.addEventListener('change', () =>
      screenTypeChanged(ScreenType.Tablet),
    );
    desktopQueryList.addEventListener('change', () =>
      screenTypeChanged(ScreenType.Desktop),
    );

    return () => {
      mobileQueryList.removeEventListener('change', () =>
        screenTypeChanged(ScreenType.Mobile),
      );
      tabletQueryList.removeEventListener('change', () =>
        screenTypeChanged(ScreenType.Tablet),
      );
      desktopQueryList.removeEventListener('change', () =>
        screenTypeChanged(ScreenType.Desktop),
      );
    };
  }, []);
};
