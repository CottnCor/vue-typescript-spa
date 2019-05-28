import { ActionTree, GetterTree, MutationTree } from 'vuex';

interface CommonStore {
    userId: number;
    appkey: string;
    status: number;
}

const namespaced = true;

const state: CommonStore = {
    userId: -1,
    appkey: '',
    status: -1 // -1：无权限，0：绘制，1：加载，2：展示
};

const getters: GetterTree<CommonStore, any> = {
    userId: (state: CommonStore) => state.userId,
    appkey: (state: CommonStore) => state.appkey,
    status: (state: CommonStore) => state.status
};

const actions: ActionTree<CommonStore, any> = {
    set_userId({ commit }, data: number) {
        commit('update_userId', data);
    },
    set_appkey({ commit }, data: string) {
        commit('update_appkey', data);
    },
    set_status({ commit }, data: number) {
        commit('update_status', data);
    }
};

const mutations: MutationTree<CommonStore> = {
    update_userId(state: CommonStore, data: number) {
        state.userId = data;
    },
    update_appkey(state: CommonStore, data: string) {
        state.appkey = data;
    },
    update_status(state: CommonStore, data: number) {
        state.status = data;
    }
};

export default {
    state,
    actions,
    getters,
    mutations,
    namespaced
};
