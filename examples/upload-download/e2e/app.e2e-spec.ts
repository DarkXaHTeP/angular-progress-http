import { AphExamplesPage } from './app.po';

describe('upload-download App', () => {
  let page: AphExamplesPage;

  beforeEach(() => {
    page = new AphExamplesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('aph works!');
  });
});
