import data from './navData.json';

export interface navLinkItem {
  text: string;
  link: string;
  icon?: string;
  newTab?: boolean; // adds target="_blank" rel="noopener noreferrer" to link
}

export interface navDropdownItem {
  text: string;
  dropdown: navLinkItem[];
}

export type navItem = navLinkItem | navDropdownItem;

// note: 1 level of dropdown is supported
const navConfig: { nav: navItem[] } = data;

export default navConfig;
