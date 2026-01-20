import { BookOpen, Search } from "lucide-react";
import { cn } from "../lib/utils";
import { Input } from "../components/ui/input";
import { useState } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useRoute } from "wouter";
import { useBlogs } from "../hooks/useBloks";
import BlogCard from "../components/Blog-card";
import { BlogDetail } from "../components/get-blogs";
import { CreateBlogDialog } from "../components/create-blog";

export default function Home() { 
    const { data, isLoading, isError } = useBlogs();
    const [match, params] = useRoute("/blog/:id")
    const [search , setSearch] = useState("");  
    const selectedId = match && params?.id ? Number(params?.id) : null; 
    // console.log(data)

    if(isLoading){ 
        return <div>
            Loading...
        </div>
    }


    if(isError){ 
        return <div>
            Something is broke
        </div>
    }

    const filteredBlogs = data?.filter((blog) => { 
        return blog.title.toLocaleLowerCase().includes(search.toLowerCase())
    })


    return <div className="flex h-screen w-full bg-muted/20 overflow-hidden">
   
        <div className={cn(
            "w-full md:w-[400px] lg:w-[450px] shrink-0 flex flex-col bg-background border-r border-neutral-300/50 transition-all duration-300 z-20 overflow-y-auto no-scrollbar",
            selectedId ? "hidden" : ""
        )}>
            <div className="p-6 border-b border-neutral-300/50 bg-background sticky top-0 z-10">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-3 items-center">
                        <div className="p-3 bg-primary text-primary-foreground ring-neutral-200 ring-1 rounded-full ">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <h1 className="text-2xl text-neutral-500 font-semibold tracking-tighter">Daily Read</h1>
                    </div>
                    <CreateBlogDialog />
                </div>
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-primary transition-colors" />
                    <Input
                    placeholder="Search articles..." 
                    className="pl-9 bg-muted/50 border-transparent focus:bg-background focus:border-primary/20 transition-all rounded-xl"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div> 

            <ScrollArea className="flex-1 px-4">
                <div className="py-6 space-y-2">
                    {filteredBlogs?.map((blog , index) => ( 
                        <BlogCard key={index} blog={blog} />
                    ))}
                </div>
            </ScrollArea>

            
            <div className="p-4 border-t border-neutral-200 shadow text-xs text-center text-muted-foreground bg-muted sticky bottom-0 z-10">
                <p>© 2026 Daily Read. Built with React & TanStack Query. </p>
            </div>
        </div>

        <div className={cn(
            "flex-1 bg-white dark:bg-zinc-900 h-full relative overflow-auto transition-all duration-300", 
            !selectedId ? "hidden md:block" : "block fixed inset-0 md:static md:z-0"
         )}>
            {selectedId ? ( 
                <div>
                    <BlogDetail id={selectedId} />
                </div>
            ) : ( 
                    <EmptyState />
            )}
        </div>

    </div>
}

function EmptyState() { 

    return <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-muted/10 pattern-dots">
            <div className="max-w-md space-y-6">

                <div className="w-24 h-24 bg-primary text-muted rounded-full flex items-center justify-center mx-auto shadow-xl ring-3 ring-neutral-200 shadow-primary/5 animate-in">
                    <BookOpen className="w-10 h-10" />
                </div>
                
                <div className="flex flex-col items-center justify-center space-y-2 animate-in delay-100">
                    <h1 className="text-xl font-bold tracking-tighter">Select a story to read</h1>
                    <p className="text-muted-foreground text-sm tracking-tight ">Click on any article from the list on the left to view its full
                    content here.</p>
                </div>

                <div className="pt-1 animate-in delay-200 ">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full ring-1 ring-neutral-200 bg-background shadow-sm text-sm text-muted-foreground">
                        <span className="relative flex size-2 text-center ">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex size-2 rounded-full bg-primary"></span>
                        </span>
                        <span>
                            <p className="text-xs font-light ">Waiting for selection...</p>
                        </span>
                    </div>
                </div>

            </div>
    </div>
}



