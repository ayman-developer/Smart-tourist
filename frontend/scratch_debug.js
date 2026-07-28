async function test() {
  const query = `
    [out:json];
    (
      node["amenity"="fuel"](around:2000,10.957,76.945);
      way["amenity"="fuel"](around:2000,10.957,76.945);
    );
    out center;
  `;
  try {
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: query
    });
    const data = await response.json();
    console.log(JSON.stringify(data.elements.map(e => ({ id: e.id, tags: e.tags })), null, 2));
  } catch (e) {
    console.error(e);
  }
}
test();
