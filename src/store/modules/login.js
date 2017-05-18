import {SAVE_ACCESS_TOKEN,EXIT} from '../mutation-types.js';
const state={
  accessToken:localStorage.getItem('accessToken')
}
 const actions= {
   login({commit, state}, {uname, pwd}){
     return new Promise((reslove, reject) => {
       axios.post(LOGIN_URL, qs.stringify({ uname, pwd }))
         .then((response) => {
           if (1 == response.data.status) {
             commit(EXIT);
             commit('saveAccessToken', response.data.data.accessToken);
             axios.defaults.headers.common['Access-Token'] = response.data.data.accessToken;
           }
           reslove(response.data);
         })
         .catch((error) => {
           reject(error);
         });
     });
   }
 };

const mutations= {
  [SAVE_ACCESS_TOKEN](state, accessToken) {
    state.accessToken = accessToken;
    localStorage.setItem('accessToken', accessToken);
  },
  [EXIT](state) {
    state.accessToken = '';
    localStorage.removeItem('accessToken');
  }
}

export default {
  state,
  actions,
  mutations
};
