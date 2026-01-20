import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, X } from "lucide-react";
import * as z from "zod"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { useCreateBlog } from "../hooks/useBloks";
import { Button } from "./ui/button";
import type { Blogs } from "../types/blogs";
import { toast } from "sonner";


const formSchema = z.object({ 
  title: z.string(), 
  description: z.string(), 
  content: z.string(), 
  coverImage: z.string(), 
  category: z.string().array()
})

export function CreateBlogDialog() {
  const [open, setOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const createBlog = useCreateBlog();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      coverImage: "",
      category: [],
    },
  });

  const onSubmit = (data: Blogs) => {
    console.log("data:" ,data)
    createBlog.mutate({ 
      ...data,
      date: new Date().toString(),
    }, {
      onSuccess: () => {
        toast("Success!" , { 
          description:"Your blog post has been created."
        })
        setOpen(false);
        form.reset();
      },
      onError: (error) => {
        toast.error('Error' , { 
          description: error.message
        })
      },
    });
  };

  const addCategory = (e : React.KeyboardEvent) => { 
      if(e.key === 'Enter' && newCategory.trim()) {
        e.preventDefault();
        const current = form.getValues("category");
        if(!current.includes(newCategory.trim().toUpperCase())) {
          form.setValue("category" , [...current , newCategory.trim().toUpperCase()])
          setNewCategory("")
        }
      }
  }

  const removeCategory = (catToRemove: string) => {
    const current = form.getValues("category");
    form.setValue("category", current.filter(c => c !== catToRemove));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      <Button className="bg-primary px-2 py-0 pl-3 pr-0 ring-neutral-200 ring-2 cursor-pointer">
        <Plus className="scale-125" />
        Newpost
    </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Create New Blog Post</DialogTitle>
          <DialogDescription>
            Share your thoughts with the world. Fill out the details below.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a catchy title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categories</FormLabel>
                    <FormControl>
                      <div className="space-y-3">
                        <Input
                          placeholder="Type & press Enter to add..."
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          onKeyDown={addCategory}
                        />
                        <div className="flex flex-wrap gap-2 min-h-[32px]">
                          {field.value.map((cat) => (
                            <Badge key={cat} variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1">
                              {cat}
                              <button
                                type="button"
                                onClick={() => removeCategory(cat)}
                                className="hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5 transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </Badge>
                          ))}
                          {field.value.length === 0 && (
                            <span className="text-sm text-muted-foreground italic">No categories added</span>
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="coverImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormDescription className="text-xs truncate">
                      Paste a valid image URL (e.g., from Unsplash)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="A brief summary that appears in the list..." 
                      className="resize-none h-20"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Write your full story here..." 
                      className="min-h-[200px] font-mono text-sm"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={createBlog.isPending}>
                {createBlog.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Publish Post
              </Button>
            </div>
          </form>
        </Form>
        
      </DialogContent>
    </Dialog>
  );
}
