export default function decorate(block) {
  const rows = [...block.children];
  block.textContent = '';

  // Check for video URL in the first row
  const firstRow = rows[0];
  const videoLink = firstRow?.querySelector('a');
  const videoUrl = videoLink?.href || '';
  const isVideo = videoUrl.endsWith('.mp4') || videoUrl.includes('video');

  if (isVideo) {
    const videoWrapper = document.createElement('div');
    videoWrapper.className = 'hero-video';
    const video = document.createElement('video');
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    const source = document.createElement('source');
    source.src = videoUrl;
    source.type = 'video/mp4';
    video.append(source);
    videoWrapper.append(video);
    block.append(videoWrapper);

    // Content comes from the second row
    const contentRow = rows[1];
    if (contentRow) {
      const content = document.createElement('div');
      content.className = 'hero-content';
      while (contentRow.firstElementChild) {
        const child = contentRow.firstElementChild;
        while (child.firstChild) content.append(child.firstChild);
        child.remove();
      }
      block.append(content);
    }

    // Add scroll indicator
    const scrollDiv = document.createElement('div');
    scrollDiv.className = 'hero-scroll';
    scrollDiv.innerHTML = '<span>Scroll to explore</span><span class="hero-scroll-arrow"></span>';
    scrollDiv.addEventListener('click', () => {
      const nextSection = block.closest('.section')?.nextElementSibling;
      if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
    });
    block.querySelector('.hero-content')?.append(scrollDiv);
  } else {
    // Standard hero with background image
    const content = document.createElement('div');
    content.className = 'hero-content';
    rows.forEach((row) => {
      while (row.firstElementChild) {
        const child = row.firstElementChild;
        if (child.querySelector('picture')) {
          child.className = 'hero-bg';
          block.prepend(child);
        } else {
          while (child.firstChild) content.append(child.firstChild);
          child.remove();
        }
      }
    });
    block.append(content);
  }
}
