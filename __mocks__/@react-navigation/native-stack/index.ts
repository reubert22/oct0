const mockedNavigate = jest.fn();
export default jest.mock('@react-navigation/native-stack', () => {
  const actualNav = jest.requireActual('@react-navigation/native-stack');

  return {
    ...actualNav,
  };
});
