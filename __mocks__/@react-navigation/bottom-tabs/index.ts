const mockedNavigate = jest.fn();
export default jest.mock('@react-navigation/bottom-tabs', () => {
  const actualNav = jest.requireActual('@react-navigation/bottom-tabs');

  return {
    ...actualNav,
    createBottomTabNavigator: jest.fn(),
  };
});
