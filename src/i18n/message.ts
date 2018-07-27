/* tslint:disable:object-literal-sort-keys */
import { deconstructLanguage } from '../util/languageHelper';
import global from './global/index';
import page from './page/index';

export default {
  zh: { ...deconstructLanguage(global, 'zh', 'global'), ...deconstructLanguage(page, 'zh', 'page') },
  en: { ...deconstructLanguage(global, 'en', 'global'), ...deconstructLanguage(page, 'en', 'page') },
};
