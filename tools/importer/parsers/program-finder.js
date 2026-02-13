/* eslint-disable */
/* global WebImporter */

/**
 * Parser for program-finder. Source: https://academy.worldbank.org/en/home.
 * Custom block with no xwalk model. Block JS expects rows of [label, options].
 * Selector: section.lp-find-program
 * DOM structure: section.lp-find-program > .finder-container > .custom-dropdown
 */
export default function parse(element, { document }) {
  const dropdowns = element.querySelectorAll('.custom-dropdown');
  const cells = [];

  dropdowns.forEach((dropdown) => {
    const label = dropdown.querySelector('.selectedspan, .selected span');
    const options = dropdown.querySelectorAll('.options .option');

    // Cell 1: Dropdown label
    const labelText = label ? label.textContent.trim() : '';

    // Cell 2: Options (newline-separated for block JS parsing)
    const optionTexts = Array.from(options)
      .map((opt) => opt.textContent.trim())
      .filter(Boolean);
    const optionsText = optionTexts.join('\n');

    cells.push([labelText, optionsText]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'program-finder', cells });
  element.replaceWith(block);
}
