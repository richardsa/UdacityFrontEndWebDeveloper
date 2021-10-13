import { urlValidator } from "../src/client/js/urlChecker";
describe("Testing if defined", () => {
  test("Testing urlChecker() function", () => {
    expect(urlValidator).toBeDefined();

  })
});
describe("Testing if invalid", () => {
  test("Testing urlChecker() function", () => {
    expect(urlValidator('test.com')).toBeFalsy();
  })
});

describe("Testing if valid", () => {
  test("Testing urlChecker() function", () => {
    expect(urlValidator('https://test.com')).toBeTruthy();
  })
});
