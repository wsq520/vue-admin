import myRequest from "./index";

export function queryClubHuodongList(club_name, club_type, title, status) {
  return myRequest.get({
    url: "/clubHuodong/list",
    params: {
      club_name,
      club_type,
      title,
      status
    },
  });
}

export function deleteClubHuodong(huodong_id) {
  return myRequest.get({
    url: "/clubHuodong/delete",
    parmas: {
      huodong_id,
    },
  });
}

export function updateClubHuodong(updateParams) {
  const {
    huodong_id,
    title,
    content,
    club_id,
    club_name,
    club_type,
    picture_url,
    status,
    starttime,
    endtime,
  } = updateParams;
  return myRequest.post({
    url: "/clubHuodong/update",
    data: {
      huodong_id,
      title,
      content,
      club_id,
      club_name,
      club_type,
      picture_url,
      status,
      starttime,
      endtime,
    },
  });
}
