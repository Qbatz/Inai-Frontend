import { takeEvery, call, put } from "redux-saga/effects";
import {
    ERROR_CODE,
    GET_PRODUCT_REDUCER,
    GET_PRODUCT_SAGA,
    SUCCESS_CODE,
    ADD_PRODUCT_SAGA,
    DELETE_PRODUCT_SAGA,



} from "../../Utils/Constant";
import { refreshToken } from "../../Token_Access/Token";
import { getProduct, addProduct, DeleteProduct } from "../Action/ProductAction";
import { toast } from 'react-toastify';



export const toastStyle = {
    backgroundColor: "#28C76F",
    color: "#F8F9FA",
    width: "100%",
    borderRadius: "12px",
    height: "40px",
    fontFamily: "Gilroy",
    fontWeight: 600,
    fontSize: "14px",
    textAlign: "start",
    display: "flex",
    alignItems: "center",
    padding: "12px 20px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
};








function* handleGetProduct(action) {
    try {
        const response = yield call(getProduct, action.payload)
        if (response.status === 200) {
            yield put({ type: GET_PRODUCT_REDUCER, payload: { response: response.data.products } });
            yield put({ type: SUCCESS_CODE, payload: { statusCode: response.status, message: response.data.message } });

        }
        else if (response.status === 201) {
            yield put({ type: ERROR_CODE, payload: { message: response.data.message || response.message, statusCode: response.status } })
        }

        if (response) {
            refreshToken(response)
        }
    } catch (error) {
        const errorMessage = error?.response?.data?.detail || error?.response?.data?.message;
        const statusCode = error?.response?.status || error?.status;
        yield put({ type: ERROR_CODE, payload: { message: errorMessage, statusCode } });
    }

}

function* handleAddProduct(action) {
    try {
        const response = yield call(addProduct, action.payload)

        console.log("response for add product", response)

        if (response.status === 200) {
            yield put({ type: SUCCESS_CODE, payload: { statusCode: response.status, message: response.data.message } });
            toast.success(response.data.message || 'Success!', {
                autoClose: 2000,
                icon: false,
                hideProgressBar: true,
                closeButton: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: toastStyle

            });
        }
        else if (response.status === 201) {
            yield put({ type: ERROR_CODE, payload: { message: response.data.message || response.message, statusCode: response.status } })
        }

        if (response) {
            refreshToken(response)
        }
    } catch (error) {
        const errorMessage = error?.response?.data?.detail || error?.response?.data?.message;
        const statusCode = error?.response?.status || error?.status;
        yield put({ type: ERROR_CODE, payload: { message: errorMessage, statusCode } });
    }

}



function* handleDeleteProduct(action) {
    try {
        const response = yield call(DeleteProduct, action.payload)

        console.log("response for add product", response)

        if (response.status === 200) {
            yield put({ type: SUCCESS_CODE, payload: { statusCode: response.status, message: response.data.message } });
            toast.success(response.data.message || 'Success!', {
                autoClose: 2000,
                icon: false,
                hideProgressBar: true,
                closeButton: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: toastStyle

            });
        }
        else if (response.status === 201) {
            yield put({ type: ERROR_CODE, payload: { message: response.data.message || response.message, statusCode: response.status } })
        }

        if (response) {
            refreshToken(response)
        }
    } catch (error) {
        const errorMessage = error?.response?.data?.detail || error?.response?.data?.message;
        const statusCode = error?.response?.status || error?.status;
        yield put({ type: ERROR_CODE, payload: { message: errorMessage, statusCode } });
    }

}







function* ProductSaga() {
    yield takeEvery(GET_PRODUCT_SAGA, handleGetProduct)
    yield takeEvery(ADD_PRODUCT_SAGA, handleAddProduct)
    yield takeEvery(DELETE_PRODUCT_SAGA, handleDeleteProduct)
}
export default ProductSaga;