import Vue from 'vue';
import Vuex, { Store } from 'vuex';

Vue.use(Vuex);

import _commonStore from './modules/_common-store';
import errorTipsStore from './modules/error-tips';
import verifyPassStore from './modules/verify-pass';
import homePageStore from './modules/home-page';

export default new Vuex.Store({
    modules: {
        Common: _commonStore,
        ErrorTips: errorTipsStore,
        VerifyPass: verifyPassStore,
        HomePage: homePageStore
    }
});
