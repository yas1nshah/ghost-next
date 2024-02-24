const categories = [
    {
      name: "Categories",
      subcategories: [
        {
          "name": "Low Budget Cars",
          "link": "/search?priceTo=1000000",
          "image":null
        },
        
      ]
    },
    {
      name: "City",
      subcategories: [
        {
          "name": "Lahore",
          "link": "/search?location=Lahore",
          "image":null
        },
        {
          "name": "Islamabad",
          "link": "/search?location=Islamabad",
          "image":null
        },
      ]
    },
    {
      name: "Make",
      subcategories: [
        {
          "name": "Toyota",
          "link": "/search?make=Toyota",
          "image": null
        },
        {
          "name": "Suzuki",
          "link": "/search?make=Suzuki",
          "image": null
        },
        {
          "name": "Honda",
          "link": "/search?make=Honda",
          "image": null
        },
        {
          "name": "Daihatsu",
          "link": "/search?make=Daihatsu",
          "image": null
        },
        {
          "name": "Kia",
          "link": "/search?make=Kia",
          "image": null
        },
        {
          "name": "Hyundai",
          "link": "/search?make=Hyundai",
          "image": null
        },
        {
          "name": "Mitsubishi",
          "link": "/search?make=Mitsubishi",
          "image": null
        },
        {
          "name": "Changan",
          "link": "/search?make=Changan",
          "image": null
        },
        {
          "name": "Mercedes Benz",
          "link": "/search?make=Mercedes%20Benz",
          "image": null
        },
        {
          "name": "MG",
          "link": "/search?make=MG",
          "image": null
        },
        {
          "name": "Proton",
          "link": "/search?make=Proton",
          "image": null
        },
        {
          "name": "BMW",
          "link": "/search?make=BMW",
          "image": null
        },
        {
          "name": "FAW",
          "link": "/search?make=FAW",
          "image": null
        },
        {
          "name": "DFSK",
          "link": "/search?make=DFSK",
          "image": null
        },
        {
          "name": "Haval",
          "link": "/search?make=Haval",
          "image": null
        },
        {
          "name": "Peugeot",
          "link": "/search?make=Peugeot",
          "image": null
        },
        {
          "name": "Prince",
          "link": "/search?make=Prince",
          "image": null
        },
        {
          "name": "Lexus",
          "link": "/search?make=Lexus",
          "image": null
        },
        {
          "name": "Chery",
          "link": "/search?make=Chery",
          "image": null
        },
        {
          "name": "Chevrolet",
          "link": "/search?make=Chevrolet",
          "image": null
        }
      ]
    },
    {
      name: "Model",
      subcategories: [
        {
          "name": "Corolla",
          "link": "/search?model=Corolla",
          "image": null
        },
        {
          "name": "Civic",
          "link": "/search?model=Civic",
          "image": null
        },
        {
          "name": "City",
          "link": "/search?model=City",
          "image": null
        },
        {
          "name": "Alto",
          "link": "/search?model=Alto",
          "image": null
        },
        {
          "name": "Mehran",
          "link": "/search?model=Mehran",
          "image": null
        },
        {
          "name": "Cultus",
          "link": "/search?model=Cultus",
          "image": null
        },
        {
          "name": "Wagon R",
          "link": "/search?model=Wagon%20R",
          "image": null
        },
        {
          "name": "Vitz",
          "link": "/search?model=Vitz",
          "image": null
        },
        {
          "name": "Swift",
          "link": "/search?model=Swift",
          "image": null
        },
        {
          "name": "Prado",
          "link": "/search?model=Prado",
          "image": null
        },
        {
          "name": "Hilux",
          "link": "/search?model=Hilux",
          "image": null
        },
        {
          "name": "Mira",
          "link": "/search?model=Mira",
          "image": null
        },
        {
          "name": "Yaris",
          "link": "/search?model=Yaris",
          "image": null
        },
        {
          "name": "Vezel",
          "link": "/search?model=Vezel",
          "image": null
        },
        {
          "name": "Sportage",
          "link": "/search?model=Sportage",
          "image": null
        },
        {
          "name": "Passo",
          "link": "/search?model=Passo",
          "image": null
        },
        {
          "name": "Land Cruiser",
          "link": "/search?model=Land%20Cruiser",
          "image": null
        },
        {
          "name": "Aqua",
          "link": "/search?model=Aqua",
          "image": null
        },
        {
          "name": "Prius",
          "link": "/search?model=Prius",
          "image": null
        },
        {
          "name": "Bolan",
          "link": "/search?model=Bolan",
          "image": null
        },
        {
          "name": "Fortuner",
          "link": "/search?model=Fortuner",
          "image": null
        },
        {
          "name": "BR-V",
          "link": "/search?model=BR-V",
          "image": null
        },
        {
          "name": "Coure",
          "link": "/search?model=Coure",
          "image": null
        },
        {
          "name": "Dayz",
          "link": "/search?model=Dayz",
          "image": null
        },
        {
          "name": "Every",
          "link": "/search?model=Every",
          "image": null
        },
        {
          "name": "Tucson",
          "link": "/search?model=Tucson",
          "image": null
        },
        {
          "name": "C-HR",
          "link": "/search?model=C-HR",
          "image": null
        }
      ]
    },
    {
      name: "Budget",
      subcategories: [
        {
          "name": "under 5 Lakh",
          "link": "/search?priceFrom=0&priceTo=500000",
          "image": null
        },
        {
          "name": "5-10 Lakh",
          "link": "/search?priceFrom=500000&priceTo=1000000",
          "image": null
        },
        {
          "name": "10-20 Lakh",
          "link": "/search?priceFrom=1000000&priceTo=2000000",
          "image": null
        },
        {
          "name": "20-30 Lakh",
          "link": "/search?priceFrom=2000000&priceTo=3000000",
          "image": null
        },
        {
          "name": "30-40 Lakh",
          "link": "/search?priceFrom=3000000&priceTo=4000000",
          "image": null
        },
        {
          "name": "40-50 Lakh",
          "link": "/search?priceFrom=4000000&priceTo=5000000",
          "image": null
        },
        {
          "name": "50-60 Lakh",
          "link": "/search?priceFrom=5000000&priceTo=6000000",
          "image": null
        },
        {
          "name": "60-80 Lakh",
          "link": "/search?priceFrom=6000000&priceTo=8000000",
          "image": null
        },
        {
          "name": "80 Lakh - 1 Crore",
          "link": "/search?priceFrom=8000000&priceTo=10000000",
          "image": null
        },
        {
          "name": "1-1.5 Crore",
          "link": "/search?priceFrom=10000000&priceTo=15000000",
          "image": null
        },
        {
          "name": "1.5-2 Crore",
          "link": "/search?priceFrom=15000000&priceTo=20000000",
          "image": null
        },
        {
          "name": "over 2 Crore",
          "link": "/search?priceFrom=20000000",
          "image": null
        }
      ]
    },
    {
      name: "Body Type",
      subcategories: [
        {
          name: "Pick Up",
          link: "/search?bodyType=Pick%20Up",
          image: null
        },
        {
          name: "Hatchback",
          link: "/search?bodyType=Hatchback",
          image: null
        },
        {
          name: "Truck",
          link: "/search?bodyType=Truck",
          image: null
        },
        {
          name: "Sedan",
          link: "/search?bodyType=Sedan",
          image: null
        },
        {
          name: "SUV",
          link: "/search?bodyType=SUV",
          image: null
        },
        {
          name: "Coupe",
          link: "/search?bodyType=Coupe",
          image: null
        },
        {
          name: "Crossover",
          link: "/search?bodyType=Crossover",
          image: null
        },
        {
          name: "Convertible",
          link: "/search?bodyType=Convertible",
          image: null
        },
        {
          name: "Micro Van",
          link: "/search?bodyType=Micro%20Van",
          image: null
        },
        {
          name: "MPV",
          link: "/search?bodyType=MPV",
          image: null
        },
        {
          name: "Mini Van",
          link: "/search?bodyType=Mini%20Van",
          image: null
        },
        {
          name: "Station Wagon",
          link: "/search?bodyType=Station%20Wagon",
          image: null
        },
        {
          name: "Van",
          link: "/search?bodyType=Van",
          image: null
        },
        {
          name: "Double Cabin",
          link: "/search?bodyType=Double%20Cabin",
          image: null
        },
        {
          name: "High Van",
          link: "/search?bodyType=High%20Van",
          image: null
        },
        {
          name: "High Roof",
          link: "/search?bodyType=High%20Roof",
          image: null
        },
        {
          name: "Off-Road Vehicles",
          link: "/search?bodyType=Off-Road%20Vehicles",
          image: null
        },
        {
          name: "Single Cabin",
          link: "/search?bodyType=Single%20Cabin",
          image: null
        },
        {
          name: "Mini Vehicles",
          link: "/search?bodyType=Mini%20Vehicles",
          image: null
        },
        {
          name: "Station Wagom",
          link: "/search?bodyType=Station%20Wagom",
          image: null
        }
      ]
    }
  ];
export default categories