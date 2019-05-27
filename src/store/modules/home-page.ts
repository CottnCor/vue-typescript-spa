import { ActionTree, GetterTree, MutationTree } from 'vuex';

interface HomePage {}

const namespaced = true;

const state: HomePage = {};

const getters: GetterTree<HomePage, any> = {};

const actions: ActionTree<HomePage, any> = {};

const mutations: MutationTree<HomePage> = {};

export default {
    state,
    actions,
    getters,
    mutations,
    namespaced
};
