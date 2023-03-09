export interface Action {
  id?: string;
  label?: string;
  icon?: string;
  children?: Action[],
  click?: () => void;
}
