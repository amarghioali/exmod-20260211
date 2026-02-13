/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroVideoParser from './parsers/hero-video.js';
import cardsOverlayParser from './parsers/cards-overlay.js';
import cardsHighlightParser from './parsers/cards-highlight.js';
import carouselProgramsParser from './parsers/carousel-programs.js';
import programFinderParser from './parsers/program-finder.js';
import tabsProgramsParser from './parsers/tabs-programs.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/worldbank-cleanup.js';
import sectionsTransformer from './transformers/worldbank-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-video': heroVideoParser,
  'cards-overlay': cardsOverlayParser,
  'cards-highlight': cardsHighlightParser,
  'carousel-programs': carouselProgramsParser,
  'program-finder': programFinderParser,
  'tabs-programs': tabsProgramsParser,
};

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'World Bank Academy homepage with hero, featured content, and navigation',
  urls: [
    'https://academy.worldbank.org/en/home'
  ],
  blocks: [
    {
      name: 'hero-video',
      instances: ['section.video-banner']
    },
    {
      name: 'cards-overlay',
      instances: ['.lp-sticky-card-grid']
    },
    {
      name: 'cards-highlight',
      instances: ['.academySliderComp']
    },
    {
      name: 'carousel-programs',
      instances: ['.academy_carousel:not(.lp__tab .academy_carousel)']
    },
    {
      name: 'program-finder',
      instances: ['section.lp-find-program']
    },
    {
      name: 'tabs-programs',
      instances: ['.lp__tab']
    }
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero Video Banner',
      selector: 'section.video-banner',
      style: null,
      blocks: ['hero-video'],
      defaultContent: []
    },
    {
      id: 'section-2',
      name: 'Value Proposition Cards',
      selector: ['section.sticky-section#one-center', '.supergrid:nth-of-type(1)'],
      style: null,
      blocks: ['cards-overlay'],
      defaultContent: ['.sticky-content .lp-aca-heading h2', '.sticky-content .lp-aca-heading a']
    },
    {
      id: 'section-3',
      name: 'Program Types',
      selector: '.supergrid:nth-of-type(2)',
      style: null,
      blocks: ['cards-highlight'],
      defaultContent: ['.academyTitle .lp-aca-heading h2']
    },
    {
      id: 'section-4',
      name: 'Impact Programs Carousel',
      selector: '.supergrid:nth-of-type(3)',
      style: 'light-blue',
      blocks: ['carousel-programs'],
      defaultContent: ['.academyTitle .lp-aca-heading h2', '.academyTitle .lp-aca-heading p']
    },
    {
      id: 'section-5',
      name: 'Program Finder',
      selector: 'section.lp-find-program#two-center',
      style: null,
      blocks: ['program-finder'],
      defaultContent: []
    },
    {
      id: 'section-6',
      name: 'Programs by Topic',
      selector: '.supergrid:nth-of-type(5)',
      style: 'light-blue',
      blocks: ['tabs-programs'],
      defaultContent: ['.academyTitle .lp-aca-heading h2', '.academyTitle .lp-aca-heading p']
    }
  ]
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '')
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
