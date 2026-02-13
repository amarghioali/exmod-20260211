/* eslint-disable */
/* global WebImporter */

/**
 * Parser for tabs-programs. Base: tabs. Source: https://academy.worldbank.org/en/home.
 * Container model fields: title (text), content_heading (text),
 *   content_headingType (collapsed), content_image (reference), content_richtext (richtext).
 * Selector: .lp__tab
 * DOM structure: .lp__tab > tab > .lp__tab_components > .lp__wrapper > ul.lp__tablist (tabs)
 *               .lp__tab > tab > .lp__tab_components > .lp__tabcontent > div.tab_wbr (panels)
 */
export default function parse(element, { document }) {
  const tabLinks = element.querySelectorAll('.lp__tablist li a');
  const tabPanels = element.querySelectorAll('.lp__tabcontent > .tab_wbr, .lp__tabcontent > [id^="tab-"]');
  const cells = [];

  tabLinks.forEach((tabLink, index) => {
    const panel = tabPanels[index];

    // Column 1: Tab title (field: title)
    const titleFrag = document.createDocumentFragment();
    titleFrag.appendChild(document.createComment(' field:title '));
    titleFrag.appendChild(document.createTextNode(tabLink.textContent.trim()));

    // Column 2: Content (grouped content_ fields)
    const contentFrag = document.createDocumentFragment();

    if (panel) {
      const firstImage = panel.querySelector('.lp-aca-card-img img, picture img, img');
      const firstHeading = panel.querySelector('h3.lp-aca-card-title, h3, h2');
      const allCards = panel.querySelectorAll('.lp-aca-card');

      // field: content_heading
      if (firstHeading) {
        contentFrag.appendChild(document.createComment(' field:content_heading '));
        const h3 = document.createElement('h3');
        h3.textContent = firstHeading.textContent.trim();
        contentFrag.appendChild(h3);
      }

      // field: content_image
      if (firstImage) {
        contentFrag.appendChild(document.createComment(' field:content_image '));
        contentFrag.appendChild(firstImage.cloneNode(true));
      }

      // field: content_richtext - combine all cards into richtext
      contentFrag.appendChild(document.createComment(' field:content_richtext '));
      allCards.forEach((card) => {
        const heading = card.querySelector('h3.lp-aca-card-title a, h3 a');
        const desc = card.querySelector('.lp-aca-card-description');
        if (heading) {
          const p = document.createElement('p');
          const strong = document.createElement('strong');
          const a = heading.cloneNode(true);
          strong.appendChild(a);
          p.appendChild(strong);
          contentFrag.appendChild(p);
        }
        if (desc) {
          const p = document.createElement('p');
          p.textContent = desc.textContent.trim();
          contentFrag.appendChild(p);
        }
      });
    }

    cells.push([titleFrag, contentFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-programs', cells });
  element.replaceWith(block);
}
