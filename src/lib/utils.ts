export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function applyTheme(theme: 'dark' | 'light'): void {
  document.body.classList.remove('theme-dark', 'theme-light');
  document.body.classList.add(`theme-${theme}`);
}

export function applyAccentColor(color: string): void {
  document.documentElement.style.setProperty('--accent-primary', color);
  // Compute hover version (lighten slightly)
  const hover = color + 'dd'; // simplified — just make it more opaque
  document.documentElement.style.setProperty('--accent-primary-hover', hover);
}
