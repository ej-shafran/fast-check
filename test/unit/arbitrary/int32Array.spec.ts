import { int32Array } from '../../../src/arbitrary/int32Array';

import { convertFromNext, convertToNext } from '../../../src/check/arbitrary/definition/Converters';
import { fakeNextArbitrary } from '../check/arbitrary/generic/NextArbitraryHelpers';

import * as TypedIntArrayArbitraryArbitraryBuilderMock from '../../../src/arbitrary/_internals/builders/TypedIntArrayArbitraryBuilder';

describe('int32Array', () => {
  it('should call typedIntArrayArbitraryArbitraryBuilder for Int32Array', () => {
    // Arrange
    const instance = fakeNextArbitrary();
    const builder = jest.spyOn(TypedIntArrayArbitraryArbitraryBuilderMock, 'typedIntArrayArbitraryArbitraryBuilder');
    builder.mockImplementation(() => convertFromNext(instance));

    // Act
    const arb = int32Array();

    // Assert
    expect(convertToNext(arb)).toBe(instance);
    expect(builder).toHaveBeenCalledWith(
      expect.anything(),
      expect.any(Number),
      expect.any(Number),
      Int32Array,
      expect.anything()
    );
  });

  it('should call typedIntArrayArbitraryArbitraryBuilder with extreme values for min and max', () => {
    // Arrange
    const instance = fakeNextArbitrary();
    const builder = jest.spyOn(TypedIntArrayArbitraryArbitraryBuilderMock, 'typedIntArrayArbitraryArbitraryBuilder');
    builder.mockImplementation(() => convertFromNext(instance));

    // Act
    int32Array();
    const params = builder.mock.calls[0];
    const min = params[1] as number;
    const max = params[2] as number;
    const Class = params[3] as typeof Int32Array;

    // Assert
    expect(Class.from([min])[0]).toBe(min);
    expect(Class.from([max])[0]).toBe(max);
    expect(Class.from([min - 1])[0]).not.toBe(min - 1);
    expect(Class.from([max + 1])[0]).not.toBe(max + 1);
  });
});
