export const detectDeviceType = (): "Mobile" | "Desktop" => {
  const userAgent: string =
    navigator.userAgent || navigator.vendor || (window as any).opera;

  if (/android/i.test(userAgent)) {
    return "Mobile";
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
    return "Mobile";
  }

  if (/windows phone/i.test(userAgent)) {
    return "Mobile";
  }

  if (/Macintosh|Windows|Linux/.test(userAgent)) {
    return "Desktop";
  }

  return "Desktop";
};
