import type { Blogs } from "../types/blogs";

const BASE_URL = 'http://localhost:3001';

export const getBlogs = async():Promise<Blogs[]> => { 
    const res = await fetch(`${BASE_URL}/blogs`);
    if(!res){
        throw new Error("Failed to fetch blogs");
    }
    
    return res.json();
}


export const getBlogsById = async (id: number):Promise<Blogs[]> => { 
    const res = await fetch(`${BASE_URL}/blogs/${id}`)

    if(!res){
        throw new Error("Failed to fetch blog");
    }

    return res.json();
}


export const  createNewBlog = async (blog: Omit<Blogs , "id">):Promise<Blogs[]> => { 
    console.log("CreateNewBlog data here:", blog) 
    const res = await fetch(`${BASE_URL}/blogs`, { 
        method: 'POST', 
        headers: { "Content-Type": "application/json" }, 
        body:JSON.stringify(blog)
    })

    if(!res){
        throw new Error("Failed to create blog");
    }
    
    return res.json();
}


