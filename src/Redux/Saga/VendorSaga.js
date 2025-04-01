import { takeEvery, call, put } from "redux-saga/effects";
import {ParticularVendor, DeleteVendor, EditVendor, VendorAction, AddBasicInfoVendor, AddAddressInfoVendor, AddBankInfoVendor, AddVendor } from "../Action/VendorAction";
import {VIEW_VENDOR_REDUCER,VIEW_VENDOR_SAGA, DELETE_VENDOR_SAGA,EDIT_VENDOR_SAGA,  CREATE_VENDOR_SAGA, CREATE_VENDOR_REDUCER, VENDOR_BANK_INFO_SAGA, VENDOR_REDUCER, VENDOR_SAGA, ERROR_CODE, VENDOR_BASIC_INFO_REDUCER, SUCCESS_CODE, VENDOR_ADDRESS_INFO_REDUCER, VENDOR_BANK_INFO_REDUCER, VENDOR_BASIC_INFO_SAGA, VENDOR_ADDRESS_INFO_SAGA } from "../../Utils/Constant";
import { refreshToken } from "../../Token_Access/Token";
import { toast } from 'react-toastify';


function* handleVendorAction(action) {
    try {
        const response = yield call(VendorAction, action.payload)
        if (response.status === 200 || response.data.statusCode === 200) {
            yield put({ type: VENDOR_REDUCER, payload: { response: response.data.vendors } })
            yield put({ type: SUCCESS_CODE, payload: { statusCode: response.status, message: response.data.message } });
        }
        else if (response.status === 201 || response.data.statusCode === 201) {
            yield put({ type: ERROR_CODE, payload: { message: response.data.message || response.message } })
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

function* handleVendorBasicInfo(action) {
    try {
        const response = yield call(AddBasicInfoVendor, action.payload)
                if (response.status === 200 || response.data.statusCode === 200) {
            yield put({ type: VENDOR_BASIC_INFO_REDUCER, payload: { vendorId: response.data.vendorId } })
            yield put({ type: SUCCESS_CODE, payload: { statusCode: response.status, message: response.data.message } });
       
            toast.success(response.data.message || 'Success!', {
                style: {
                    background: '#4CAF50',  
                    color: '#fff',          
                    fontSize: '16px',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    padding: '10px',
                }
            });
       
       
        }
        else if (response.status === 201 || response.data.statusCode === 201) {
            yield put({ type: ERROR_CODE, payload: { message: response.data.message || response.message } })
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

function* handleVendorAddressInfo(action) {
    try {
        const response = yield call(AddAddressInfoVendor, action.payload)
        if (response.status === 200 || response.data.statusCode === 200) {
            yield put({ type: VENDOR_ADDRESS_INFO_REDUCER, payload: { vendorId: response.data.vendorId } })
            yield put({ type: SUCCESS_CODE, payload: { statusCode: response.status, message: response.data.message } });
            toast.success(response.data.message || 'Success!', {
                style: {
                    background: '#4CAF50',  
                    color: '#fff',          
                    fontSize: '16px',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    padding: '10px',
                }
            });
        }
        else if (response.status === 201 || response.data.statusCode === 201) {
            yield put({ type: ERROR_CODE, payload: { message: response.data.message || response.message } })
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

function* handleVendorBankInfo(action) {
    try {
        const response = yield call(AddBankInfoVendor, action.payload)
        if (response.status === 200 || response.data.statusCode === 200) {
            yield put({ type: VENDOR_BANK_INFO_REDUCER, payload: { vendorId: response.data.vendorId } })
            yield put({ type: SUCCESS_CODE, payload: { statusCode: response.status, message: response.data.message } });
            toast.success(response.data.message || 'Success!', {
                style: {
                    background: '#4CAF50',  
                    color: '#fff',          
                    fontSize: '16px',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    padding: '10px',
                }
            });
        }
        else if (response.status === 201 || response.data.statusCode === 201) {
            yield put({ type: ERROR_CODE, payload: { message: response.data.message || response.message } })
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






function* handleAddVendor(action) {
    try {
        const response = yield call(AddVendor, action.payload)
            if (response.status === 200 || response.data.statusCode === 200) {
            yield put({ type: CREATE_VENDOR_REDUCER, payload: { vendorId: response.data.vendorId } })
            yield put({ type: SUCCESS_CODE, payload: { statusCode: response.status, message: response.data.message } });
            toast.success(response.data.message || 'Success!', {
                style: {
                    background: '#4CAF50',  
                    color: '#fff',          
                    fontSize: '16px',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    padding: '10px',
                }
            });
        }
        else if (response.status === 201 || response.data.statusCode === 201) {
            yield put({ type: ERROR_CODE, payload: { message: response.data.message || response.message } })
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


function* handleEditVendor(action) {
    try {
        const response = yield call(EditVendor, action.payload)

        if (response.status === 200 || response.data.statusCode === 200) {
            yield put({ type: SUCCESS_CODE, payload: { statusCode: response.status, message: response.data.message } });
            toast.success(response.data.message || 'Success!', {
                icon: "",
                style: {
                    background: '#4CAF50',  
                    color: '#fff',          
                    fontSize: '14px',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    padding: '8px',
                    fontFamily:"Gilroy"
                }
            });
        }
        else if (response.status === 201 || response.data.statusCode === 201) {
            yield put({ type: ERROR_CODE, payload: { message: response.data.message || response.message } })
        }
        if (response) {
            refreshToken(response)
        }

    } catch (error) {
        const errorMessage = error?.response?.data?.detail ||  error?.response?.data?.message ;
        const statusCode = error?.response?.status || error?.status;
        yield put({ type: ERROR_CODE, payload: { message: errorMessage, statusCode } });
    }

}

function* handleDeleteVendor(action) {
    try {
        const response = yield call(DeleteVendor, action.payload)
    

        if (response.status === 200 || response.data.statusCode === 200) {
            yield put({ type: SUCCESS_CODE, payload: { statusCode: response.status, message: response.data.message } });
            toast.success(response.data.message || 'Success!', {
                icon: "",
                style: {
                    background: '#4CAF50',  
                    color: '#fff',          
                    fontSize: '14px',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    padding: '8px',
                    fontFamily:"Gilroy"
                }
            });
        }
        else if (response.status === 201 || response.data.statusCode === 201) {
            yield put({ type: ERROR_CODE, payload: { message: response.data.message || response.message } })
        }
        if (response) {
            refreshToken(response)
        }

    } catch (error) {
        const errorMessage = error?.response?.data?.detail ||  error?.response?.data?.message ;
        const statusCode = error?.response?.status || error?.status;
        yield put({ type: ERROR_CODE, payload: { message: errorMessage, statusCode } });
    }

}



function* handleViewVendor(action) {
    try {
        const response = yield call(ParticularVendor, action.payload)
        if (response.status === 200 || response.data.statusCode === 200) {
                     yield put({ type:VIEW_VENDOR_REDUCER, payload: {  Vendor: response.data.vendors} });
                 }
        else if (response.status === 201 || response.data.statusCode === 201) {
            yield put({ type: ERROR_CODE, payload: { message: response.data.message || response.message } })
        }
        if (response) {
            refreshToken(response)
        }

    } catch (error) {
        const errorMessage = error?.response?.data?.detail ||  error?.response?.data?.message ;
        const statusCode = error?.response?.status || error?.status;
        yield put({ type: ERROR_CODE, payload: { message: errorMessage, statusCode } });
    }

}

function* VendorSaga() {
    yield takeEvery(VENDOR_SAGA, handleVendorAction)
    yield takeEvery(VENDOR_BASIC_INFO_SAGA, handleVendorBasicInfo)
    yield takeEvery(VENDOR_ADDRESS_INFO_SAGA, handleVendorAddressInfo)
    yield takeEvery(VENDOR_BANK_INFO_SAGA, handleVendorBankInfo)
    yield takeEvery(CREATE_VENDOR_SAGA, handleAddVendor)
    yield takeEvery(EDIT_VENDOR_SAGA, handleEditVendor)
    yield takeEvery(DELETE_VENDOR_SAGA, handleDeleteVendor)
    yield takeEvery(VIEW_VENDOR_SAGA,  handleViewVendor)

   



}
export default VendorSaga;