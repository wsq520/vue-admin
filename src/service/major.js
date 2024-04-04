import myRequest from "./index";

export function getMajorList() {
  return myRequest.get({
    url: "/major/list"
  });
}

export function getMajorInfoById(id) {
  return myRequest.get({
    url: "/major/info",
    params: {
      id
    }
  })
}

export function deleteMajorById(id) {
  return myRequest.get({
    url: "/major/delete",
    params: {
      id
    }
  })
}

export function createMajor(createParams) {
  const { major } = createParams;
  return myRequest.post({
    url: '/major/create',
    data: {
      major
    }
  })
}

export function uodateMajor(updateParams) {
  const { id, major } = updateParams;
  return myRequest.post({
    url: "/major/update",
    data: {
      id,
      major,
    },
  });
}
