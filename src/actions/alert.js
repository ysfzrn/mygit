export const addAlert = (text,status) => ({
    type: 'ADD_ALERT',
    text,
    status
});


export const removeAlert = (id) => ({
    type: 'REMOVE_ALERT',
    id
});

export const hideVideo=()=>({
	type: 'HIDE_VIDEO'
})
