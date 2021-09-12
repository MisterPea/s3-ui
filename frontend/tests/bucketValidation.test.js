import { validateBucketName } from '../src/components/helpers/validation';

describe('Validate bucket name', () => {
  const testCases = [
    {
      description: 'accepts between no less than three (3) characters',
      name: 'ab',
      expect: 'false',
    },
    {
      description: 'not accept name beginning with a period (.)',
      name: '.abc',
      expect: 'false',
    },
    {
      description: 'not accept name beginning with a dash (-)',
      name: '-abc',
      expect: 'false',
    },
    {
      description: 'not accept name ending with a dash (-)',
      name: 'abc-',
      expect: 'false',
    },
    {
      description: 'not accept name ending with a period (.)',
      name: 'abc.',
      expect: 'false',
    },
    {
      description: 'consist of only lower case letters',
      name: 'Abcd',
      expect: 'false',
    },
    {
      description: 'consist of only lower case letters',
      name: 'abCd',
      expect: 'false',
    },
    {
      description: 'consist of only lower case letters and numbers periods and dashes',
      name: 'abcd-12.13.3.abcdef',
      expect: 'true',
    },
    {
      description: 'consist of no more than 63 lowercase, numbers, periods, and dashes',
      name: 'glzzfc83gzhnipv5ahayj-zrbycg3s.bzv64s-5r4zyrl4wlyvgf1g25fe233gd',
      expect: 'true',
    },
    {
      description: 'consist of at least 3 lowercase, numbers, periods, and dashes',
      name: 'a.b',
      expect: 'true',
    },
    {
      description: 'consist of at least 3 lowercase, numbers, periods, and dashes',
      name: 'a-b',
      expect: 'true',
    },
  ];

  testCases.forEach((test) => {
    it(`Should ${test.description}`, () => {
      const result = validateBucketName(test.name);
      expect(result.toString()).toMatch(test.expect);
    });
  });
});
