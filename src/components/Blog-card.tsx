import { Link, useRoute } from "wouter";
import type { Blogs } from "../types/blogs"
import { cn } from "../lib/utils";
import { Badge } from "./ui/badge";

interface BlogsProps {
    blog: Blogs
}

function formatReadableDate(dateString:string) {
    const date = new Date(dateString);

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    
    return `${month}, ${day}, ${year}`;
  }

export default function BlogCard({blog} : BlogsProps){  
    const [match , params] = useRoute("/blog/:id");
    const isActive = match && Number(params?.id) === Number(blog.id);

    return ( 
        <Link 
            href={`/blog/${blog.id}`}
            className={cn(
                "w-full block mt-5 border text-start bg-background border-neutral-300 p-4 rounded-md transition-all ease-in-out duration-200 hover:-translate-y-1", 
                 "border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/40",
                 isActive ? "bg-primary/5 border-primary shadow-md shadow-primary/10 ring-1 ring-primary/1" : ""
            )}
        > 
            <div className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-2">
                    {blog.category.map((item , index) => ( 
                        <Badge key={index} className="rounded-sm">{item}</Badge>
                    ))}
                </div>

                <div className="flex flex-col ">
                    <h1 className="font-medium text-md leading tracking-tighter text-neutral-800 mb-1 line-clamp-2">{blog.title}</h1>
                    <span className="text-sm text-muted-foreground">
                        {formatReadableDate(blog.date || "Error")} 
                    </span>
                </div> 

                <p className="text-sm text-muted-foreground line-clamp-3 leading-normal">
                    {blog.description}
                </p>

            </div>

        </Link>
    ) 
}