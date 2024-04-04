import myRequest from "./index";

export function getClubMemberListByClubId(id) {
  return myRequest.get({
    url: "/clubmember/memberlist",
    params: {
      club_id: id,
    },
  });
}
