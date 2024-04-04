import myRequest from "./index";

export function getZhaoxinList(club_name, club_type, status, title) {
  return myRequest.get({
    url: "/zhaoxin/list",
    params: {
      club_name,
      club_type,
      status,
      title,
    },
  });
}

export function getZhaoxinInfoById(id) {
  return myRequest.get({
    url: "/zhaoxin/info",
    params: {
      id,
    },
  });
}

export function getClubZhaoxinListByClubId(id) {
  return myRequest.get({
    url: "/zhaoxin/clubzhaoxinInfo",
    params: {
      club_id: id,
    },
  });
}

export function createZhaoxin(createParams) {
  const { club_id, content, picture_url, starttime, endtime } = createParams;
  return myRequest.post({
    url: "/zhaoxin/create",
    data: {
      club_id,
      content,
      picture_url,
      starttime,
      endtime,
    },
  });
}

// 管理员审核或部门自主修改
export function updateZhaoxin(updateParams) {
  const {
    id,
    club_id,
    title,
    content,
    picture_url,
    status,
    starttime,
    endtime,
  } = updateParams;
  return myRequest.post({
    url: "/zhaoxin/update",
    data: {
      id,
      club_id,
      title,
      content,
      picture_url,
      status,
      starttime,
      endtime,
    },
  });
}

export function deleteZhaoxin(id) {
  return myRequest.get({
    url: "/zhaoxin/delete",
    params: {
      id,
    },
  });
}
