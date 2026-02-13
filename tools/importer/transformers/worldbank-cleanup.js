/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: World Bank Academy cleanup.
 * Selectors from captured DOM of https://academy.worldbank.org/en/home.
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove cookie/consent banners, overlays (from captured DOM)
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '[class*="cookie"]',
      '.overlay',
      '.modal-backdrop',
    ]);
  }
  if (hookName === H.after) {
    // Remove non-authorable content: header, footer, navigation, breadcrumbs
    WebImporter.DOMUtils.remove(element, [
      'header',
      'footer',
      'nav.nav-menu',
      'nav#menu',
      'nav.lp-page-title',
      'iframe',
      'link',
      'noscript',
      'script',
      '.social-share',
    ]);
    // Clean tracking attributes
    element.querySelectorAll('*').forEach((el) => {
      el.removeAttribute('data-track');
      el.removeAttribute('onclick');
      el.removeAttribute('data-analytics');
    });
  }
}
