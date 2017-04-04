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

export function updateissue(item){
   return{
     type:'UPDATE_ISSUE_SOCKET',
     item
   }
}

export function addingIssue(){
  return {
    type:'ADDING_ISSUE'
  }
}

export function removeIssue(id, postid){
  return{
    type:'REMOVE_ISSUE',
    id,
    postid
  }
}

export function removeIssueSocket(item){
  return{
    type:'REMOVE_ISSUE_SOCKET',
    item
  }
}



export function selectedIssueReset(){
  return{
    type:'RESET_SELECTED_ISSUE'
  }
}