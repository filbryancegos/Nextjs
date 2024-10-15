"use client"
import React from 'react'

const page = ({params}) => {
  console.log(params);
  return (
    <div>page: {params.postId}</div>
  )
}

export default page