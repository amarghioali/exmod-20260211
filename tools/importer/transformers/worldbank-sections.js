/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: World Bank Academy sections.
 * Adds section breaks and section-metadata blocks from template sections.
 * Runs in afterTransform only.
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.after) {
    const { template } = payload;
    if (!template || !template.sections || template.sections.length < 2) return;

    const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document: element };

    // Process sections in reverse order to preserve DOM positions
    const sections = [...template.sections].reverse();

    sections.forEach((section) => {
      // Try each selector (can be string or array)
      const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
      let sectionEl = null;

      for (const sel of selectors) {
        sectionEl = element.querySelector(sel);
        if (sectionEl) break;
      }

      if (!sectionEl) return;

      // Add section-metadata block if section has a style
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        // Insert after section's last relevant element
        sectionEl.after(sectionMetadata);
      }

      // Add section break (hr) before section, unless it's the first section
      if (section.id !== 'section-1') {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    });
  }
}
