'use client'
import Link from 'next/link'
import React from 'react'
import { useEffect, useState } from 'react'

const page = () => {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen gap-5'>
      <Link href='/show_products' className='btn'>Show products</Link>
      <Link href='/add_product' className='btn'>Add product</Link>
    </div>
  )
}

export default page