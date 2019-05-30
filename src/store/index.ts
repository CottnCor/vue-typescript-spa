import Vue from 'vue';
import Vuex, { Store } from 'vuex';

Vue.use(Vuex);

import _commonStore from './modules/_common-store';

export default new Vuex.Store({
    modules: {
        Common: _commonStore
    }
});
