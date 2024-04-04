import myRequest from "./index";

export function getEchartsClubType() {
  return myRequest.get({
    url: '/echarts/clubtype'
  })
}

export function getSystemTotal() {
  return myRequest.get({
    url: '/echarts/total'
  })
}
