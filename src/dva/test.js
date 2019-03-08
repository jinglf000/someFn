function Search(ajblid) {
  return $.get('/wsgl/getWssj', {
    params: {
      id: ajblid
    }
  }).then(res => {
    var result = res.returnData;
    if (result.executeResult == '1') {
      return result.sj;
    }
  });
}
