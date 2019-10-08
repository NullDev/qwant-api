const qwant = require('../lib/qwant-api');

describe('Test qwant-api lib', () => {
  it('search web for nodejs', async () => {
    expect.assertions(1);
    const result = await qwant.search('web', { query: 'nodejs' });
    expect(result).toHaveLength(1);
  });

  it('search images : cat', async () => {
    const result = await qwant.search('images', { query: 'cat' });
    expect(result).toHaveLength(1);
  });

  it('search news : bitcoin', async () => {
    const result = await qwant.search('news', { query: 'bitcoin' });
    expect(result).toHaveLength(1);
  });

  it('search social : bill gates', async () => {
    const result = await qwant.search('social', { query: 'bill gates' });
    expect(result).toHaveLength(1);
  });

  it('search videos : memes', async () => {
    const result = await qwant.search('videos', { query: 'memes' });
    expect(result).toHaveLength(1);
  });

  /*
  it('search social : bill gates', async () => {
    const result = await qwant.search('music', { query: 'varien' });
    expect(result).toBe();
  }); */
});
