/**
 * Swizzled Navbar/MobileSidebar component.
 *
 * Overrides the default desktop breakpoint (996px) to 1280px so that the
 * mobile sidebar is available at medium-width viewports where the full
 * navbar items would otherwise overlap.
 *
 * See https://docusaurus.io/docs/styling-layout#mobile-view
 * Related issue: https://github.com/fastify/website/issues/405
 */

import { useWindowSize } from '@docusaurus/theme-common';
import {
    useLockBodyScroll,
    useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import NavbarMobileSidebarHeader from '@theme/Navbar/MobileSidebar/Header';
import NavbarMobileSidebarLayout from '@theme/Navbar/MobileSidebar/Layout';
import NavbarMobileSidebarPrimaryMenu from '@theme/Navbar/MobileSidebar/PrimaryMenu';
import NavbarMobileSidebarSecondaryMenu from '@theme/Navbar/MobileSidebar/SecondaryMenu';

// Custom breakpoint: collapse the navbar to a hamburger menu below this width.
// Must match the CSS media query breakpoint in src/css/custom.css.
const DESKTOP_BREAKPOINT = 1250;

export default function NavbarMobileSidebar() {
    const mobileSidebar = useNavbarMobileSidebar();
    const windowSize = useWindowSize({ desktopBreakpoint: DESKTOP_BREAKPOINT });
    useLockBodyScroll(mobileSidebar.shown);

    // Use our custom breakpoint instead of the context's default (996px)
    const shouldRender = !mobileSidebar.disabled && windowSize !== 'desktop';

    if (!shouldRender) {
        return null;
    }

    return (
        <NavbarMobileSidebarLayout
            header={<NavbarMobileSidebarHeader />}
            primaryMenu={<NavbarMobileSidebarPrimaryMenu />}
            secondaryMenu={<NavbarMobileSidebarSecondaryMenu />}
        />
    );
}
