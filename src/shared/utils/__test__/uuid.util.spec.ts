import { getRandomNumber, getRandomString } from '../uuid.util';

describe('UuId', () => {
  describe('getRandomNumber', () => {
    it('generates a random number with the given length', () => {
      const length = 5;
      const randomNumber = getRandomNumber(length);

      expect(randomNumber).toBeGreaterThanOrEqual(10000);
      expect(randomNumber).toBeLessThanOrEqual(99999);
    });

    it('generates a random number with the given length when called multiple times', () => {
      const length = 5;
      const randomNumber1 = getRandomNumber(length);
      const randomNumber2 = getRandomNumber(length);

      expect(randomNumber1).toBeGreaterThanOrEqual(10000);
      expect(randomNumber1).toBeLessThanOrEqual(99999);
      expect(randomNumber2).toBeGreaterThanOrEqual(10000);
      expect(randomNumber2).toBeLessThanOrEqual(99999);
      expect(randomNumber1).not.toEqual(randomNumber2);
    });

    it('generates a random number with the given length for different input lengths', () => {
      const length1 = 6;
      const randomNumber1 = getRandomNumber(length1);
      expect(randomNumber1).toBeGreaterThanOrEqual(100000);
      expect(randomNumber1).toBeLessThanOrEqual(999999);

      const length2 = 8;
      const randomNumber2 = getRandomNumber(length2);
      expect(randomNumber2).toBeGreaterThanOrEqual(10000000);
      expect(randomNumber2).toBeLessThanOrEqual(99999999);
    });
  });
  describe('getRandomString', () => {
    it('generates a random string with the given length', () => {
      const length = 10;
      const randomString = getRandomString(length);

      expect(randomString.length).toEqual(length);
      expect(randomString).toMatch(/^[1234567890abcdef_xyaw]{10}$/);
    });

    it('generates a random string with the given length when called multiple times', () => {
      const length = 10;
      const randomString1 = getRandomString(length);
      const randomString2 = getRandomString(length);

      expect(randomString1.length).toEqual(length);
      expect(randomString2.length).toEqual(length);
      expect(randomString1).toMatch(/^[1234567890abcdef_xyaw]{10}$/);
      expect(randomString2).toMatch(/^[1234567890abcdef_xyaw]{10}$/);
      expect(randomString1).not.toEqual(randomString2);
    });
  });
});
