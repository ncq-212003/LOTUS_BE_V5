const initialStateCar = {
    cars: []
}

const HANDLERS_CAR = {
    ADD_CAR: "ADD_CAR",
    LIST_CAR: "LIST_CAR",
    DELETE_CAR: "DELETE_CAR",
    FIND_CAR_BYID: "FIND_CAR_BYID",
    UPDATE_CAR: "UPDATE_CAR"
}

const handlersCar = {
    // addCar
    [HANDLERS_CAR.ADD_CAR]: (state, action) => {
        const car = action.payload;

        return {
            ...state,
            cars: [...state, car]
        }
    },

    // listCar
    [HANDLERS_CAR.LIST_CAR]: (state, action) => {
        const car = action.payload;

        return {
            ...state,
            cars: car
        }
    },

    //delete 
    [HANDLERS_CAR.DELETE_CAR]: (state, action) => {
        return {
            cars: [] // đoạn này muốn xóa thì mình sẽ xét theo id
        }
    },

    // update
    [HANDLERS_CAR.UPDATE_CAR]: (state, action) => {
        return state;
    },

    // find by id
    [HANDLERS_CAR.FIND_CAR_BYID]: (state, action) => {
        const car = action.payload;

        return car;
    },
}

const reducerCar = (state, action) =>
    handlersCar[action.type] ? handlersCar[action.type](state, action) : state;

export { initialStateCar, reducerCar, HANDLERS_CAR };