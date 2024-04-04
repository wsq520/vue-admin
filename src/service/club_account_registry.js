import myRequest from "./index";

export function loginClubAccount(loginParmas) {
  const { account, password } = loginParmas;
  return myRequest.post({
    url: '/clubaccountregistry/login',
    data: {
      account,
      password
    }
  })
}

export function getClubAccountRegistryList() {
  return myRequest.get({
    url: "/clubaccountregistry/list",
  });
}

export function getClubAccountRegistryInfoById(id) {
  return myRequest.get({
    url: "/clubaccountregistry/info",
    params: {
      id,
    },
  });
}

export function createClubAccountRegistry(createParams) {
  const { student_id, account, password, club_name, club_type } = createParams;
  return myRequest.post({
    url: "/studentlist",
    data: {
      student_id,
      account,
      password,
      club_name,
      club_type,
      status: 0,
    },
  });
}

// 管理员审核或社团社长修改
export function updateClubAccountRegistry(updateParams) {
  const { id, student_id, account, password, club_name, club_type, status } =
    updateParams;
  return myRequest.post({
    url: "/clubaccountregistry/update",
    data: {
      id,
      student_id,
      account,
      password,
      club_name,
      club_type,
      status,
    },
  });
}

export function deleteClubAccountRegistry(id) {
  return myRequest.get({
    url: '/clubaccountregistry/delete',
    params: {
      id
    }
  })
}
