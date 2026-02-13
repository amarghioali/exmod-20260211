/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-video. Base: hero. Source: https://academy.worldbank.org/en/home.
 * xwalk model fields: image (reference), imageAlt (collapsed), text (richtext).
 * Selector: section.video-banner
 */
export default function parse(element, { document }) {
  // Extract background image or video poster
  const bgImage = element.querySelector('.banner-content img, .bg-video + picture img, picture img');
  const bgVideo = element.querySelector('video.bg-video source, video source');

  // Extract heading and description
  const heading = element.querySelector('h1, h2, .banner-content h1');
  const description = element.querySelector('.banner-content p, p');

  const cells = [];

  // Row 1: Image (field: image) - always present for model alignment
  const imgFrag = document.createDocumentFragment();
  imgFrag.appendChild(document.createComment(' field:image '));
  if (bgImage) {
    imgFrag.appendChild(bgImage.cloneNode(true));
  } else if (bgVideo) {
    // Use video source as a link so block JS can render it as video
    const a = document.createElement('a');
    a.href = bgVideo.getAttribute('src');
    a.textContent = bgVideo.getAttribute('src');
    imgFrag.appendChild(a);
  }
  cells.push([imgFrag]);

  // Row 2: Text content (field: text)
  const textFrag = document.createDocumentFragment();
  textFrag.appendChild(document.createComment(' field:text '));
  if (heading) textFrag.appendChild(heading);
  if (description) textFrag.appendChild(description);
  cells.push([textFrag]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-video', cells });
  element.replaceWith(block);
}
