import request from "@/utils/request.js";

export function hello() {
  return request({
    url: "api/hello",
    method: "get",
  });
}

export function login(data) {
  return request({  
    url: "api/login",
    method: "post",
    data
  });
}

export function addList(data) {
  return request({
    url: "api/tasks",
    method: "post",
    data,
  });
}
export function getList() {
  return request({
    url: "api/tasks",
    method: "get",
  });
}

export function getListPage(page,per_page) {
  return request({
    url: `api/tasksPage?page=${page}&per_page=${per_page}`,
    method: "get",
  });
}
export function deleteList(id) {
  return request({
    url: "api/tasks/" + id,
    method: "delete",
  });
}

export function updateList(id, data) {
  return request({
    url: "api/tasks/" + id,
    method: "put",
    data,
  });
}

//token获取
// export function login() {
//   return request({
//     url: "FreeIeAPI/Login",
//     method: "get",
//   });
// }

// export function writeStacking(data) {
//   return request({
//     url: `FreeIeAPI/WriteStacking`,
//     method: "post",
//     data,
//   });
// }

// export function editUser(n) {
//   return request({
//     url: "/api/user",
//     method: "put",
//     data: n,
//   });
// }

// export function removerUser(n) {
//   return request({
//     url: "/system/user/" + n,
//     method: "DELETE",
//   });
// }
