export function issueSave(user_id,posttype, title, text, status,category) {
  return {
    type: 'POSTSAVE_REQUESTED',
    user_id,
    posttype,
    title, 
    text, 
    status,
    category
  }
}

export function issueSaveRequest(title, text, status, postid) {
  return {
    type: 'ISSUESAVE_REQUESTED',
    title, 
    text, 
    status,
    postid
  }
}

export function issueUpdateRequest(id, status ) {
  return {
    type: 'UPDATEISSUE_REQUESTED',
    id, 
    status
  }
}

export function addingIssue(){
  return {
    type:'ADDING_ISSUE'
  }
}