"use client"
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { search } from '@/actions/fetch-models';
import { useRouter } from 'next/navigation';
import { Input } from '../ui/input';



const SearchBar: React.FC = () => {
    const [keyword, setKeyword] = useState('');
    const [result, setResult] = useState<CarResult[]>([{ id: 0, make: "", model: "", title: "", engineType: "", engineCapacity: "", bodyType: "" }]);
    const [showResult, setShowResult] = useState(false);
    const [typingTimer, setTypingTimer] = useState<NodeJS.Timeout | null>(null);
    const router = useRouter();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setKeyword(value);

        if (typingTimer) {
            clearTimeout(typingTimer);
        }

        // Set a timeout to call getResult after 2 seconds of no typing
        const timer = setTimeout(() => {
            getResult(value);
        }, 200); // Adjust the delay as needed (2 seconds in this case)

        setTypingTimer(timer);
    };

    useEffect(() => {
        // Cleanup function to clear the typing timer on unmount
        return () => {
            if (typingTimer) {
                clearTimeout(typingTimer);
            }
        };
    }, [typingTimer]);

    const getResult = async (value: string) => {
        setKeyword(value);
        let searchResult: CarResult[];

        // Check local storage for models
        const cachedModels = localStorage.getItem('models');
        if (cachedModels) {
            const parsedModels: CarResult[] = JSON.parse(cachedModels);
            searchResult = parsedModels.filter(model =>
                model.make.toLowerCase().includes(value.toLowerCase())
            );
            setResult(searchResult);
        } else {
            // If models not found in local storage, fetch from server
            searchResult = await search(value);
            setResult(searchResult);
        }
    };

    useEffect(() => {
        const fetchMakes = async () => {
            try {
                console.log("FETCHING MAKESSS");
                const response = await fetch('/makes.json'); // Adjust the path as needed
                if (!response.ok) {
                    throw new Error('Failed to fetch makes');
                }
                const makesData = await response.json();
                console.log(makesData);
                // Store makes in local storage
                localStorage.setItem('makes', JSON.stringify(makesData));
            } catch (error) {
                console.error('Error fetching makes from file:', error);
            }
        };
    
        fetchMakes();
    }, []);
    
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await fetch('/cities.json'); // Adjust the path as needed
                if (!response.ok) {
                    throw new Error('Failed to fetch cities');
                }
                const citiesData = await response.json();
                console.log(citiesData);
                // Store cities in local storage
                localStorage.setItem('cities', JSON.stringify(citiesData));
            } catch (error) {
                console.error('Error fetching cities from file:', error);
            }
        };
    
        fetchCities();
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`/inventory/search?keyword=${keyword}`);
    };

    return (
        <form id='search-bar' onSubmit={handleSubmit} className="w-full mx-4">
            <div className="relative flex gap-4 flex-grow">
                <Input
                    tabIndex={2}
                    type="text"
                    placeholder="Search here"
                    className="h-10 bg-card"
                    onChange={handleInputChange}
                    value={keyword}
                    required
                    onFocus={() => setShowResult(true)}
                    onBlur={(e) => {
                        if (!e.relatedTarget || !(e.relatedTarget as HTMLElement).classList.contains('result-link')) {
                            setShowResult(false);
                        }
                    }}
                />
                <button type='submit' className="rounded-xl bg-card flex items-center">
                    <i className="icon m-2 invert dark:invert-0" style={{ backgroundPosition: "-30px -90px" }} />
                </button>

                {
                    showResult && result.length > 0 &&
                    <div tabIndex={3} className="result-link h-screen w-screen right-0 p-2 absolute md:w-full md:h-64 top-full mt-2 bg-background z-10 rounded-xl overflow-y-auto">
                        {
                            result.map((car) => (
                                <div
                                    tabIndex={4}
                                    className='result-link hover:bg-card p-2 px-4 cursor-pointer'
                                    key={car.id}
                                    onClick={() => {
                                        router.push(`/inventory/search?make=${car.make}&model=${car.model}`);
                                        setShowResult(false);
                                    }}
                                >
                                    <h4 className='result-link text-sm opacity-60'>{car.make}</h4>
                                    <h3>{car.model}</h3>
                                    <hr className="dark:opacity-25" />
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
        </form>
    );
}

export default SearchBar;
