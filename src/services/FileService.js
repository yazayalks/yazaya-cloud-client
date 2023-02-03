import api from "../http";
import {setAvatar, setSize, setUser} from "../redusers/sliceUserReducer";
import {addFile, deleteFile, deleteFileAction, setFiles} from "../redusers/sliceFileReducer";
import axios from "axios";
import {addUploadFile, changeUploadFile, showUploader} from "../redusers/sliceUploadReduser";
import {hideLoader, showLoader} from "../redusers/sliceAppReducer";
import {toast} from 'react-toastify'
import {useSelector} from "react-redux";

const url = process.env.REACT_APP_API_HOST
export default class FileService{
    static getFiles = (dirId, sort) => {
        return async dispatch => {
            try {
                dispatch(showLoader())
                let url
                if(dirId) {
                    url = `api/files?parent=${dirId}`
                }
                if(sort) {
                    url = `api/files?sort=${sort}`
                }
                if(dirId && sort) {
                    url = `api/files?parent=${dirId}&sort=${sort}`
                }
                const response = await api.get(url)
                dispatch(setFiles(response.data))
            } catch (e) {
                console.log(e)
            } finally {
                dispatch(hideLoader())
            }
        }
    }

    static createDir = (dirId, name) => {
        return async dispatch => {
            try {
                const response = await api.post('api/files', {
                    name,
                    parent: dirId,
                    type: 'dir'
                })
                dispatch(addFile(response.data))
            } catch (e) {
                console.log(e)
            }
        }
    }

    static uploadFile = (file, dirId) => {
        return async dispatch => {
            try {
                const formData = new FormData()
                formData.append('file', file)
                if (dirId) {
                    formData.append('parent', dirId)
                }
                const uploadFile = {name: file.name, progress: 0, id: Date.now()}
                dispatch(showUploader())
                dispatch(addUploadFile(uploadFile))
                const response = await axios.post(`${url}api/files/upload`, formData, {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    onUploadProgress: function ({progress}) {
                        let newProgress = (progress * 100).toFixed(2)
                        const newUploadFile = {...uploadFile, progress: newProgress}

                        dispatch(changeUploadFile(newUploadFile))
                    }
                });
                dispatch(addFile(response.data))
                dispatch(this.getUsedSpace())

            } catch (e) {
                toast.error(e?.response?.data?.message)
            }
        }
    }

     static downloadFile = async (file) => {
         try {
             const fileBlob = axios.get(`${url}api/files/download?id=${file._id}`, {
                 headers: {
                     Authorization: `Bearer ${localStorage.getItem('token')}`,
                 },
                 withCredentials: true,
                 baseURL: `${url}`,
                 responseType: 'blob'
             }).then((data) => {
                 if (data.status === 200) {
                     const href = URL.createObjectURL(data.data);
                     const link = document.createElement('a');
                     link.href = href;
                     link.download = file.name
                     document.body.appendChild(link);
                     link.click();

                     document.body.removeChild(link);
                     URL.revokeObjectURL(href);
                 }
             })
         }
         catch (e) {
             console.log('fileBlob')
         }
     }


    static deleteFile = (id, name) => {
        return async dispatch => {
            try {
                const response = await api.delete(`api/files?id=${id}`)
                dispatch(deleteFileAction(id))
                dispatch(this.getUsedSpace())
                toast.success(name + " successfully deleted!")
                // alert(response.data.message)
            } catch (e) {
                toast.error(name + " error deleted!")
                // alert(e?.response?.data?.message)
            }
        }
    }

    static searchFiles = (search, dirId, sort) => {
        return async dispatch => {
            try {
                let url
                if(!search) {
                    this.getFiles(dirId, sort)
                }

                if(search) {
                    url = `api/files/search?search=${search}`
                }
                if(search && sort) {
                    url = `api/files/search?search=${search}&sort=${sort}`
                }
                const response = await api.get(url)
                dispatch(setFiles(response.data))

            } catch (e) {
                alert(e?.response?.data?.message)
            }
            finally {
                dispatch(hideLoader())
            }
        }
    }

    static uploadAvatar = (file) => {
        return async dispatch => {
            try {
                const formData = new FormData()
                formData.append('file', file)
                const response = await api.post(`api/files/avatar`, formData)
                dispatch(setUser(response.data))

            } catch (e) {
                console.log(e)
            }
        }
    }

    static deleteAvatar = (file) => {
        return async dispatch => {
            try {

                const response = await api.delete(`api/files/avatar`)
                dispatch(setAvatar(null))
            } catch (e) {
                console.log(e)
            }
        }
    }

    static getUsedSpace = () => {
        return async dispatch => {
            try {
                const response = await api.get(`api/files/size`)
                dispatch(setSize(response.data.usedSpace
                ))
            } catch (e) {
                console.log(e)
            }
        }
    }

}