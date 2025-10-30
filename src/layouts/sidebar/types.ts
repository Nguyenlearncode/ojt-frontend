export interface SidebarProps {
  onToggle?: (expanded: boolean) => void;
}

export interface MenuItem {
  name: string;
  icon: any;
  path?: string;
  submenu?: { name: string; path: string }[];
}
