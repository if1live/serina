import { sanitize } from '../index';
describe('sanitize', () => {
  it('id', () => {
    expect(sanitize('1150010123705708544')).toBe('1150010123705708544');
  });

  it('url', () => {
    const cases = [
      [
        'https://twitter.com/digimon215/status/1150010123705708544',
        '1150010123705708544',
      ],
      [
        'https://mobile.twitter.com/jai_contact/status/1150033184773459970',
        '1150033184773459970',
      ],
      [
        'twitter.com/digimon215/status/1150010123705708544',
        '1150010123705708544',
      ],
    ];
    for (const c of cases) {
      expect(sanitize(c[0])).toBe(c[1]);
    }
  });

  it('invalid', () => {
    const cases = [
      '1234a5678',
      'https://twitter.com/digimon215/xxx/12345',
      'https://google.com/foo/status/12345',
    ];
    for(const c of cases) {
      expect(sanitize(c)).toBeUndefined();
    }
  });
});
