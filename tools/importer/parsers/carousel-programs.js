/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel-programs. Base: carousel. Source: https://academy.worldbank.org/en/home.
 * Container model fields: media_image (reference), media_imageAlt (collapsed), content_text (richtext).
 * Selector: .academy_carousel:not(.lp__tab .academy_carousel)
 * DOM structure: .academy_carousel > .swiper-container > ul.swiper-wrapper > li.swiper-slide > .lp-aca-card
 */
export default function parse(element, { document }) {
  const slides = element.querySelectorAll('li.swiper-slide, .swiper-slide');
  const cells = [];

  slides.forEach((slide) => {
    const image = slide.querySelector('.lp-aca-card-img img, picture img');
    const tag = slide.querySelector('.lp-aca-card-tag');
    const heading = slide.querySelector('h3.lp-aca-card-title, h3');
    const desc = slide.querySelector('.lp-aca-card-description');

    // Column 1: Image (field: media_image, media_imageAlt is collapsed)
    const imgFrag = document.createDocumentFragment();
    if (image) {
      imgFrag.appendChild(document.createComment(' field:media_image '));
      imgFrag.appendChild(image.cloneNode(true));
    }

    // Column 2: Text content (field: content_text)
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(' field:content_text '));
    if (tag) {
      const em = document.createElement('em');
      em.textContent = tag.textContent.trim();
      textFrag.appendChild(em);
    }
    if (heading) textFrag.appendChild(heading.cloneNode(true));
    if (desc) {
      const p = document.createElement('p');
      p.textContent = desc.textContent.trim();
      textFrag.appendChild(p);
    }

    cells.push([imgFrag, textFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-programs', cells });
  element.replaceWith(block);
}
