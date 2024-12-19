// Static data directly in manifest file to avoid import issues
const staticPetData = {
  id: "static-pet-1",
  name: "Pet Memory Blog",
  species: "Dog",
  breed: "Golden Retriever",
  years: "2015 - 2023",
  photo: "/placeholder-pet.jpg",
  stats: {
    memories: 24,
    albums: 3,
    messages: 12
  }
};

function generateManifest(memorial = staticPetData) {
  try {
    // Always use static data for manifest
    return {
      id: staticPetData.id,
      name: staticPetData.name,
      short_name: "Pet Memory",
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#000000",
      icons: [
        {
          src: "/icon.png",
          sizes: "192x192",
          type: "image/png"
        }
      ],
      metadata: {
        createdAt: new Date().toISOString(),
        version: "1.0.0"
      }
    };
  } catch (error) {
    console.error('Manifest Generation Error:', error);
    // Return minimal manifest if there's an error
    return {
      name: "Pet Memory Blog",
      short_name: "Pet Memory",
      start_url: "/",
      display: "standalone"
    };
  }
}

// Export the generated manifest with static data
export default generateManifest(); 