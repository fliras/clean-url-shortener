import UniqueCodeGenerator from '../../../../infra/cripto/unique-code-generator.js';

const makeUniqueCodeGenerator = () => {
  const uniqueCodeGenerator = new UniqueCodeGenerator();
  return uniqueCodeGenerator;
};

export default makeUniqueCodeGenerator;
