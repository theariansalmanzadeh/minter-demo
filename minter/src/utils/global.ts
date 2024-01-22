export const checkIsPhone = () => {
  const toMatch = [
    "Android",
    "webOS",
    "iPhone",
    "iPad",
    "iPod",
    "BlackBerry",
    "Windows Phone",
  ];

  console.log(
    toMatch.find((device) => window.navigator.userAgent.includes(device))
  );

  return toMatch.find((device) =>
    window.navigator.userAgent.includes(device)
  ) !== undefined
    ? true
    : false;
  // return window.navigator.userAgent.toLocaleLowerCase().find((item) => item);
};
