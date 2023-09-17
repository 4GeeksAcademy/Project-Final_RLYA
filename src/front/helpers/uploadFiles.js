export const fileupload = async (file) => {
    if (!file) {
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
    }
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dviam6z5f/image/upload';
    const formData = new FormData();
    formData.append('upload_preset', 'azyuvvt7')
    formData.append('file', file);
    try {
        const resp = await fetch(cloudUrl, {
            method: "POST",
            body: formData
        });
        if (resp.ok) {
            const cloudRes = await resp.json();
            return cloudRes.secure_url;
        } else {
            throw await resp.json();
        }
    } catch (error) {
        throw error;
    }

}