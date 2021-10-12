import { urlValidator } from "../src/client/js/urlChecker";
describe("Testing if valid url", () => {
  test("Testing urlChecker() function", () => {
    expect(urlValidator).toBeDefined();
  })
});
