import { useDispatch } from "react-redux"
import type { AppDispatch } from "../store/store"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { Field, FieldGroup } from "./ui/field"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useAtom } from "jotai/react"
import { editUserAtom } from "@/pages/Jotai/Jotai"

interface Iprops{
  open:boolean,
  setOpen:(value:boolean)=>void,
  name:string,
  setName:(value:string)=>void,
  id:number| string,
  desc:string,
  setDesc:(value:string)=>void
}


export function EditUserAtom({open,setOpen,id,name,desc,setName,setDesc}:Iprops) {
    const [,editUser]=useAtom(editUserAtom)
    const handelSubmit=(e)=>{
        e.preventDefault()
        const upUser={
            name:name,
            description:desc,
            id:id,
        }
        editUser(upUser)
        setOpen(false)
        e.target.reset()
    }

  return (
    <Dialog open={open} onOpenChange={setOpen} >
        <DialogContent className="sm:max-w-sm">
      <form onSubmit={handelSubmit}>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" value={name} onChange={(e)=>setName(e.target.value)} />
            </Field>
            <Field>
              <Label htmlFor="description-1">Description</Label>
              <Input id="description-1" value={desc} name="description"  onChange={(e)=>setDesc(e.target.value)}  />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button onClick={()=>setOpen(false)} variant="outline">Cancel</Button>} />
            <Button type="submit">Save changes</Button>
          </DialogFooter>
      </form>
        </DialogContent>
    </Dialog>
  )
}
