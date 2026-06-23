import { normalize } from '..';

it('normalize', () => {
  const date = new Date(1000);
  const ret = normalize({
    a: 'foo',
    b: 1,
    c: true,
    d: date,
    e: [date],
    f: {
      g: date,
    },
  });
  expect(ret).toEqual({
    a: 'foo',
    b: 1,
    c: true,
    d: 1,
    e: [1],
    f: {
      g: 1,
    },
  });
});
