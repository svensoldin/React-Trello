import * as Reducer from './reducer';

describe('testing the reducer and actions', () => {
  it('should return a loading state', () => {
    expect(
      Reducer.AuthReducer(Reducer.initialState, { type: 'Login start' })
    ).toEqual({ ...Reducer.initialState, loading: true });
  });

  it('should return the user details', () => {
    const fakeUser = {
      name: 'john',
      email: 'hello@fake.com',
      id: 'random123',
    };
    expect(
      Reducer.AuthReducer(Reducer.initialState, {
        type: 'Login success',
        payload: fakeUser,
      })
    ).toEqual({
      ...Reducer.initialState,
      userDetails: fakeUser,
      loading: false,
    });
  });

  it('should return an error', () => {
    expect(
      Reducer.AuthReducer(Reducer.initialState, {
        type: 'Login fail',
        payload: 'woops',
      })
    ).toEqual({ ...Reducer.initialState, error: 'woops', loading: false });
  });

  it('logout should empty the state', () => {
    const fakeState = {
      userDetails: { id: 'random123', name: 'john', email: 'john@gmail.com' },
      error: null,
      loading: false,
    };
    expect(Reducer.AuthReducer(fakeState, { type: 'Logout' })).toEqual(
      Reducer.initialState
    );
  });
});
