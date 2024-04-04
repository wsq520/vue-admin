import myRequest from './index'

export async function getStudentListApi() {
  const res = await myRequest.get({
    url: '/studentlist'
  })
  return res;
}

export function getStudentInfoByIdApi(id) {
  return myRequest.get({
    url: '/student/info',
    params: {
      student_id: id
    }
  })
}

export function deleteStudentByIdApi(id) {
  return myRequest.get({
    url: '/student/delete',
    params: {
      student_id: id
    }
  })
}

export function createStudentApi(studentInfo) {
  // console.log("新增学生的信息：", studentInfo);
  const { college, grade, major, classname, gender, phone, name, xuehao, password } = studentInfo;
  return myRequest.post({
    url: '/student/create',
    data: {
      college,
      grade,
      major,
      classname,
      gender,
      phone,
      name,
      xuehao,
      password
    }
  })
}

export function updateStudentApi(studentInfo) {
  const { student_id, college, grade, major, classname, gender, phone, name, xuehao, password } = studentInfo;
  return myRequest.post({
    url: '/student/update',
    data: {
      student_id,
      college,
      grade,
      major,
      classname,
      gender,
      phone,
      name,
      xuehao,
      password
    }
  })
}

// 获取某个学生加了哪些部门
export function getStudentClubs(id) {
  return myRequest.get({
    url: '/clubmember/studentClub',
    params: {
      student_id: id
    }
  })
}

export function fuzzyQueryStudentList(fuzzyParams) {
  const { name, major, college, xuehao } = fuzzyParams;
  return myRequest.get({
    url: '/student/fuzzy/query',
    params: {
      name,
      major,
      college,
      xuehao
    }
  })
}

// 案例
// export function x() {
//   return myRequest.get({

//   })
// }
