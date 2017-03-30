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