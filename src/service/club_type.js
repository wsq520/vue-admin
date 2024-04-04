import myRequest from "./index";

export function getClubTypeList() {
  return myRequest.get({
    url: "/clubtype/list",
  });
}

export function getClubTypeById(id) {
  return myRequest.get({
    url: "/clubtype/info",
    params: {
      id,
    },
  });
}

export function createClubType(createParams) {
  const { club_type } = createParams;
  return myRequest.post({
    url: "/clubtype/create",
    data: {
      club_type,
    },
  });
}

export function deleteClubType(id) {
  return myRequest.get({
    url: "/clubtype/delete",
    params: {
      id,
    },
  });
}

export function uodateClubtype(updateParams) {
  const { id, club_type } = updateParams;
  return myRequest.post({
    url: "/clubtype/create",
    data: {
      id,
      club_type,
    },
  });
}
