/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-highlight. Base: cards. Source: https://academy.worldbank.org/en/home.
 * Uses cards model: image (reference), text (richtext) per card.
 * Selector: .academySliderComp
 * DOM structure: .academySliderComp > .row > .col > .lp-aca-card
 */
export default function parse(element, { document }) {
  const cards = element.querySelectorAll('.lp-aca-card');
  const cells = [];

  cards.forEach((card) => {
    const image = card.querySelector('.lp-aca-card-img img, picture img');
    const tag = card.querySelector('.lp-aca-card-tag');
    const content = card.querySelector('.lp-aca-card-content');

    // Column 1: Image (field: image)
    const imgFrag = document.createDocumentFragment();
    if (image) {
      imgFrag.appendChild(document.createComment(' field:image '));
      imgFrag.appendChild(image.cloneNode(true));
    }

    // Column 2: Text content (field: text)
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(' field:text '));
    if (tag) {
      const em = document.createElement('em');
      em.textContent = tag.textContent.trim();
      textFrag.appendChild(em);
    }
    if (content) {
      Array.from(content.children).forEach((child) => {
        textFrag.appendChild(child.cloneNode(true));
      });
    }

    cells.push([imgFrag, textFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-highlight', cells });
  element.replaceWith(block);
}
