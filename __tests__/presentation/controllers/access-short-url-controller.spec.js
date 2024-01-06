import AccessShortUrlController from '@/presentation/controllers/access-short-url-controller.js';
import { badRequest } from '@/presentation/helpers/http';
import MissingParamError from '@/presentation/errors/missing-param-error';

describe('AccessShortUrlController', () => {
  it('Should return badRequest if shortCode is not provided', async () => {
    const sut = new AccessShortUrlController();
    const output = await sut.handle({});
    expect(output).toEqual(badRequest(new MissingParamError('shortCode')));
  });
});
