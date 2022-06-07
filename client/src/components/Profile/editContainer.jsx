import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import Loading from '../Loading'
import EditForm from './editForm';
export default function EditProfile() {
    const loading = useSelector((state) => state.isLoading);
    useEffect(() => {
    }, [loading])
    
  return (
    <div>
        {loading ? (
        <Loading />
      ) : (
          <EditForm/>
      )}
    </div>
  )
}
