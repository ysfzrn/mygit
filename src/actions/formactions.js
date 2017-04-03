export const signupFormChange=(field)=> ({
    type: 'SIGNUP_FORM',
    payload: field
});

export const signinFormChange=(field)=> ({
    type: 'SIGNIN_FORM',
    payload: field
});

export const ideaFormChange=(field)=> ({
    type: 'IDEA_FORM',
    payload: field
});

export const issueFormChange=(field)=> ({
    type: 'ISSUE_FORM',
    payload: field
});

export const taskFormChange=(field)=> ({
    type: 'TASK_FORM',
    payload: field
});

export const issueFilterChange=(field)=> ({
    type: 'ISSUE_FILTER',
    payload: field
});

export const commentFormChange=(field)=> ({
    type: 'COMMENT_FORM',
    payload: field
});

export const authFormChange=(field)=> ({
    type: 'AUTH_FORM',
    payload: field
});

export const imageupload=(file,token, _id)=> ({
    type: 'IMAGEUPLOAD',
    file,
    token, 
    _id
});


export const issueimageupload=(file)=> ({
    type: 'ISSUE_IMAGEUPLOAD',
    file
});

export function toPush(location) {
  return {
    type: "TO_PUSH",
    location
  };
}

export function commentSave(user_id,relatedid, text) {
  return {
    type: 'COMMENTSAVE_REQUESTED',
    user_id,
    relatedid, 
    text
  }
}
