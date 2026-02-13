export default function decorate(block) {
  const rows = [...block.children];
  block.textContent = '';

  // Build finder UI
  const heading = document.createElement('h2');
  heading.textContent = 'Find your program';
  block.append(heading);

  const container = document.createElement('div');
  container.className = 'finder-container';

  // Parse dropdown data from rows
  const dropdowns = [];
  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const label = cells[0].textContent.trim();
      const options = cells[1].textContent.trim().split('\n').map((o) => o.trim()).filter(Boolean);
      dropdowns.push({ label, options });
    }
  });

  dropdowns.forEach((dd, idx) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'finder-dropdown';
    if (idx > 0) wrapper.classList.add('disabled');

    const select = document.createElement('select');
    select.setAttribute('aria-label', dd.label);
    if (idx > 0) select.disabled = true;

    const defaultOpt = document.createElement('option');
    defaultOpt.value = '';
    defaultOpt.textContent = dd.label;
    select.append(defaultOpt);

    dd.options.forEach((opt) => {
      const option = document.createElement('option');
      option.value = opt.toLowerCase().replace(/\s+/g, '-');
      option.textContent = opt;
      select.append(option);
    });

    select.addEventListener('change', () => {
      // Enable next dropdown when a selection is made
      const nextWrapper = wrapper.nextElementSibling;
      if (nextWrapper?.classList.contains('finder-dropdown')) {
        const nextSelect = nextWrapper.querySelector('select');
        if (select.value) {
          nextWrapper.classList.remove('disabled');
          nextSelect.disabled = false;
        } else {
          nextWrapper.classList.add('disabled');
          nextSelect.disabled = true;
        }
      }
    });

    wrapper.append(select);
    container.append(wrapper);
  });

  const goBtn = document.createElement('button');
  goBtn.className = 'finder-go';
  goBtn.textContent = 'Go';
  goBtn.addEventListener('click', () => {
    const topic = container.querySelector('select')?.value;
    if (topic) {
      window.location.href = `https://academy.worldbank.org/en/our-programs/by-sector?topic=${topic}`;
    }
  });
  container.append(goBtn);

  block.append(container);
}
