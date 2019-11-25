import { SELECT_ITEM, INITIAL_ITEM } from '../constants'

export const selectItem = (state = INITIAL_ITEM, action) => {
    switch (action.type) {
        case SELECT_ITEM:
            return action.item
        default:
            return state
    }
}
