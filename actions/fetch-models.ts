'use server'
import models from "@/static-files/models";
import cities from "@/static-files/cities";

export async function search(keyword: string) {
  // Filter models based on the keyword in their title
  const filteredModels:any = models.filter((model) =>
    model.title.toLowerCase().includes(keyword.toLowerCase())
  );

  // Return the first 10 matches
  const first10Matches = filteredModels.slice(0, 10);
  console.log("server")
  return first10Matches;
}

// export async function searchCities(keyword) {
//   // Filter models based on the keyword in their title
//   const filteredCities = cities.filter((city) =>
//     city.name.toLowerCase().includes(keyword.toLowerCase())
//   );

//   // Return the first 10 matches
//   const first10Matches = filteredCities.slice(0, 10);

//   return first10Matches;
// }

