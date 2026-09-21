import React, { useEffect } from 'react';

const CustomCursor = () => {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const dot = document.getElementById('cursor-dot');
    const outline = document.getElementById('cursor-outline');
    if (!dot || !outline) return;

    let mouseX = -100;
    let mouseY = -100;
    let outlineX = -100;
    let outlineY = -100;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;
    const updateOutline = () => {
      const dx = mouseX - outlineX;
      const dy = mouseY - outlineY;
      outlineX += dx * 0.15;
      outlineY += dy * 0.15;
      outline.style.left = `${outlineX}px`;
      outline.style.top = `${outlineY}px`;
      animationFrameId = requestAnimationFrame(updateOutline);
    };
    animationFrameId = requestAnimationFrame(updateOutline);

    const bindCursorHover = () => {
      const interactives = document.querySelectorAll(
        'a, button, input, textarea, select, .glass, .nav-btn, .poi-card, [onclick], .dest-card, .glass-card, .btn'
      );
      interactives.forEach(el => {
        if (!el.dataset.cursorBound) {
          el.dataset.cursorBound = 'true';
          el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
          el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        }
      });
    };

    bindCursorHover();
    const interval = setInterval(bindCursorHover, 800);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" className="cursor-dot" />
      <div id="cursor-outline" className="cursor-outline" />
    </>
  );
};

export default CustomCursor;
