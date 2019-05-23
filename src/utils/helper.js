export function getRootUrl () {
  let pathname = window.location.pathname;
  if (pathname === '/') {
    pathname = '';
  }
  return `${window.location.origin + pathname}`;
}
