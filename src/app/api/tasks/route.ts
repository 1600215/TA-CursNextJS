import { prisma } from "@/app/libs/prisma";
import { NextResponse } from "next/server";



export async function GET() {

    const tasks = await prisma.task.findMany()
    // console.log(tasks)

    return NextResponse.json(tasks)
}

export async function POST(request: any) {
    const {title, description} = await request.json()

    const newTask = await prisma.task.create({
        data: {
            title,
            description
        }
    })
    return NextResponse.json(newTask)
}