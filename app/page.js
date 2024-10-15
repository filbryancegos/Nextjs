'use client'
import React, { useState, useEffect } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [name, setName] = useState('')
  const [data, setData] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [currentId, setCurrentId] = useState(null)

  const fetchData = async () => {
    try {
      const res = await fetch('api/users/')
      const data = await res.json();
      console.log(data.data);
      setData(data.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
      fetchData()
  }, [])
  
  const handleChange = (e) => {
    setName(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error('Please input user name!')
      return
    }
    if (isEdit) {
      try {
        const response = await fetch('/api/users', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, id: currentId }),
        });
  
        const data = await response.json();
        if (data.success) {
          toast.success(data.message)
        }
        
        if (response.ok) {
          setIsEdit(false)
          setCurrentId(null)
          setName('')
          fetchData()
        }
      } catch (error) {
        console.error('Error creating user:', error);
      }
    } else {
      try {
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name }),
        });
  
        const data = await response.json();

        if (data.success) {
          toast.success(data.message)
          setIsEdit(false)
          setCurrentId(null)
          setName('')
          fetchData()
        }
      } catch (error) {
        console.error('Error creating user:', error);
      }
    }
  }

  const handleEdit = async (id) => {
    console.log(id);
    setIsEdit(true)
    setCurrentId(id)
    const findName = data?.find(el => el.id === id)
    setName(findName['name'])
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch('/api/users', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      console.log(data);
      
      if (data.success) {
        toast.success(`Username ${data.data.name} succesfully deleted!`)
      }
      if (response.ok) {
        setName('')
        fetchData()
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
    
  }
  
  return (
   <div className="w-1/2 m-auto">
    <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 mt-12">
            <label className="block">
              <span className="">Add User</span>
              <input onChange={handleChange} name="user" value={name} type="text" className="mt-1 block w-full text-black" placeholder="" />
            </label>
            <div>
              <button type="submit" className="bg-blue-400 p-2 w-full">submit</button>
            </div>
        </div>
      </form>
      <div className="mt-5">
        {data.map(({id, name}) => (
          <div className="flex items-center justify-between">
            <div key={id}>{name}</div>
            <div className="flex gap-2 items-center">
              <div onClick={() => handleEdit(id)}>
                <FiEdit2/>
              </div>
              <div onClick={() => handleDelete(id)}>
                <FiTrash2/>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
   </div>
  );
}
