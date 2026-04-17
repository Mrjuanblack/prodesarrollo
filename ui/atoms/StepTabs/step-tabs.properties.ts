export interface StepTab {
  id: string;
  label: string;
  icon: React.ElementType;
}

export interface StepTabsProps {
  tabs: StepTab[];
  defaultActive?: string;
  active?: string;
  disabledIds?: string[];
  onChange?: (id: string) => void;
}
