import { ActionTree, GetterTree, MutationTree } from 'vuex';

interface CommonStore {
    userid: number;
}

const namespaced = true;

const state: CommonStore = {
    userid: 0
};

const getters: GetterTree<CommonStore, number> = {
    userid: (state: CommonStore) => state.userid
};

const actions: ActionTree<CommonStore, any> = {
    set_userid({ commit }, data: number) {
        commit('update_userid', data);
    }
};

const mutations: MutationTree<CommonStore> = {
    update_userid(state: CommonStore, data: number) {
        state.userid = data;
    }
};

export default {
    state,
    actions,
    getters,
    mutations,
    namespaced
};
