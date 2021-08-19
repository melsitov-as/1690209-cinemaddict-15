import Abstract from './abstract.js';

const createFooterStatisticsMessage = () => '<p>0 movies inside</p>';

export default class FooterStatisticsMessage extends Abstract {
  getTemplate() {
    return createFooterStatisticsMessage();
  }
}
