import { getTrip } from '../src/client/js/local-storage'
describe("Testing if defined", () => {
  test("Testing existence of getTrip function", () => {
    expect(getTrip).toBeDefined();

  })
});
describe("Testing if invalid", () => {
  test("Testing urlChecker() function", () => {
    expect(getTrip()).toBeFalsy();
  })
});

