"use client";

import React, { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter()

  const API_URL = "http://localhost:8080/";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const username = formData.get('username')
    const password = formData.get('password')


    const response = await fetch(API_URL + 'api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({username, password}),
    })

    if (response.ok) {
      router.push('/protected/todos')
    } else {
      //Handle errors
    }
  }

  return (
    <div className="w-screen h-screen bg-sky-700 flex justify-center items-center">
      <div className="w-[410px] h-[557.66px] bg-white/30 backdrop-blur-md backdrop-brightness-125 border border-white/50 rounded-lg p-6 flex flex-col justify-center items-center">
        
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-4">
      <h1>Login Page</h1>
        <label>Username</label>
        <input className="border rounded-lg h-10 text-black" type="text" name="username" placeholder="username" required />
        <label >Password</label>
        <input className="border rounded-lg h-10 text-black" type="password" name="password" placeholder="Password" required />
        <button type="submit" className="bg-blue-700 h-10 rounded-lg px-20 py-2">Login</button>
      </form>
      </div>
    </div>
  );
}
