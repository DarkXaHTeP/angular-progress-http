import { CustomHttpPage } from './app.po';

describe('custom-http App', () => {
  let page: CustomHttpPage;

  beforeEach(() => {
    page = new CustomHttpPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
