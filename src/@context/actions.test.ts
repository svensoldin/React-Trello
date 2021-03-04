import * as Actions from './actions';
import axios from '@api/config';

jest.mock('@api/config');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('testing loginUser function', () => {
  const dispatch = jest.fn();
  const fakeUser = {
    email: 'john@gmail.com',
    password: 'secret',
  };
  it('should return the authenticated user', () => {
    mockedAxios.post.mockResolvedValueOnce({
      status: 200,
      data: {
        user: { name: 'john', email: 'john@gmail.com', id: 'random123' },
      },
    });
    return Actions.loginUser(dispatch, fakeUser).then((res) => {
      expect(res).toEqual({
        name: 'john',
        email: 'john@gmail.com',
        id: 'random123',
      });
    });
  });
});
