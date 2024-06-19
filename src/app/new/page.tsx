"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

function NewPage({params}:{params: any}) {
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    //  console.log(params)
    if(params) {
      fetch("/api/tasks/"+params.id)
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        setTitle(data.title)
        setDescription(data.description)
      })
    }
  }, [])

  const onSubmit = async (e: any) => {
    e.preventDefault()
    // console.log(e)
    // const description = e.target.description.value
    // const title = e.target.title.value

    // console.log(description, title)

    if(params.id){
      const res = await fetch("/api/tasks/"+params.id, {
        method: "PUT",
        body: JSON.stringify({title, description}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()
    } else {
      const res = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify({title, description}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()
    }
    // console.log(data)
    router.refresh()
    router.push("/")
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <form action="" className="bg-slate-800 p-10 lg:w-1/4 md:w-1/2 sm: w-3/4" onSubmit={onSubmit}>
        <label htmlFor="title" className="font-bold text-sm">Título de la tarea</label>
        <input id="title" type="text" 
        className="border border-gray-400 p-2 mb-4 w-full text-black"
        placeholder="Título"
        onChange={(e: any) => setTitle(e.target.value)}
        value={title}
        />

        <label htmlFor="description" className="font-bold text-sm">Descipción de la tarea tu tarea</label>
        <textarea id="description" rows={3} 
        className="border border-gray-400 p-2 mb-4 w-full text-black"
        placeholder="Describe tu tarea"
        onChange={(e: any) => setDescription(e.target.value)}
        value={description}
        ></textarea>
        <div className="flex justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Crear
          </button>
          {
            params.id && (
              <button type="button" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={async () => {
                const res = await fetch("/api/tasks/"+params.id, {
                  method: "DELETE",
                })
                const data = await res.json()
                console.log(data)
                router.refresh()
                router.push("/")
              }}
              >
              Delete
            </button>
            )
          }
        </div>
      </form>
    </div>
  )
}

export default NewPage