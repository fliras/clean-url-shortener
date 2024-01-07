import db from '@/infra/database/postgresql/db.js';
import UsersRepository from '@/infra/database/postgresql/repos/users-repository';

const makeSut = () => ({
  sut: new UsersRepository(),
});

const mockAddParams = () => ({
  username: 'user01',
  password: 'hashed-password',
});

const mockUser = async () => {
  const [user] = await db('users').insert(mockAddParams()).returning('*');
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

  describe('checkByUsername()', () => {
    it('Should return true if the user exists', async () => {
      const { sut } = makeSut();
      const mockedUser = await mockUser();
      const output = await sut.checkByUsername(mockedUser.username);
      expect(output).toBe(true);
    });

    it("Should return false if the user doesn't exist", async () => {
      const { sut } = makeSut();
      const output = await sut.checkByUsername('any-username');
      expect(output).toBe(false);
    });
  });

  describe('add()', () => {
    it('Should return an user on success', async () => {
      const { sut } = makeSut();
      const params = mockAddParams();
      const output = await sut.add(params);
      expect(output).toBeTruthy();
      expect(output.userId).toBeTruthy();
      expect(output).toMatchObject({
        username: params.username,
        password: params.password,
      });
    });
  });
});
