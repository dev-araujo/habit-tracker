export const checkedStyle = (
  completed: boolean,
  blocked: boolean
): { 'background-color': string; color: string } => {
  if (blocked) {
    return {
      'background-color': '#a9a9a92d',
      color: '#000',
    };
  }

  return {
    'background-color': completed ? '#000' : '#fff',
    color: completed ? '#fff' : '#000',
  };
};
