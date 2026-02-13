var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-video.js
  function parse(element, { document }) {
    const bgImage = element.querySelector(".banner-content img, .bg-video + picture img, picture img");
    const bgVideo = element.querySelector("video.bg-video source, video source");
    const heading = element.querySelector("h1, h2, .banner-content h1");
    const description = element.querySelector(".banner-content p, p");
    const cells = [];
    const imgFrag = document.createDocumentFragment();
    imgFrag.appendChild(document.createComment(" field:image "));
    if (bgImage) {
      imgFrag.appendChild(bgImage.cloneNode(true));
    } else if (bgVideo) {
      const a = document.createElement("a");
      a.href = bgVideo.getAttribute("src");
      a.textContent = bgVideo.getAttribute("src");
      imgFrag.appendChild(a);
    }
    cells.push([imgFrag]);
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(" field:text "));
    if (heading) textFrag.appendChild(heading);
    if (description) textFrag.appendChild(description);
    cells.push([textFrag]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-video", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-overlay.js
  function parse2(element, { document }) {
    const cards = element.querySelectorAll(".lp-sticky-card");
    const cells = [];
    cards.forEach((card) => {
      const image = card.querySelector(".lp-sticky-card-img img, picture img");
      const heading = card.querySelector(".lp-sticky-card-content h3, h3");
      const desc = card.querySelector(".lp-sticky-card-content p, p");
      const imgFrag = document.createDocumentFragment();
      if (image) {
        imgFrag.appendChild(document.createComment(" field:image "));
        imgFrag.appendChild(image.cloneNode(true));
      }
      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(" field:text "));
      if (heading) textFrag.appendChild(heading);
      if (desc) textFrag.appendChild(desc);
      cells.push([imgFrag, textFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-overlay", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-highlight.js
  function parse3(element, { document }) {
    const cards = element.querySelectorAll(".lp-aca-card");
    const cells = [];
    cards.forEach((card) => {
      const image = card.querySelector(".lp-aca-card-img img, picture img");
      const tag = card.querySelector(".lp-aca-card-tag");
      const content = card.querySelector(".lp-aca-card-content");
      const imgFrag = document.createDocumentFragment();
      if (image) {
        imgFrag.appendChild(document.createComment(" field:image "));
        imgFrag.appendChild(image.cloneNode(true));
      }
      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(" field:text "));
      if (tag) {
        const em = document.createElement("em");
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
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-highlight", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-programs.js
  function parse4(element, { document }) {
    const slides = element.querySelectorAll("li.swiper-slide, .swiper-slide");
    const cells = [];
    slides.forEach((slide) => {
      const image = slide.querySelector(".lp-aca-card-img img, picture img");
      const tag = slide.querySelector(".lp-aca-card-tag");
      const heading = slide.querySelector("h3.lp-aca-card-title, h3");
      const desc = slide.querySelector(".lp-aca-card-description");
      const imgFrag = document.createDocumentFragment();
      if (image) {
        imgFrag.appendChild(document.createComment(" field:media_image "));
        imgFrag.appendChild(image.cloneNode(true));
      }
      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(" field:content_text "));
      if (tag) {
        const em = document.createElement("em");
        em.textContent = tag.textContent.trim();
        textFrag.appendChild(em);
      }
      if (heading) textFrag.appendChild(heading.cloneNode(true));
      if (desc) {
        const p = document.createElement("p");
        p.textContent = desc.textContent.trim();
        textFrag.appendChild(p);
      }
      cells.push([imgFrag, textFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-programs", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/program-finder.js
  function parse5(element, { document }) {
    const dropdowns = element.querySelectorAll(".custom-dropdown");
    const cells = [];
    dropdowns.forEach((dropdown) => {
      const label = dropdown.querySelector(".selectedspan, .selected span");
      const options = dropdown.querySelectorAll(".options .option");
      const labelText = label ? label.textContent.trim() : "";
      const optionTexts = Array.from(options).map((opt) => opt.textContent.trim()).filter(Boolean);
      const optionsText = optionTexts.join("\n");
      cells.push([labelText, optionsText]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "program-finder", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs-programs.js
  function parse6(element, { document }) {
    const tabLinks = element.querySelectorAll(".lp__tablist li a");
    const tabPanels = element.querySelectorAll('.lp__tabcontent > .tab_wbr, .lp__tabcontent > [id^="tab-"]');
    const cells = [];
    tabLinks.forEach((tabLink, index) => {
      const panel = tabPanels[index];
      const titleFrag = document.createDocumentFragment();
      titleFrag.appendChild(document.createComment(" field:title "));
      titleFrag.appendChild(document.createTextNode(tabLink.textContent.trim()));
      const contentFrag = document.createDocumentFragment();
      if (panel) {
        const firstImage = panel.querySelector(".lp-aca-card-img img, picture img, img");
        const firstHeading = panel.querySelector("h3.lp-aca-card-title, h3, h2");
        const allCards = panel.querySelectorAll(".lp-aca-card");
        if (firstHeading) {
          contentFrag.appendChild(document.createComment(" field:content_heading "));
          const h3 = document.createElement("h3");
          h3.textContent = firstHeading.textContent.trim();
          contentFrag.appendChild(h3);
        }
        if (firstImage) {
          contentFrag.appendChild(document.createComment(" field:content_image "));
          contentFrag.appendChild(firstImage.cloneNode(true));
        }
        contentFrag.appendChild(document.createComment(" field:content_richtext "));
        allCards.forEach((card) => {
          const heading = card.querySelector("h3.lp-aca-card-title a, h3 a");
          const desc = card.querySelector(".lp-aca-card-description");
          if (heading) {
            const p = document.createElement("p");
            const strong = document.createElement("strong");
            const a = heading.cloneNode(true);
            strong.appendChild(a);
            p.appendChild(strong);
            contentFrag.appendChild(p);
          }
          if (desc) {
            const p = document.createElement("p");
            p.textContent = desc.textContent.trim();
            contentFrag.appendChild(p);
          }
        });
      }
      cells.push([titleFrag, contentFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "tabs-programs", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/worldbank-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk",
        '[class*="cookie"]',
        ".overlay",
        ".modal-backdrop"
      ]);
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, [
        "header",
        "footer",
        "nav.nav-menu",
        "nav#menu",
        "nav.lp-page-title",
        "iframe",
        "link",
        "noscript",
        "script",
        ".social-share"
      ]);
      element.querySelectorAll("*").forEach((el) => {
        el.removeAttribute("data-track");
        el.removeAttribute("onclick");
        el.removeAttribute("data-analytics");
      });
    }
  }

  // tools/importer/transformers/worldbank-sections.js
  var H2 = { before: "beforeTransform", after: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === H2.after) {
      const { template } = payload;
      if (!template || !template.sections || template.sections.length < 2) return;
      const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document: element };
      const sections = [...template.sections].reverse();
      sections.forEach((section) => {
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selectors) {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        }
        if (!sectionEl) return;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(sectionMetadata);
        }
        if (section.id !== "section-1") {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      });
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-video": parse,
    "cards-overlay": parse2,
    "cards-highlight": parse3,
    "carousel-programs": parse4,
    "program-finder": parse5,
    "tabs-programs": parse6
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "World Bank Academy homepage with hero, featured content, and navigation",
    urls: [
      "https://academy.worldbank.org/en/home"
    ],
    blocks: [
      {
        name: "hero-video",
        instances: ["section.video-banner"]
      },
      {
        name: "cards-overlay",
        instances: [".lp-sticky-card-grid"]
      },
      {
        name: "cards-highlight",
        instances: [".academySliderComp"]
      },
      {
        name: "carousel-programs",
        instances: [".academy_carousel:not(.lp__tab .academy_carousel)"]
      },
      {
        name: "program-finder",
        instances: ["section.lp-find-program"]
      },
      {
        name: "tabs-programs",
        instances: [".lp__tab"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero Video Banner",
        selector: "section.video-banner",
        style: null,
        blocks: ["hero-video"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Value Proposition Cards",
        selector: ["section.sticky-section#one-center", ".supergrid:nth-of-type(1)"],
        style: null,
        blocks: ["cards-overlay"],
        defaultContent: [".sticky-content .lp-aca-heading h2", ".sticky-content .lp-aca-heading a"]
      },
      {
        id: "section-3",
        name: "Program Types",
        selector: ".supergrid:nth-of-type(2)",
        style: null,
        blocks: ["cards-highlight"],
        defaultContent: [".academyTitle .lp-aca-heading h2"]
      },
      {
        id: "section-4",
        name: "Impact Programs Carousel",
        selector: ".supergrid:nth-of-type(3)",
        style: "light-blue",
        blocks: ["carousel-programs"],
        defaultContent: [".academyTitle .lp-aca-heading h2", ".academyTitle .lp-aca-heading p"]
      },
      {
        id: "section-5",
        name: "Program Finder",
        selector: "section.lp-find-program#two-center",
        style: null,
        blocks: ["program-finder"],
        defaultContent: []
      },
      {
        id: "section-6",
        name: "Programs by Topic",
        selector: ".supergrid:nth-of-type(5)",
        style: "light-blue",
        blocks: ["tabs-programs"],
        defaultContent: [".academyTitle .lp-aca-heading h2", ".academyTitle .lp-aca-heading p"]
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
