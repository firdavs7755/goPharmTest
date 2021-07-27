import {createSelector, createStructuredSelector} from 'reselect'
//above is simple selector
const userSelector = state => state.users

//above are Reselect functions
export const selectData = createSelector(
    [userSelector],
    users=>users.data
)
export const selectPersonalData = createSelector(
    [userSelector],
    users=>users.personalData
)
export const selectToken = createSelector(
    [userSelector],
    users=>users.token
)
