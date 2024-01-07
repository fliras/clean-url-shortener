import AddUserUsecase from '../../../../domain/usecases/add-user-usecase.js';
import makeUsersRepository from '../../infra/database/postgresql/repos/users-repository.js';
import makeBcryptAdapter from '../../infra/cripto/bcrypt-adapter.js';

const makeAddUserUsecase = () => {
  const usersRepository = makeUsersRepository();
  const hasher = makeBcryptAdapter();
  return new AddUserUsecase({
    checkUserByUsernameRepository: usersRepository,
    hasher,
    addUserRepository: usersRepository,
  });
};

export default makeAddUserUsecase;
