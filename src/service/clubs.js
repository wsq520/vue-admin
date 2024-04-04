import myRequest from "./index";

export function getClubsList() {
  return myRequest.get({
    url: "/clubs/list",
  });
}

export function getClubInfoById(id) {
  return myRequest.get({
    url: "/clubs/info",
    params: {
      club_id: id,
    },
  });
}

export function deleteClubById(id) {
  return myRequest.get({
    url: "/clubs/delete",
    params: {
      club_id: id,
    },
  });
}

export function createClub(createParams) {
  const { club_name, club_type, student_id, introduction, views, avatar } =
    createParams;
  return myRequest.post({
    url: "/clubs/create",
    data: {
      club_name,
      club_type,
      student_id,
      introduction,
      views,
      avatar,
    },
  });
}

export function updateClub(updateParams) {
  const {
    club_id,
    club_name,
    club_type,
    student_id,
    introduction,
    views,
    avatar,
  } = updateParams;
  return myRequest.post({
    url: "/clubs/update",
    data: {
      club_id,
      club_name,
      club_type,
      student_id,
      introduction,
      views,
      avatar,
    },
  });
}

// 公告接口
// 获取某个部门发布的所有公告
export function getClubGonggaoListByClubId(id) {
  return myRequest.get({
    url: "club/gonggao/clubgonggaolist",
    params: {
      club_id: id,
    },
  });
}

export function createClubGonggao(createParams) {
  const {
    club_id,
    content,
    picture_url,
    publishtime,
    // status ,
  } = createParams;
  return myRequest.post({
    url: "/club/gonggao/create",
    data: {
      club_id,
      content,
      picture_url,
      publishtime,
      status: 0,
    },
  });
}

// 管理审核或社团修改公告
export function updateClubGonggao(updateParams) {
  const { id, club_id, content, picture_url, publishtime, status } =
    updateParams;
  return myRequest.post({
    url: "/club/gonggao/update",
    data: {
      id,
      club_id,
      content,
      picture_url,
      publishtime,
      status,
    },
  });
}

export function deleteClubGonggao(id) {
  return myRequest.get({
    url: "/club/gonggao/delete",
    params: {
      id,
    },
  });
}
