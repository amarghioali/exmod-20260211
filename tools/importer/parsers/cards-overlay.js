/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-overlay. Base: cards. Source: https://academy.worldbank.org/en/home.
 * Uses cards model: image (reference), text (richtext) per card.
 * Selector: .lp-sticky-card-grid
 */
export default function parse(element, { document }) {
  const cards = element.querySelectorAll('.lp-sticky-card');
  const cells = [];

  cards.forEach((card) => {
    const image = card.querySelector('.lp-sticky-card-img img, picture img');
    const heading = card.querySelector('.lp-sticky-card-content h3, h3');
    const desc = card.querySelector('.lp-sticky-card-content p, p');

    // Column 1: Image (field: image)
    const imgFrag = document.createDocumentFragment();
    if (image) {
      imgFrag.appendChild(document.createComment(' field:image '));
      imgFrag.appendChild(image.cloneNode(true));
    }

    // Column 2: Text (field: text)
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(' field:text '));
    if (heading) textFrag.appendChild(heading);
    if (desc) textFrag.appendChild(desc);

    cells.push([imgFrag, textFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-overlay', cells });
  element.replaceWith(block);
}
