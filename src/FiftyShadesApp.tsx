import React, { useState, ChangeEvent, useMemo } from 'react';

// Function to generate 50 unique CSS filter strings for image variations.
// This function creates a diverse set of filters by systematically varying
// brightness, contrast, saturation, hue rotation, and combining effects.
const generateFiftyFilters = (): string[] => {
  const filters: string[] = [];

  // Set 1: Brightness variations
  // Ranges from 50% to 140% brightness.
  for (let i = 0; i < 10; i++) {
    const value = 0.5 + i * 0.1; // 0.5, 0.6, ..., 1.4
    filters.push(`brightness(${value.toFixed(2)})`);
  }

  // Set 2: Contrast variations
  // Ranges from 50% to 140% contrast.
  for (let i = 0; i < 10; i++) {
    const value = 0.5 + i * 0.1; // 0.5, 0.6, ..., 1.4
    filters.push(`contrast(${value.toFixed(2)})`);
  }

  // Set 3: Saturation variations
  // Ranges from 20% to 194% saturation.
  for (let i = 0; i < 10; i++) {
    const value = 0.2 + i * 0.18; // 0.20, 0.38, ..., 1.94
    filters.push(`saturate(${value.toFixed(2)})`);
  }

  // Set 4: Hue-rotate variations
  // Rotates hue from 0 to 324 degrees in 36-degree steps.
  for (let i = 0; i < 10; i++) {
    const value = i * 36; // 0, 36, ..., 324
    filters.push(`hue-rotate(${value}deg)`);
  }

  // Set 5: Combinations and distinct effects
  // A collection of common and unique filter combinations.
  filters.push('grayscale(100%)');
  filters.push('sepia(100%)');
  filters.push('invert(100%)');
  filters.push('blur(2px)');
  filters.push('opacity(0.7)');
  filters.push('brightness(1.2) contrast(0.8)');
  filters.push('hue-rotate(90deg) saturate(1.5)');
  filters.push('sepia(50%) brightness(1.1) contrast(1.1)');
  filters.push('grayscale(50%) contrast(1.2) saturate(0.8)');
  filters.push('saturate(0) brightness(0.8) contrast(1.5)'); // Black & white with adjusted brightness/contrast

  // Ensure exactly 50 filters are returned, though the generation logic already produces 50.
  return filters.slice(0, 50);
};

const FiftyShadesApp: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  // Memoize the filter array to ensure it's generated only once and doesn't
  // cause unnecessary re-renders of the filter gallery.
  const filters = useMemo(() => generateFiftyFilters(), []);

  // Handles the file input change event. Reads the selected image file
  // and sets its Data URL to the `selectedImage` state.
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null); // Clear image if no file is selected
    }
  };

  // Clears the currently selected image, resetting the application state.
  const clearImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-10 my-8">

        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-blue-700 mb-8">
          Image "50 Shades" Generator
        </h1>

        {/* Image Upload Section */}
        <div className="mb-8 p-6 border-2 border-dashed border-blue-300 rounded-lg text-center bg-blue-50">
          <label htmlFor="image-upload" className="block text-lg font-medium text-blue-700 mb-4 cursor-pointer">
            Upload Your Image
          </label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-100 file:text-blue-700
                       hover:file:bg-blue-200 cursor-pointer"
          />
          {selectedImage && (
            <button
              onClick={clearImage}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
            >
              Clear Image
            </button>
          )}
        </div>

        {selectedImage ? (
          /* Display Original Image and Variations if an image is selected */
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Original Image
            </h2>
            <div className="flex justify-center mb-10">
              <img
                src={selectedImage}
                alt="Original"
                className="max-w-full h-auto max-h-96 object-contain rounded-lg shadow-md border border-gray-200"
              />
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              50 Shades Variations
            </h2>
            {/* Grid for displaying image variations */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filters.map((filterString, index) => (
                <div
                  key={index}
                  className="relative group overflow-hidden rounded-lg shadow-md bg-gray-100 border border-gray-200
                             transition-all duration-300 hover:shadow-xl hover:scale-105"
                >
                  <img
                    src={selectedImage}
                    alt={`Variation ${index + 1}`}
                    style={{ filter: filterString }} // Apply the CSS filter here
                    className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="p-3 bg-white border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-700 truncate">
                      {`Shade ${index + 1}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Placeholder display when no image is selected */
          <div className="flex flex-col items-center justify-center p-12 bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl min-h-64">
            <svg
              className="w-16 h-16 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            <p className="text-gray-600 text-lg">
              Please upload an image to see its 50 variations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FiftyShadesApp;
