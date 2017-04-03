export const fetchprofilebyid = (id, token) => ({
  type: "PROFILE_FETCH_REQUESTED",
  id,
  token
});

export const fetchissues = (offset, filter, status, token) => ({
  type: "ISSUE_FETCH_REQUESTED",
  offset,
  filter,
  status,
  token
});

export const fetchissuesfilter = (offset, filter, status, token) => ({
  type: "ISSUE_FETCH_FILTER_REQUESTED",
  offset,
  filter,
  status,
  token
});

export const fetchissuessocket = (offset, filter, status, token) => ({
  type: "ISSUE_FETCH_SOCKET_REQUESTED",
  offset,
  filter,
  status,
  token
});

export const fetchissuesmore = (offset, filter, status, token) => ({
  type: "ISSUE_FETCH_MORE_REQUESTED",
  offset,
  filter,
  status,
  token
});

export const fetchselectedissue = issue_id => ({
  type: "ISSUE_SELECTED_FETCH_REQUESTED",
  issue_id
});

export const fetchComments = relatedid => ({
  type: "COMMENTS_FETCH_REQUESTED",
  relatedid
});

export const fetchUsers = () => ({
  type: "USERS_FETCH_REQUESTED"
});

export const fetchTasks = () => ({
  type: "TASKS_FETCH_REQUESTED"
});

export const getsumissues = () => ({
  type: "GET_SUM_ISSUES"
});

export const getcountissues = () => ({
  type: "GET_COUNT_ISSUE_ITEMS"
});


export function commentsReset(){
  return {
    type:'COMMENTS_RESET'
  }
}
