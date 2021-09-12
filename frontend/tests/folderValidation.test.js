import { validateFolderName } from '../src/components/helpers/validation';

describe('Validate folder name', () => {
  const testCases = [
    {
      description: 'accepts uppercase letters',
      name: 'ABC',
      expect: 'true',
    },
    {
      description: 'accepts lowercase letters',
      name: 'abc',
      expect: 'true',
    },
    {
      description: 'accepts upper and lowercase letters',
      name: 'AaBbCc',
      expect: 'true',
    },
    {
      description: 'accepts - _ . ! ',
      name: 'ab.c-A_123!-',
      expect: 'true',
    },
    {
      description: 'does not accepts a name with &',
      name: 'abc-A_123!-&',
      expect: 'false',
    },
    {
      description: 'does not accepts a name with *',
      name: 'abc-A_12*-a',
      expect: 'false',
    },
    {
      description: 'does not accepts a name with /',
      name: 'abc/A/12/a',
      expect: 'false',
    },
  ];

  testCases.forEach((test) => {
    it(`Should ${test.description}`, () => {
      const result = validateFolderName(test.name);
      expect(result.toString()).toMatch(test.expect);
    });
  });
});
