import myRequest from "./index";

export function queryClubAndClubMemberList(club_name, club_type) {
  return myRequest.get({
    url: "/util/queryClubAndClubMemberList",
    params: {
      club_name,
      club_type,
    },
  });
}

export function queryClubAndClubMemberByClubId(id) {
  return myRequest.get({
    url: "/util/queryClubAndClubMemberByClubId",
    club_id: id,
  });
}

export function queryClubGonggaoList(club_name, club_type) {
  return myRequest.get({
    url: "/util/queryClubGonggaoList",
    params: {
      club_name,
      club_type,
    },
  });
}

export function queryClubAccountRegistryList(
  club_name,
  club_type,
  xuehao,
  status
) {
  return myRequest.get({
    url: "/util/queryClubAccountRegistryList",
    params: {
      club_name,
      club_type,
      xuehao,
      status,
    },
  });
}

export function deleteClubAccountRegistry(id) {
  return myRequest.get({
    url: "/clubaccountregistry/delete",
    params: {
      id,
    },
  });
}

export function updateClubAccountRegistry(upateParmas) {
  const { id, student_id, club_name, club_type, status } = upateParmas;
  return myRequest.post({
    url: "/clubaccountregistry/update",
    data: {
      id,
      student_id,
      club_name,
      club_type,
      status,
    },
  });
}
