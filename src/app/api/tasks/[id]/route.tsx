import { prisma } from "@/app/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request: any, {params}:{params:any}){
    const task = await prisma.task.findUnique({
        where: {
            id: Number(params.id)
        }
    })
    // console.log(task)

    return NextResponse.json(task)
}

export async function PUT(request: any, {params}:{params:any}){
    try {
        const data = await request.json()
        const updatedTask = await prisma.task.update({
            where: {
                id: Number(params.id)
            },
            data: data
        })
        // console.log(removedTask)
        return NextResponse.json(updatedTask)
    } catch (error: any) {
        return NextResponse.json(error.message)
    }
}

export async function DELETE(request: any, {params}:{params:any}){
    try {
        const removedTask = await prisma.task.delete({
            where: {
                id: Number(params.id)
            }
        })
        // console.log(removedTask)
        return NextResponse.json(removedTask)
    } catch (error: any) {
        return NextResponse.json(error.message)
    }

}