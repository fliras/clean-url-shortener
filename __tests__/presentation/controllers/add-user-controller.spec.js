import AddUserController from '@/presentation/controllers/add-user-controller.js';
import { badRequest } from '@/presentation/helpers/http.js';
import MissingParamError from '@/presentation/errors/missing-param-error.js';

const makeSut = () => ({
  sut: new AddUserController(),
});

describe('AddUserController', () => {
  it('Should return badRequest if username is not provided', async () => {
    const { sut } = makeSut();
    const output = await sut.handle({ password: 'any-password' });
    expect(output).toEqual(badRequest(new MissingParamError('username')));
  });
});
