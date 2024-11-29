import { colors, cardStyles, textStyles } from './styles';
import { getIconPath } from './icons';
import { StatData } from './types';

export function createHeader(): HTMLElement {
  const header = document.createElement('div');
  header.style.textAlign = 'center';
  header.style.marginBottom = '60px';

  const iconContainer = document.createElement('div');
  iconContainer.style.width = '80px';
  iconContainer.style.height = '80px';
  iconContainer.style.borderRadius = '50%';
  iconContainer.style.backgroundColor = colors.milliseconds;
  iconContainer.style.margin = '0 auto 30px';
  iconContainer.style.display = 'flex';
  iconContainer.style.alignItems = 'center';
  iconContainer.style.justifyContent = 'center';
  iconContainer.innerHTML = `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${getIconPath('milliseconds')}</svg>`;

  const title = document.createElement('h1');
  title.textContent = 'Tu Historia en Números';
  Object.assign(title.style, textStyles.title);

  header.appendChild(iconContainer);
  header.appendChild(title);
  return header;
}

export function createStatCard({ key, label, value }: StatData): HTMLElement {
  const card = document.createElement('div');
  Object.assign(card.style, cardStyles);
  card.style.position = 'relative';
  card.style.overflow = 'hidden';

  // Decorative circle
  const circle = document.createElement('div');
  circle.style.position = 'absolute';
  circle.style.top = '-30px';
  circle.style.right = '-30px';
  circle.style.width = '120px';
  circle.style.height = '120px';
  circle.style.borderRadius = '50%';
  circle.style.backgroundColor = colors[key as keyof typeof colors];
  circle.style.opacity = '0.1';

  // Icon container
  const iconContainer = document.createElement('div');
  iconContainer.style.width = '80px';
  iconContainer.style.height = '80px';
  iconContainer.style.borderRadius = '16px';
  iconContainer.style.backgroundColor = colors[key as keyof typeof colors];
  iconContainer.style.margin = '0 auto 30px';
  iconContainer.style.display = 'flex';
  iconContainer.style.alignItems = 'center';
  iconContainer.style.justifyContent = 'center';
  iconContainer.innerHTML = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${getIconPath(key)}</svg>`;

  const statLabel = document.createElement('h3');
  statLabel.textContent = label;
  Object.assign(statLabel.style, textStyles.label);
  statLabel.style.textAlign = 'center';
  statLabel.style.marginBottom = '20px';

  const statValue = document.createElement('p');
  statValue.textContent = value;
  Object.assign(statValue.style, textStyles.value);
  statValue.style.textAlign = 'center';
  statValue.style.WebkitBackgroundClip = 'text';
  statValue.style.WebkitTextFillColor = 'transparent';

  card.appendChild(circle);
  card.appendChild(iconContainer);
  card.appendChild(statLabel);
  card.appendChild(statValue);

  return card;
}

export function createQuote(days: string): HTMLElement {
  const quote = document.createElement('div');
  quote.style.textAlign = 'center';
  quote.style.marginTop = '60px';
  Object.assign(quote.style, textStyles.quote);
  quote.innerHTML = `"Eres el resultado de <span style="color: ${colors.milliseconds}; font-weight: bold">${days}</span> días vividos.<br>¿Qué harás con los próximos?"`;
  return quote;
}