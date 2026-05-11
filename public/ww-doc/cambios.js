function toggleChangelog(header) {
  const item = header.parentElement;
  
  // Close others (optional, behavior depends on preference)
  // document.querySelectorAll('.changelog-item').forEach(el => {
  //   if (el !== item) el.classList.remove('open');
  // });

  item.classList.toggle('open');
}

// Open the first one by default (REMOVED as requested)
document.addEventListener('DOMContentLoaded', () => {
  // const firstItem = document.querySelector('.changelog-item');
  // if (firstItem) firstItem.classList.add('open');
});
