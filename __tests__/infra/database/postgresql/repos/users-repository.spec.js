import db from '@/infra/database/postgresql/knexfile.js';
import UsersRepository from '@/infra/database/postgresql/repos/users-repository';

const makeSut = () => ({
  sut: new UsersRepository(),
});

const mockUser = async () => {
  const [user] = await db('users')
    .insert({
      username: 'user01',
      password: 'hashed-password',
    })
    .returning('*');
  return user;
};

describe('UsersRepository', () => {
  beforeEach(async () => {
    await db('short_urls').del();
    await db('users').del();
  });

  afterAll(async () => {
    await db.destroy();
  });

  describe('loadById()', () => {
    it('Should return an user on success', async () => {
      const { sut } = makeSut();
      const mockedUser = await mockUser();
      const output = await sut.loadById(mockedUser.user_id);
      expect(output).toBeTruthy();
      expect(output).toEqual({
        userId: mockedUser.user_id,
        username: mockedUser.username,
        password: mockedUser.password,
        createdAt: mockedUser.created_at,
      });
    });
  });

  describe('loadByUsername()', () => {
    it('Should return an user on success', async () => {
      const { sut } = makeSut();
      const mockedUser = await mockUser();
      const output = await sut.loadByUsername(mockedUser.username);
      expect(output).toBeTruthy();
      expect(output).toEqual({
        userId: mockedUser.user_id,
        username: mockedUser.username,
        password: mockedUser.password,
        createdAt: mockedUser.created_at,
      });
    });
  });
});
