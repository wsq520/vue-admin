import myRequest from "./index";

export function queryClubGonggaoList(club_name, club_type, title, status) {
  return myRequest.get({
    url: "/util/queryClubGonggaoList",
    params: {
      club_name,
      club_type,
      title,
      status,
    },
  });
}

export function updateClubGonggao(updateParams) {
  console.log("updateClubGonggao:", updateParams);
  const { id, club_id, title, content, picture_url, publishtime, status } =
    updateParams;
  return myRequest.post({
    url: "/club/gonggao/update",
    data: {
      id,
      club_id,
      title,
      content,
      picture_url,
      publishtime,
      status,
    },
  });
}

export function deleteClubGonggao(id) {
  return myRequest.get({
    url: '/club/gonggao/delete',
    params: {
      id
    }
  })
}
