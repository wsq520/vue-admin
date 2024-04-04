import myRequest from "./index";

export function uploadFile(file) {
  console.log("file:", file);
  return myRequest.post({
    url: "/file/upload",
    headers: {
      "Content-Type": `multipart/form-data;`, // 注意这里的 Content-Type
    },
    data: {},
  });
}

export function getSwiperList(desc, isShow) {
  return myRequest.get({
    url: "/file/swiper/list",
    params: {
      desc,
      isShow,
    },
  });
}

export function getSwiperInfo(id) {
  return myRequest.get({
    url: "/file/swiper/info",
    params: {
      id,
    },
  });
}

export function createSwiper(createParams) {
  const { url, desc, isShow } = createParams;
  return myRequest.post({
    url: "/file/swiper/create",
    data: {
      url,
      desc,
      isShow,
    },
  });
}

export function updateSwiper(updateParmas) {
  const { id, url, desc, isShow } = updateParmas;
  return myRequest.post({
    url: "/file/swiper/update",
    data: {
      id,
      url,
      desc,
      isShow,
    },
  });
}

export function deleteSwiper(id) {
  return myRequest.get({
    url: "/file/swiper/delete",
    params: {
      id,
    },
  });
}
