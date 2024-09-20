import { djs } from "../config/utils";

const url = window.location.protocol + "//" + window.location.hostname;
const port = window.location.port ? `:${window.location.port}` : "";

export const SiteUrl = `${url}${port}`;

export const targetDate = new Date("2024-08-04T00:00:00");

export const SS = () => {
  const td = djs(targetDate);
  const currentDate = djs();
  return td.isAfter(currentDate, "day") || td.isSame(currentDate, "day");
};
