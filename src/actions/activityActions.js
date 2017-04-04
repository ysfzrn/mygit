export function activitySave(
  relatedpost_id,
  user_id,
  owner_id,
  posttype,
  body,
  route,
  readed
) {
  return {
    type: "ACTIVITY_SAVE_REQUEST",
    relatedpost_id,
    user_id,
    owner_id,
    posttype,
    body,
    route,
    readed
  };
}

export function removeActivity(id){
  return {
    type:"REMOVE_ACTIVITY_REQUEST",
    id
  }
}
