import { Plus } from "lucide-react";
import { Button } from "./ui/button";


export default  function CreateBlog() {
    

    return <Button className="bg-primary px-2 py-0 pl-3 pr-0 ring-neutral-200 ring-2 cursor-pointer">
        <Plus className="scale-125" />
        Newpost
    </Button>
}



