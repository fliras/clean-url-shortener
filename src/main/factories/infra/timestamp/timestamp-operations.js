import TimestampOperations from '../../../../infra/timestamp/timestamp-operations.js';

const makeTimestampOperations = () => {
  const timestampOperations = new TimestampOperations();
  return timestampOperations;
};

export default makeTimestampOperations;
