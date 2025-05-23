import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {toast} from 'react-toastify'
import Loader from "../../components/Loader"
import { setCredientials } from "../../redux/features/auth/authSlice"
import { Link } from "react-router-dom"
import {useProfileMutation} from "../../redux/api/usersApiSlice"

const Profile = () => {
    const [username, setUsername] =  useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const {userInfo} = useSelector(state=> state.auth)
    const [updateProfile, {isLoading: loadingUpdateProfile}] = useProfileMutation()
    
    useEffect(()=>{
        setUsername(userInfo.username)
        setEmail(userInfo.email)
    }, [userInfo.email, userInfo.username])

    const dispatch = useDispatch()

    const submitHandler = async (e)=>{
        e.preventDefault()

        if(password !== confirmPassword){
            toast.error('Passwords do not match')
        } else{
            try {
                const data = {_id: userInfo._id, username, email, password}
                const res = await updateProfile(data).unwrap()
                dispatch(setCredientials({...res}))
                toast.success('Profile updated successfuly')
            } catch (error) {
                toast.error(error?.data?.message || error.message)
            }
        }
    }

  return (
    <div className="container mx-auto p-4 mt-[5rem]">
        <div className="flex justify-center items-center md:flex md:space-x-4">
           <div className="md:w-1/3">
                <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>

                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-white mb-2">Username</label>
                        <input 
                        type="text" 
                        placeholder="Enter username" 
                        className="form-input p-2 rounded-sm w-full border"
                        value={username}
                        onChange={e=> setUsername(e.target.value)} />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-white mb-2">Email</label>
                        <input 
                        type="text" 
                        placeholder="Enter email" 
                        className="form-input p-2 rounded-sm w-full border"
                        value={email}
                        onChange={e=> setEmail(e.target.value)} />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-white mb-2">Password</label>
                        <input 
                        type="password" 
                        placeholder="Enter password" 
                        className="form-input p-2 rounded-sm w-full border"
                        value={password}
                        onChange={e=> setPassword(e.target.value)} />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-white mb-2">Confirm Password</label>
                        <input 
                        type="password" 
                        placeholder="Enter confirm password" 
                        className="form-input p-2 rounded-sm w-full border"
                        value={confirmPassword}
                        onChange={e=> setConfirmPassword(e.target.value)} />
                    </div>

                    <div className="flex justify-between">
                        <button type="submit" className="bg-pink-500 text-white py-2 px-4 rounded
                        hover:bg-pink-600">
                            Update
                        </button>

                        <Link to='/user-orders' 
                        className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700">
                        My Orders
                        </Link>
                    </div>

                </form>
           </div>

           {loadingUpdateProfile && <Loader/>}
        </div>

    </div>
  )
}

export default Profile