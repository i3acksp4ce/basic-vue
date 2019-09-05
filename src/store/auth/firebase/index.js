import firebase from "firebase";
import router from "@/router";

export default {
  state: {
    user: null
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload;
    }
  },

  actions: {
    signIn({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");

      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
          commit("setLoading", false);
          commit("setStatus", "success");
          commit("setUser", response);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setStatus", "fail");
          commit("setError", error);
        });
    },

    signOut({ commit }) {
      commit("setLoading", true);
      commit("clearError");

      firebase
        .auth()
        .signOut()
        .then(() => {
          commit("setUser", null);
          commit("setLoading", false);
          commit("setStatus", "success");

          router.push("/signin");
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setStatus", "fail");
          commit("setError", error);
        });
    },

    autoSignIn({ commit }, payload) {
      commit("setUser", payload);
    },

    signUp({ commit }, payload) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
          commit("setUser", response);
          commit("setStatus", "success");
          commit("setError", null);
        })
        .catch(error => {
          commit("setStatus", "fail");
          commit("setError", error.message);
        });
    }
  },

  getters: {
    user(state) {
      return state.user;
    }
  }
};
