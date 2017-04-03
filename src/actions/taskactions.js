export function taskSave(title,text, user_id,status) {
  return {
    type: 'TASKSAVE_REQUESTED',
    title, 
    text, 
    user_id,
    status
  }
}

export function taskUpdateStatus(id, status ) {
  return {
    type: 'TASKUPDATE_REQUESTED',
    id, 
    status
  }
}

export function taskUpdateWithForm(id, status,title,text,user_id ) {
  return {
    type: 'TASKUPDATE_WITHFORM_REQUESTED',
    id, 
    status,
    title,
    text,
    user_id
  }
}

export function taskRemove(id) {
  return {
    type: 'TASKUP_REMOVE_REQUESTED',
    id
  }
}