import UsersRepository from '../../../../../../infra/database/postgresql/repos/users-repository.js';

const makeUsersRepository = () => {
  const usersRepository = new UsersRepository();
  return usersRepository;
};

export default makeUsersRepository;
