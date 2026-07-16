/**
 * Resolves a public asset path relative to Vite's BASE_URL.
 * Required for GitHub Pages deployment where base = '/Portfolio/'.
 *
 * Usage: asset('/profile/tamur.png') → '/Portfolio/profile/tamur.png'
 */
export const asset = (path) => {
    if (!path) return '';
    const base = import.meta.env.BASE_URL; // e.g. '/Portfolio/'
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${base}${cleanPath}`;
};
