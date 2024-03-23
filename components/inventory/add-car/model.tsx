
import { CarFinal } from '@/schemas'
import React, {useEffect, useState } from 'react'
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from '@/components/ui/command'
import { ArrowTopRightIcon } from '@radix-ui/react-icons'

import Link from 'next/link'

import { CarResult } from '@/types'
import { Button } from '@/components/ui/button'

const SelectModel = (props : any) => {
    const {newCar, setNewCar}: {newCar: CarFinal, setNewCar:React.Dispatch<React.SetStateAction<CarFinal>>} = props;
    const [open, setOpen] = React.useState(false)


    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
          if (e.key === "m" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault()
            setOpen((open) => !open)
          }
        }
    
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
      }, [])

    const [keyword, setKeyword] = useState("")
    const [result, setResult] = useState<CarResult[]>([
      {
        "id": 352,
        "make": "Honda",
        "model": "Civic Reborn VTi Oriel 1.8 i-VTEC",
        "title": "Honda Civic Reborn VTi Oriel 1.8 i-VTEC",
        "engineType": "Petrol",
        "engineCapacity": "1800 cc",
        "bodyType": "Sedan"
      },
      {
      "id": 332,
      "make": "Honda",
      "model": "Civic",
      "title": "Honda Civic",
      "engineType": "Petrol",
      "engineCapacity": "1500 cc",
      "bodyType": "Sedan"
    },
    {
      "id": 1322,
      "make": "Toyota",
      "model": "Corolla",
      "title": "Toyota Corolla",
      "engineType": "Petrol",
      "engineCapacity": "1600 cc",
      "bodyType": "Sedan"
    },
    {
      "id": 1375,
      "make": "Toyota",
      "model": "Corolla GLi 1.3",
      "title": "Toyota Corolla GLi 1.3",
      "engineType": "Petrol",
      "engineCapacity": "1300 cc",
      "bodyType": "Sedan"
    },
    {
      "id": 1054,
      "make": "Suzuki",
      "model": "Alto",
      "title": "Suzuki Alto",
      "engineType": "Petrol",
      "engineCapacity": "660 cc",
      "bodyType": "Hatchback"
    },
    {
      "id": 1752,
      "make": "Toyota",
      "model": "Yaris",
      "title": "Toyota Yaris",
      "engineType": "Petrol",
      "engineCapacity": "1000 cc",
      "bodyType": "Sedan"
    },
    ]);
  
      
    const handleInputChange = (e:string)=>{
          console.log(result.length)
          setKeyword(e);
          let searchResult: CarResult[];
          const cachedModels = localStorage.getItem('models');
          if (cachedModels) {
              const parsedModels: CarResult[] = JSON.parse(cachedModels);
              searchResult = parsedModels.filter(model =>
                  model.title.toLowerCase().trim().includes(e.toLowerCase().trim())
              );
              // console.log(searchResult)
              setResult(searchResult.slice(0,15));
          }
      }

    const ONE_DAY = 24 * 60 * 60 * 1000;
    useEffect(() => {
        const fetchMakes = async () => {
            try {
                const lastFetchTime = localStorage.getItem('makesFetchTime');
                if (lastFetchTime && Date.now() - parseInt(lastFetchTime) < ONE_DAY) {
                    // Makes exist in local storage and were fetched within the last 24 hours
                    console.log('Makes exist in local storage and are recent.');
                    return;
                }
    
                const response = await fetch('/models.json'); // Adjust the path as needed
                if (!response.ok) {
                    throw new Error('Failed to fetch makes');
                }
                const makesData = await response.json();
                // console.log(makesData);
                // Store makes in local storage
                localStorage.setItem('models', JSON.stringify(makesData));
                localStorage.setItem('makesFetchTime', Date.now().toString());
            } catch (error) {
                console.error('Error fetching makes from file:', error);
            }
        };
  
        
        fetchMakes();
    }, []);

    return (
        <>
        <Button onClick={(e) => {e.preventDefault(); setOpen((prev) => !prev)}} className="rounded-xl bg-background border-2 flex justify-between pr-4 items-center gap-16 w-full h-4 py-6">
            <div className="flex gap-2 items-center">
              <p className={`text-sm ${newCar.make == ''&&"opacity-55" } text-card-foreground`}>
                {newCar.make == ''? " Choose Your Model": newCar.title}
              </p>
            </div>
            <p className="text-sm opacity-65 md:inline hidden text-card-foreground">
              Press{" "}
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
                <span className="text-xs">⌘</span>M
              </kbd>
            </p>
          </Button>
       
        <CommandDialog open={open} onOpenChange={setOpen}  >
          <CommandInput value={keyword} onValueChange={(e) => handleInputChange(e)} placeholder="Type make or model..." />
          <CommandList>
            <CommandEmpty>
                Cant find your Car? <Link className='text-primary font-semibold' href={'/inventory/add-car/report-car'}>Report</Link>
            </CommandEmpty>
            {result.length > 0 &&
            <CommandGroup heading="Suggestions">
            {result.map((make, index) => (
              <CommandItem key={index} onSelect={() => {
                setNewCar({...newCar,
                    make : make.make,
                    model : make.model,
                    engine : make.engineType,
                    engineCapacity : make.engineCapacity,
                    body : make.bodyType,
                    title : make.title })
                setKeyword('');
                setOpen((prev) => !prev);
                }}>
                <ArrowTopRightIcon className="mr-2 h-4 w-4" />
                  {make.make} {make.model}
              </CommandItem>
            ))}
            </CommandGroup> }
          </CommandList>
        </CommandDialog>
      </>
  )
}

export default SelectModel