import { browser, element, by } from 'protractor';

export class AphExamplesPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('aph-root h1')).getText();
  }
}
