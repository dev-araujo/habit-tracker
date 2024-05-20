export const checkedStyle = (
  completed: boolean
): { 'background-color': string; color: string } => {
  return {
    'background-color': completed ? '#000' : '#fff',
    color: completed ? '#fff' : '#000',
  };
};
