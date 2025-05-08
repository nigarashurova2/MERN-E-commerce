import { useEffect, useState } from "react"
import {FaTrash, FaEdit, FaCheck, FaTimes} from "react-icons/fa"
import Loader from '../../components/Loader'
import {toast} from "react-toastify"
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation()
  const [updateUser] = useUpdateUserMutation()

  const [editableUserId, setEditableUserId] = useState(null)
  const [editableUsername, setEditableUsername] = useState('')
  const [editableUserEmail, setEditableUserEmail] = useState('')

  useEffect(()=>{
    refetch()
  }, [refetch])

  const toggleEdit = (userId, username, email)=>{
    setEditableUserId(userId)
    setEditableUserEmail(email)
    setEditableUsername(username)
  }

  const updateHandler = async (userId)=>{
    try {
      const data = {
        userId,
        username: editableUsername,
        email: editableUserEmail,
        _id: userId
      }
      await updateUser(data).unwrap()
      toast.success("User successfully updated")
      setEditableUserId(null)
      refetch()
    } catch (error) {
      toast.error(error?.data.message || error.message)
    }
  }

  const deleteHandler = async (userId)=>{
    if(window.confirm("Are you sure?")){
        try {
          const res = await deleteUser(userId).unwrap()
          toast.success("User successfully deleted")
        } catch (error) {
          toast.error(error?.data.message || error.message)
        }
    }
   
  }



  return (
    <div className="p-4">
      {isLoading ? (<Loader/>) :  
      error ? (<Message variant='danger'>{error?.data.message || error.message}</Message>) :
      (
       <div className=" pl-[5rem] flex flex-col md:flex-row">
        <table className="w-full md:w-4/5 mx-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">USERNAME</th>
              <th className="px-4 py-2 text-left">EMAIL</th>
              <th className="px-4 py-2 text-left">ADMIN</th>
              <th className="px-4 py-2 text-left"></th>

            </tr>
          </thead>
          <tbody>
          {users.map(user=> (
              <tr key={user._id}>
                <td className="px-4 py-2">{user._id}</td>
                <td className="px-4 py-2">
                  {editableUserId === user._id ? (
                    <div className="flex items-center">
                      <input type="text" value={editableUsername} 
                      onChange={e=>setEditableUsername(e.target.value)}
                      className="w-full p-2 border rounded-lg"/>
                      <button onClick={()=> updateHandler(user._id)}
                        className="ml-2 bg-blue-500 text-white py-2px-4 rounded-lg">
                          <FaCheck/> 
                        </button>
                    </div>
                  ) : (
                    <div className="flex items-center">
                        {user.username} {" "}
                        <button onClick={()=> toggleEdit(user._id, user.username, user.email)}>
                          <FaEdit className="ml-[1rem]"/>
                        </button>
                    </div>
                  )}
                 
                  </td>
                
                  <td className="px-4 py-2">
                  {editableUserId === user._id ? (
                    <div className="flex items-center">
                      <input type="text" value={editableUserEmail} 
                      onChange={e=>setEditableUserEmail(e.target.value)}
                      className="w-full p-2 border rounded-lg"/>
                      <button onClick={()=> updateHandler(user._id)}
                        className="ml-2 bg-blue-500 text-white py-2px-4 rounded-lg">
                          <FaCheck/> 
                        </button>
                    </div>
                  ) : (
                    <div className="flex items-center">
                        {user.email} {" "}
                        <button onClick={()=> toggleEdit(user._id, user.username, user.email)}>
                          <FaEdit className="ml-[1rem]"/>
                        </button>
                    </div>
                  )}
                 
                  </td>

                <td className="px-4 py-2">
                  {user.isAdmin ?
                   <FaCheck className="text-green-600" size={14}/> :
                   <FaTimes className="text-red-600" size={14}/>
                   }
                </td>

                <td className="px-4 py-2">
                    {!user.isAdmin && (
                      <div className="flex">
                        <button onClick={()=> deleteHandler(user._id)}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-2 rounded">
                            <FaTrash size={14}/>
                        </button>
                      </div>
                    )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) }
    </div>
  )
}

export default UserList