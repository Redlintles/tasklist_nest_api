import { UniqueConstraintExceptionFilter } from './unique-constraint-exception-filter';

describe('UniqueConstraintExceptionFilter', () => {
  it('should be defined', () => {
    expect(new UniqueConstraintExceptionFilter()).toBeDefined();
  });
});
