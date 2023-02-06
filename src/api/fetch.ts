export const useGet = (url: string) => {
  return fetch("https://dummyjson.com/" + url, {
    method: "GET",
    headers: { Authorization: "Bearer fghffg" },
  }).then((res) => res.json());
};

export const usePost = (url: string, data: any) => {
  return fetch("https://dummyjson.com/" + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};
