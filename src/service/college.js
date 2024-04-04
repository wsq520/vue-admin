import myRequest from "./index";

// export function getCollegeList() {
//   return myRequest.get({
//     url: "/college/list"
//   });
// }

// export function getCollegeInfoById(id) {
//   return myRequest.get({
//     url: "/college/info",
//     params: {
//       id
//     }
//   })
// }

// export function deleteCollegeById(id) {
//   return myRequest.get({
//     url: "/college/delete",
//     params: {
//       id
//     }
//   })
// }

// export function createCollege(createParams) {
//   const { college } = createParams;
//   return myRequest.post({
//     url: '/college/create',
//     data: {
//       college
//     }
//   })
// }

// export function uodateCollege(updateParams) {
//   const { id, college } = updateParams;
//   return myRequest.post({
//     url: "/college/update",
//     data: {
//       id,
//       college,
//     },
//   });
// }

export function fuzzyQueryCollegeList(grade_name, college_name) {
  return myRequest.get({
    url: "/tcollege/fuzzy/list",
    params: {
      grade_name,
      college_name,
    },
  });
}

export function createCollege(createParam) {
  const { college_name, grade_id} = createParam;
  return myRequest.post({
    url: "/tcollege/create",
    data: {
      college_name,
      grade_id,
    },
  });
}

export function deleteCollege(college_id) {
  return myRequest.post({
    url: "/tcollege/delete",
    data: {
      college_id,
    },
  });
}

export function updateCollege(params) {
  const { college_id, college_name } = params;
  return myRequest.post({
    url: '/tcollege/update',
    data: {
      college_id,
      college_name
    }
  })
}
