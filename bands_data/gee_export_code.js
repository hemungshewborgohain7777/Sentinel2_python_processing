//year 2023 median Sentinel 2A (SR) Harmonized data
//collected using Google Earth Engine

Map.addLayer(aoi);

var filtered = s2
  .filter(ee.Filter.date('2023-01-01', '2024-01-01'))
  .filter(ee.Filter.bounds(aoi))
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 1));
  
// Visualization parameters for False Color (NIR, Red, Green)
var visParamsFC = {
  bands: ['B8', 'B4', 'B3'],
  min: 0,
  max: 3000
};

// Visualization parameters for True Color Composite (Red, Green, Blue)
var visParamsTCC = {
  bands: ['B4', 'B3', 'B2'],
  min: 0,
  max: 3000
};
  
var composite = filtered.median().clip(aoi);

// View layers on the map (False Color and True Color)
Map.addLayer(composite, visParamsFC, 'False Color (8-4-3)');
Map.addLayer(composite, visParamsTCC, 'True Color (4-3-2)');

// ==========================================
// EXPORT INDIVIDUAL BANDS (B8, B4, B3, B2)
// ==========================================

// 1. Export Band 8 (NIR)
Export.image.toDrive({
  image: composite.select('B8'),
  description: 'S2_Band8_NIR_2023',
  folder: 'GEE_Exports',
  region: aoi,
  scale: 10,
  maxPixels: 1e13
});

// 2. Export Band 4 (Red)
Export.image.toDrive({
  image: composite.select('B4'),
  description: 'S2_Band4_Red_2023',
  folder: 'GEE_Exports',
  region: aoi,
  scale: 10,
  maxPixels: 1e13
});

// 3. Export Band 3 (Green)
Export.image.toDrive({
  image: composite.select('B3'),
  description: 'S2_Band3_Green_2023',
  folder: 'GEE_Exports',
  region: aoi,
  scale: 10,
  maxPixels: 1e13
});

// 4. Export Band 2 (SWIR) - For TCC
Export.image.toDrive({
  image: composite.select('B11'),
  description: 'S2_Band2_SWIR_2023',
  folder: 'GEE_Exports',
  region: aoi,
  scale: 10,
  maxPixels: 1e13
});
