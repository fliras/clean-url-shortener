import AddUserController from '../../../../presentation/controllers/add-user-controller.js';
import makeAddUserUsecase from '../../domain/usecases/add-user-usecase.js';

const makeAddUserController = () => {
  return new AddUserController({
    addUserUsecase: makeAddUserUsecase(),
  });
};

export default makeAddUserController;
