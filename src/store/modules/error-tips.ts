import { ActionTree, GetterTree, MutationTree } from 'vuex';

interface ErrorTips {}

const namespaced = true;

const state: ErrorTips = {};

const getters: GetterTree<ErrorTips, any> = {};

const actions: ActionTree<ErrorTips, any> = {};

const mutations: MutationTree<ErrorTips> = {};

export default {
    state,
    actions,
    getters,
    mutations,
    namespaced
};
