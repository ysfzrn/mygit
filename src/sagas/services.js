import axios from "axios";
import { SIGNUP_URL, LOGIN_URL, IMAGEUPLOAD_URL } from "../util/api";

export function signup(app, email, password, name, surname) {
  return axios.post(SIGNUP_URL, { email, password, name, surname });
}

/**
 * LOGIN
 */
export function login(app, email, password) {
  return axios.post(LOGIN_URL, { email, password });
}

export function logout(app) {
  return app.logout();
}

export function updateUser(app, file, token, _id) {
  var config = {
    headers: { Authorization: token }
  };

  const image = file.id;
  return axios.post(IMAGEUPLOAD_URL, { _id, image }, config);
}

export function uploadfile(app, file) {
  const uploads = app.service("uploads");
  return uploads.create({ uri: file }).then((data, err) => data);
  //.catch((err)=>err);
}

export function createPost(app, user_id, posttype) {
  const postitems = app.service("postitems");
  return postitems.create({ user_id, posttype }).then((data, err) => data);
}

export function createcomment(app, user_id, relatedid, text) {
  const comments = app.service("comments");
  return comments
    .create({ user_id, relatedid, text })
    .then((data, err) => data);
}

export function createissue(app, title, text, status, postid, category) {
  const issues = app.service("issues");
  return issues
    .create({ postid, title, text, status, category })
    .then((data, err) => data);
  //.catch((err)=>err);
}

export function createtask(app, title, text, user_id, status) {
  const tasks = app.service("tasks");
  return tasks
    .create({ title, text, user_id, status })
    .then((data, err) => data);
}

export function fetchIssues(app, offset, filter, status, token) {
  const issues = app.service("issues");

  return issues
    .find({
      query: {
        $or: [
          { title: { $regex: `.*${filter}.*` } },
          { text: { $regex: `.*${filter}.*` } }
        ],
        category: status === "warning"
          ? "A"
          : status === "all" ? { $in: ["I", "A"] } : "I",
        status: status === "open"
          ? true
          : status === "close" ? false : { $in: [true, false] },
        $skip: offset,
        $sort: { updatedAt: -1 }
      }
    })
    .then((data, err) => data);
}

export function getselectedissue(app, issue_id) {
  const issues = app.service("issues");
  return issues
    .find({
      query: {
        _id: issue_id
      }
    })
    .then((data, err) => data.data);
}

export function getSumIssues(app) {
  const issues = app.service("issues");

  return issues
    .find({
      query: {
        status: true
      }
    })
    .then((data, err) => data.total);
}

export function getCountIssueItems(app, category, status) {
  const issues = app.service("issues");

  return issues
    .find({
      query: {
        category: category === null ? { $in: ['I', 'A'] } : category,
        status: category === "I" ? status : { $in: [true, false] }
      }
    })
    .then((data, err) => data.total);
}

export function getusers(app) {
  const users = app.service("users");
  return users.find().then((data, err) => data.data);
}

export function gettasks(app) {
  const tasks = app.service("tasks");
  return tasks.find().then((data, err) => data);
}

export function updatetask(app, _id, status) {
  const tasks = app.service("tasks");
  return tasks.patch(_id, { status: status });
}
