async function loadHTML(id, url) {
  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`Failed to load ${url}`);
    document.getElementById(id).innerHTML = await resp.text();
  } catch (e) {
    console.error(e);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadHTML('site-header', 'includes/header.html');
  loadHTML('site-footer', 'includes/footer.html');
});
