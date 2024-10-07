const imageToBase64 = async (image)=>{
    const render = new FileReader()
    render.readAsDataURL(image)

    const data = await new Promise((resolve, reject) => {
        render.onload = () => resolve(render.result)

        render.onerror = error => reject(error)
    })
    return data
}

export default imageToBase64