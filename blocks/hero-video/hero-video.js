export default function decorate(block) {
  const rows = [...block.children];
  const mediaRow = rows[0];
  const textRow = rows[1];

  // Check if media row contains a video link (.mp4)
  const link = mediaRow?.querySelector('a');
  if (link && link.href && link.href.endsWith('.mp4')) {
    const video = document.createElement('video');
    video.className = 'hero-video-bg';
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    const source = document.createElement('source');
    source.src = link.href;
    source.type = 'video/mp4';
    video.append(source);

    mediaRow.textContent = '';
    mediaRow.append(video);
  }

  // Move text content into an overlay div
  if (textRow) {
    const overlay = document.createElement('div');
    overlay.className = 'hero-video-overlay';
    overlay.append(...textRow.querySelector('div')?.children || []);
    textRow.textContent = '';
    textRow.append(overlay);
  }
}
