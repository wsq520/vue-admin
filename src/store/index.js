import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import app from "./modules/app";
import settings from "./modules/settings";
import user from "./modules/user";

import { fuzzyQueryGradeList } from "../service/grade";
// import { getClubTypeList } from "../service/club_type";
// import { getMajorList } from "../service/major";
// import { getCollegeList } from "../service/college";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
  },
  getters,
  state: {
    loading: false,
    grades: [],
    colleges: [],
    majors: [],
    club_types: [],
    genderOptions: [
      { value: "男", label: "男" },
      { value: "女", label: "女" },
    ],
    club_typeOptions: [],
    collegeOptions: [],
    majorOptions: [],
    gradeOptions: [],
    statusOptions: [
      { value: 1, label: "通过" },
      { value: 0, label: "拒绝" },
      { value: 2, label: "待审核" },
    ],
  },
  mutations: {
    setGrades(state, grades) {
      state.grades = grades;
      state.gradeOptions = grades.map((item) => ({
        value: item.grade_name,
        key: item.grade_name,
      }));
    },
    setColleges(state, colleges) {
      state.colleges = colleges;
      state.collegeOptions = colleges.map((item) => ({
        value: item.college,
        key: item.college,
      }));
    },
    setMajors(state, majors) {
      state.majors = majors;
      state.majorOptions = majors.map((item) => ({
        value: item.major,
        key: item.major,
      }));
    },
    setClubTypes(state, clubTypes) {
      state.club_types = clubTypes;
      state.club_typeOptions = clubTypes.map((item) => ({
        value: item.club_type,
        label: item.club_type,
      }));
    },
  },
  actions: {
    async fetchGrades({ commit }) {
      const res = await fuzzyQueryGradeList();
      console.log("vuex-grades:", res);
      commit("setGrades", res.data);
    },
    // async fetchColleges({ commit, state }) {
    //   const res = await getCollegeList();
    //   // console.log(res);
    //   commit("setColleges", res.data);
    // },
    // async fetchMajors({ commit, state }) {
    //   const res = await getMajorList();
    //   // console.log(res, "major");
    //   commit("setMajors", res.data);
    // },
    // async fetchClubTypes({ commit }) {
    //   const res = await getClubTypeList();
    //   // console.log(res);
    //   commit("setClubTypes", res.data);
    // },
  },
});

export default store;
