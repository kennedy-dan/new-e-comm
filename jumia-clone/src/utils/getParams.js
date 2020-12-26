export const getParams = (query) => {
  const querySelect = query.split("?")[1];
  if (querySelect.length > 0) {
    const params = querySelect.split("&");
    const paramsObj = {};
    params.map((param) => {
      const keyValue = param.split("=");

      paramsObj[keyValue[0]] = keyValue[1];
    });

    return paramsObj;
  }
  return {};
};
