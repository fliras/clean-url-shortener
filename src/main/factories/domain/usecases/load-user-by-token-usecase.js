import LoadUserByTokenUsecase from '../../../../domain/usecases/load-user-by-token-usecase.js';
import makeUsersRepository from '../../infra/database/postgresql/repos/users-repository.js';
import makeJwtAdapter from '../../infra/cripto/jwt-adapter.js';

const makeLoadUserByTokenUsecase = () => {
  const loadUserByIdRepository = makeUsersRepository();
  const decrypter = makeJwtAdapter();
  return new LoadUserByTokenUsecase({
    decrypter,
    loadUserByIdRepository,
  });
};

export default makeLoadUserByTokenUsecase;
