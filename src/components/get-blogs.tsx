import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { Link } from "wouter";
import { useGetBlog } from "../hooks/useBloks";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";

interface BlogDetailProps {
  id: number;
}

export function BlogDetail({ id }: BlogDetailProps) {
  const { data: blog, isLoading, error } = useGetBlog(id); 

  if (isLoading) {
    return <BlogDetailSkeleton />;
  }

  if (error || !blog) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-in">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <span className="text-3xl">No Data found</span>
        </div>
        <h2 className="text-xl font-bold mb-2">Blog not found</h2>
        <p className="text-muted-foreground mb-6">The post you're looking for doesn't exist or has been removed.</p>
        <Link href="/">
          <Button variant="outline">Return Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="h-full bg-background">
      <div className="md:hidden sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b p-4 flex items-center gap-2">
        <Link href="/">
          <Button variant="ghost" size="icon" className="-ml-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <span className="font-semibold truncate">Back to list</span>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="relative aspect-video w-full overflow-hidden md:rounded-b-2xl shadow-sm">
          <img 
            src={blog.coverImage} 
            alt={blog.title} 
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60" />
        </div>

        <div className="px-6 py-8 md:px-10">
          <div className="space-y-6 mb-8 animate-in">
            <div className="flex flex-wrap gap-2">
              {blog.category.map((cat) => (
                <Badge key={cat} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                  {cat}
                </Badge>
              ))}
            </div>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
              {blog.title}
            </h1>

            <div className="flex items-center gap-6 text-sm text-muted-foreground border-b pb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Nothing</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>5 min read</span>
              </div>
              <Button variant="ghost" size="sm" className="ml-auto text-muted-foreground hover:text-foreground">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none animate-in delay-100">
            <p className="lead text-xl text-muted-foreground mb-8 font-light italic border-l-4 border-primary/30 pl-4">
              {blog.description}
            </p>
            <div className="whitespace-pre-wrap leading-relaxed text-foreground/90">
              {blog.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlogDetailSkeleton() {
  return (
    <div className="h-full overflow-hidden flex flex-col">
      <Skeleton className="w-full aspect-video md:rounded-b-2xl" />
      <div className="p-6 md:p-10 space-y-6 max-w-3xl mx-auto w-full">
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <Skeleton className="h-12 w-3/4" />
        <div className="flex gap-6 pb-8 border-b">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="space-y-4 pt-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </div>
  );
}
