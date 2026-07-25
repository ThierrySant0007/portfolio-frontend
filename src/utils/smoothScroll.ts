/**
 * Custom smooth scroll with configurable duration and easing.
 * Uses requestAnimationFrame for buttery-smooth animation.
 */

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function smoothScrollTo(elementId: string, duration = 900) {
  const target = document.getElementById(elementId);
  if (!target) return;

  const startY = window.scrollY;
  const targetY = target.getBoundingClientRect().top + startY;
  const diff = targetY - startY;
  let startTime: number | null = null;

  function step(timestamp: number) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);

    window.scrollTo(0, startY + diff * easedProgress);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

/**
 * Helper to use as an onClick handler in anchor elements.
 */
export function handleScrollClick(id: string, e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  smoothScrollTo(id);
}
