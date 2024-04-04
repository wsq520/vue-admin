import myRequest from "./index";

export function loginAdmin() {
  return myRequest.get({
    url: "/studentlist",
  });
}

export function getAdminGonggaoList(title) {
  return myRequest.get({
    url: "/admin/gonggao/list",
    params: {
      title,
    },
  });
}

export function createAdminGonggao(createParams) {
  const { title, content, picture_url, publishtime } = createParams;
  return myRequest.post({
    url: "/admin/gonggao/create",
    data: {
      title,
      content,
      picture_url,
      publishtime,
    },
  });
}

export function getAdminGonggaoInfoById(id) {
  return myRequest.get({
    url: "/admin/gonggao/info",
    params: {
      id,
    },
  });
}

export function deleteAdminGonggaoById(id) {
  return myRequest.get({
    url: "/admin/gonggao/delete",
    params: {
      id,
    },
  });
}

export function updateAdminGonggao(updateParams) {
  const { id, title, content, picture_url, publishtime } = updateParams;
  return myRequest.post({
    url: "/admin/gonggao/update",
    data: {
      id,
      title,
      content,
      picture_url,
      publishtime,
    },
  });
}
