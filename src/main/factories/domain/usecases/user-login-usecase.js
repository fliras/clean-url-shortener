import UserLoginUsecase from '../../../../domain/usecases/user-login-usecase.js';
import makeUsersRepository from '../../infra/database/postgresql/repos/users-repository.js';
import makeJwtAdapter from '../../infra/cripto/jwt-adapter.js';
import makeBcryptAdapter from '../../infra/cripto/bcrypt-adapter.js';

const makeUserLoginUsecase = () => {
  const loadUserByUsernameRepository = makeUsersRepository();
  const encrypter = makeJwtAdapter();
  const hashComparer = makeBcryptAdapter();
  return new UserLoginUsecase({
    encrypter,
    hashComparer,
    loadUserByUsernameRepository,
  });
};

export default makeUserLoginUsecase;
