'use client'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from '../ui/command'
import { ArrowTopRightIcon } from '@radix-ui/react-icons'


import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CarResult } from '@/types'
import { search } from '@/actions/fetch-models'


const SearchBar = () => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = useState("")
    const router = useRouter()

    React.useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
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

    const ONE_DAY = 24 * 60 * 60 * 1000; // One day in milliseconds
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

      const loadRecent = async () => {
        const getRecent = localStorage.getItem('recentSearch');
        console.log(getRecent)
        if(getRecent)
        {
          const parsedModels: CarResult[] = JSON.parse(getRecent);
          if(parsedModels.length > 5)
          {
            parsedModels.slice(0,5);
            localStorage.setItem('recentSearch',JSON.stringify(parsedModels))

          }
          
            setResult(parsedModels);
        }
      }

      loadRecent();
      fetchMakes();
  }, []);
  

  const setRecent = async (item:CarResult) => {
    const getRecent = localStorage.getItem('recentSearch');
    if(getRecent)
    {
      const parsedModels: CarResult[] = JSON.parse(getRecent);
      
      parsedModels.push(item);
      localStorage.setItem('recentSearch',JSON.stringify(parsedModels))
    }
    else{
      const recent= [item]
      localStorage.setItem('recentSearch',JSON.stringify(recent))
    }
  }

    return (
      <>
      <div onClick={() => setOpen((prev) => !prev)} className="rounded-xl bg-card flex justify-between   pr-4 items-center gap-16 max-w-72">
          <div className="flex gap-2 items-center">
            <i className="icon m-2 invert dark:invert-0" style={{backgroundPosition: "-30px -90px"}}/>
            <p className='text-sm'>
              Search..
            </p>
          </div>
          <p className="text-sm opacity-65 md:inline hidden">
            Press{" "}
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </p>
        </div>
     
      <CommandDialog open={open} onOpenChange={setOpen}  >
        <CommandInput value={keyword} onSubmit={(e) => { console.log('hello') }} onValueChange={(e) => handleInputChange(e)} placeholder="Type a command or search..." />
        <CommandList>
          {result.length > 0 &&
          <CommandGroup heading="Suggestions">
          {result.map((make, index) => (
            <CommandItem key={index} onSelect={() => {
              router.push(`/inventory/search?make=${make.make}&model=${make.model}`);
              setRecent(make);
              setKeyword('');
              setOpen((prev) => !prev);
              }} onClick={() => router.push(`/inventory/search?make=${make.make}&model=${make.model}`)}>
              <ArrowTopRightIcon className="mr-2 h-4 w-4" />
              <Link href={`/inventory/search?make=${make.make}&model=${make.model}`}>
                {make.make} {make.model}
              </Link>
            </CommandItem>
          ))}
          </CommandGroup> }{ result.length === 0 &&(
            <CommandGroup heading="Search with Keyword">
              <CommandItem onSelect={() => {
                router.push(`/inventory/search?keyword=${keyword.trim()}`);
                setKeyword('');
                setOpen((prev) => !prev);
                }} value={keyword}>
                <ArrowTopRightIcon className="mr-2 h-4 w-4" />
                Search For  
                <span className='mx-1 font-bold'>
                  {keyword.trim()}
                </span>
              </CommandItem>
            
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
    
    )
}

export default SearchBar