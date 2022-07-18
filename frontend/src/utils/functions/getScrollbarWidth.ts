export const getScrollbarWidth = () => {
  // Create the div
  const scrollDiv = document.createElement('div');
  scrollDiv.className = 'scrollbar-measure';
  document.body.appendChild(scrollDiv);
  // Get the scrollbar width
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  // Delete the div
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
};
