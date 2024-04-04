import myRequest from "./index";

// export function getGradeList() {
//   return myRequest.get({
//     url: "/grade/list"
//   });
// }

// export function getGradeInfoById(id) {
//   return myRequest.get({
//     url: "/grade/info",
//     params: {
//       id
//     }
//   })
// }

// export function deleteGradeById(id) {
//   return myRequest.get({
//     url: "/grade/delete",
//     params: {
//       id
//     }
//   })
// }

// export function createGrade(createParams) {
//   const {grade } = createParams;
//   return myRequest.post({
//     url: '/grade/create',
//     data: {
//       grade
//     }
//   })
// }

// export function uodateGrade(updateParams) {
//   const { id, grade } = updateParams;
//   return myRequest.post({
//     url: "/grade/update",
//     data: {
//       id,
//       grade,
//     },
//   });
// }

export function fuzzyQueryGradeList(grade_name) {
  return myRequest.get({
    url: "/tgrade/fuzzy/list",
    params: {
      grade_name,
    },
  });
}

export function createGrade(createParam) {
  const { grade_name } = createParam;
  return myRequest.post({
    url: "/tgrade/create",
    data: {
      grade_name,
    },
  });
}

export function deleteGrade(grade_id) {
  return myRequest.post({
    url: "/tgrade/delete",
    data: {
      grade_id,
    },
  });
}

export function getGradeIdByGradeName(grade_name) {
  return myRequest.get({
    url: '/tgrade/getIdByName',
    params: {
      grade_name
    }
  })
}
