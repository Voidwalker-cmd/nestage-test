const url = window.location.protocol + "//" + window.location.hostname;
const port = window.location.port ? `:${window.location.port}` : "";

export const SiteUrl = `${url}${port}`;
