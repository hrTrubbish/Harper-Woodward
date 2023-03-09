const initialState = {
  status: 'checking',
  currEmail: '',
  userId: null,
  userName: '',
};

export const getSession = () => {
  const data = window.localStorage.getItem('session');
  if (data !== 'undefined') {
    return JSON.parse(data);
  }
  return initialState;
};

export const setSession = (session) => {
  window.localStorage.setItem(
    'session',
    JSON.stringify(session),
  );
};
