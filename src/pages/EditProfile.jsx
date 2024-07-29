import defaultUser from '../assets/images/user-2.png'
import { userStore } from "../context/userStore"
import { Toaster, toast } from "sonner"
import '../styles/editarPerfil.css'
import { axiosPrivateInstance, BASE_URL } from '../api/axios'
import { useState } from 'react'
import { ACCEPTED_FILE_TYPES } from '../utils/constants'
import { ChangeUserData } from '../components/ChangeUserData'
import { ChangePassword } from '../components/ChangePassword'
import { objectToFormData } from '../utils/formData'

export const EditProfile = () => {
  const user = userStore(state => state.user)
  const [profilePicture, setProfilePicture] = useState({
    backGroundURL: '',
    image: '',
    errors: ''
  })
  const setUser = userStore(state => state.setUser)
  const [editPassword, setEditPassword] = useState(false)

  const handleImageChange = async (event) => {
    try {
      const file = event.target.files[0]
      if (file && ACCEPTED_FILE_TYPES.includes(file.type)) {
        const imageObject = { profilePicture: file, oldImageName: user.profileImage }
        const imageToUpdate = objectToFormData(imageObject)
        const response = await axiosPrivateInstance.post('/user/upload-profile-picture', imageToUpdate)
        setUser(response.data.user)
        console.log(response.data.user)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        const imageUrl = URL.createObjectURL(file)
        setProfilePicture({
          backGroundURL: imageUrl,
          image: file,
          errors: ''
        })
        toast.success('Foto de perfil actualizada', {
          className: 'toast-success'
        })

      } else {
        setProfilePicture({
          image: '',
          backGroundURL: '',
          errors: 'Formato no aceptado'
        })
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message, {
        className: 'toast-error'
      })
    }
  }

  const imageURL = profilePicture.backGroundURL !== '' ? profilePicture.backGroundURL : user?.profileImage === 'default.png' ? defaultUser : `${BASE_URL}/user/profile-picture/${user.profileImage}`

  return (
    <>
      <main className="main-edit-profile-container">
        <div className="edit-profile-container">
          <section className="aside-container-edit-profile">
            <div className="image-container-edit-profile">
              <img className='profile-image-edit' src={imageURL} />
            </div>
            <div className='button-edit-profile-container'>
              <label htmlFor='image-edit-profile' className='label-edit-profile-image'>
                <span>Cambia la foto de perfil</span>
              </label>
              <input type='file' id="image-edit-profile" onChange={handleImageChange} hidden />
            </div>
            {profilePicture.errors !== '' && <p className="error-message">{profilePicture.errors}</p>}
          </section>

          <section className="form-container">
            {!editPassword ? (
              <>
                <ChangeUserData editPassword={editPassword} setEditPassword={setEditPassword} />
              </>
            ) : (
              <>
                <ChangePassword editPassword={editPassword} setEditPassword={setEditPassword} />
              </>
            )

            }
          </section>
        </div>
      </main>
      <Toaster />
    </>
  )
}

