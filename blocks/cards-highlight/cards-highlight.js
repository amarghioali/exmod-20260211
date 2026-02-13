import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  const rows = [...block.children];

  rows.forEach((row, idx) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    // First card is featured (large)
    if (idx === 0) li.classList.add('card-featured');
    else li.classList.add('card-standard');

    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-highlight-image';
      } else {
        div.className = 'cards-highlight-body';
      }
    });

    // Style tags (em elements used as tags)
    li.querySelectorAll('em').forEach((em) => {
      const tag = document.createElement('span');
      tag.className = 'card-tag';
      tag.textContent = em.textContent;
      em.replaceWith(tag);
    });

    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(ul);
}
