var defaultState = {
  loading: false,
  issues: [],
  filter: "",
  status: "all",
  offset: 0,
  count: 0,
  sum:0,
  total:0,
  totalopen:0,
  totalclose:0,
  totalannounce:0
};

module.exports = (state = defaultState, action) => {
  switch (action.type) {
    case "ISSUE_FETCH_REQUESTED":
      return {
        ...state,
        loading: true,
        count:0,
        offset: state.offset + 10,
      };
    case "ISSUE_FETCH_DONE":
      return {
        ...state,
        loading: false,
        issues: [...state.issues,...action.issues.data],
        total:action.issues.total
      };
    case "ISSUE_FETCH_FILTER_REQUESTED":
      return{
         ...state,
         loading:true,
         count:0,
         offset:10
      } 
    case "ISSUE_FETCH_FILTER_DONE":
      return{
         ...state,
         loading:false,
         issues:action.issues.data,
      }
    case "ISSUE_FETCH_SOCKET_REQUESTED":
      return{
         ...state,
         count:0,
         offset:10,
         status:"all"
      } 
     case "ISSUE_FETCH_SOCKET_DONE":
      return{
         ...state,
         issues: action.issues.data,
         total:action.issues.total
     } 

     case "ISSUE_FETCH_MORE_REQUESTED":
      return{
         ...state,
         offset:state.offset+10
     } 

     case "ISSUE_FETCH_MORE_DONE":
      return{
         ...state,
         issues: [...state.issues,...action.issues.data],
     } 


   case "ADDING_ISSUE":
      return {
        ...state,
        count: state.count + 1
      };
    case "UPDATEISSUE_SUCCESS":
      return {
        ...state,
        issues: reducer1(state.issues, action)
      };
    case "ISSUE_FILTER":
      return {
        ...state,
        ...action.payload
      };
    case "GET_SUM_ISSUES_DONE":
       return {
         ...state,
        sum:action.sum
       }
    
    case "GET_COUNT_ISSUE_CLOSE_DONE":
       return {
          ...state,
          totalclose:action.closecount
       }
    
    case "GET_COUNT_ISSUE_OPEN_DONE":
       return {
          ...state,
          totalopen:action.opencount
       }

    case "GET_COUNT_ISSUE_ANNOUNCE_DONE":
       return {
          ...state,
          totalannounce:action.announcecount
       }

    default:
      return state;
  }
};


function reducer1(state, action) {
  switch (action.type) {
    case "UPDATEISSUE_SUCCESS":
      return state.map(t => reducer2(t, action));
    default:
      return state;
  }
}

function reducer2(state, action) {
  switch (action.type) {
    case "UPDATEISSUE_SUCCESS":
      if (state._id !== action.id) {
        return state;
      }
      return {
        ...state,
        status: action.status
      };
    default:
      return state;
  }
}
