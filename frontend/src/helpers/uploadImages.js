const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`

const uploadImage = async (imgae) => {
    const formData = new FormData()
    formData.append('file',imgae)
    formData.append('upload_preset','shop_product')

    
    const  dataResponece = await fetch(url,{
        method : 'post',
        body :formData
    })

    return dataResponece.json()
}

export default uploadImage