import ShortUrlsRepository from '../../../../../../infra/database/postgresql/repos/short-urls-repository.js';

const makeShortUrlsRepository = () => {
  const shortUrlsRepository = new ShortUrlsRepository();
  return shortUrlsRepository;
};

export default makeShortUrlsRepository;
