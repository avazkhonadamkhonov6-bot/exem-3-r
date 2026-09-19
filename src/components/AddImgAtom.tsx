import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Field, FieldGroup } from './ui/field'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useAtom } from 'jotai/react'
import { addImgAtom } from '@/pages/Jotai/Jotai'
import type { FormEvent } from 'react'

interface Iprops{
  open:boolean,
  setOpen:(value:boolean)=>void,
  id:number | string
}

export default function AddImgAtom({open,setOpen,id}:Iprops) {
    const [,addi]=useAtom(addImgAtom)
console.log(id);

    const handelSubmit=(e:FormEvent<HTMLFormElement>)=>{
            e.preventDefault()
            const target=e.target as HTMLFormElement
            const formData=new FormData()
            const files = target.image.files
            if(files){
              for (const file of files) {
                formData.append(`Images`,file)
              }
            }
            addi({id,formData})
            setOpen(false)
            target.reset()
        }

  return (
    <>
     <Dialog open={open} onOpenChange={setOpen} >
        <DialogContent className="sm:max-w-sm">
      <form onSubmit={handelSubmit}>
          <DialogHeader>
            <DialogTitle>New User</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="image">Image / File</Label>
              <Input id="image" multiple name="image" type="file" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button onClick={()=>setOpen(false)} variant="outline">Cancel</Button>} />
            <Button type="submit">Save changes</Button>
          </DialogFooter>
      </form>
        </DialogContent>
    </Dialog> 
    </>
  )
}
