import React, { useEffect, useState } from "react";
import { BASE_URL_CATEGORIES, BASE_URL_PRODUCTS } from "../../dotenv";
import toast from "react-hot-toast";


const API_URLS = {
  CATEGORIES: `${BASE_URL_CATEGORIES}/categories`,
  PRODUCTS: `${BASE_URL_PRODUCTS}/products`,
  SIGNATURE: `${BASE_URL_PRODUCTS}/products/upload/signature`,
  
};

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    product_rating: 4,
    quantity: "",
  });

  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]); // {file, preview, progress, url}
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(API_URLS.CATEGORIES);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file selection
  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    if (images.length + fileArray.length > 10) {
      alert("Maximum 10 images allowed");
      return;
    }

    const validFiles = fileArray.filter((file) => file.type.startsWith("image/"));
    const newImages = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
      url: null,
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  // Drag & drop handlers
  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => setDragActive(false);

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Upload a single image to Cloudinary
  const uploadImage = async (image, index) => {
    // 1️⃣ Get signature from backend
    const sigRes = await fetch(API_URLS.SIGNATURE);
    const sigData = await sigRes.json();

    // 2️⃣ Prepare FormData
    const formDataUpload = new FormData();
    formDataUpload.append("file", image.file);
    formDataUpload.append("api_key", sigData.api_key);
    formDataUpload.append("timestamp", sigData.timestamp);
    formDataUpload.append("signature", sigData.signature);
    formDataUpload.append("folder", "products");

    // 3️⃣ Upload via XMLHttpRequest to track progress
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `https://api.cloudinary.com/v1_1/${sigData.cloud_name}/auto/upload`);
      
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded * 100) / e.total);
          setImages((prev) => {
            const newArr = [...prev];
            newArr[index].progress = percent;
            return newArr;
          });
        }
      });

      xhr.onload = () => {
        if (xhr.status === 200) {
          const res = JSON.parse(xhr.responseText);
          setImages((prev) => {
            const newArr = [...prev];
            newArr[index].url = res.secure_url;
            return newArr;
          });
          resolve(res.secure_url);
        } else {
          reject(new Error("Upload failed"));
        }
      };

      xhr.onerror = () => reject(new Error("Upload failed"));
      xhr.send(formDataUpload);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length < 1) {
      toast.error("At least 1 image is required");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Upload all images sequentially or in parallel
      const uploadPromises = images.map((img, index) => uploadImage(img, index));
      const uploadedUrls = await Promise.all(uploadPromises);

      // 2️⃣ Submit product data with uploaded image URLs
      const { quantity, ...productData } = formData;
      const res = await fetch(API_URLS.PRODUCTS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData ),
      });

      const data = await res.json();
      const resImg = await fetch(`${API_URLS.PRODUCTS}/${data.productId}/images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(uploadedUrls ),
      });
      toast.success("Product added successfully!");

      setFormData({ name: "", description: "", price: "", category: "", quantity: "" });
      setImages([]);
    } catch (err) {
      console.error(err);
      toast.error("Error uploading images");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Add Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            required
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none h-24"
            required
          />

          {/* Price & Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>

          {/* Category */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            required
          >
            <option value="">Select Category</option>
            {categories.map((categorie) => (
              <option key={categorie.id} value={categorie.id}>
                {categorie.category_name}
              </option>
            ))}
          </select>

          {/* Drag & Drop */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`w-full border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${
              dragActive ? "border-indigo-500 bg-indigo-50" : "border-gray-300"
            }`}
          >
            <p className="text-gray-600">Drag & Drop images here or click to upload</p>
            <p className="text-sm text-gray-400 mt-1">(Min 1, Max 10 images)</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFiles(e.target.files)}
              className="hidden"
              id="fileUpload"
            />
            <label
              htmlFor="fileUpload"
              className="inline-block mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700"
            >
              Browse Files
            </label>
          </div>

          {/* Image Previews with Progress */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {images.map((img, index) => (
                <div key={index} className="relative">
                  <img src={img.preview} alt="preview" className="w-full h-24 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
                  >
                    ✕
                  </button>
                  {img.progress > 0 && img.progress < 100 && (
                    <div className="absolute bottom-1 left-1 right-1 h-2 bg-gray-200 rounded">
                      <div
                        className="h-2 bg-green-500 rounded"
                        style={{ width: `${img.progress}%` }}
                      ></div>
                    </div>
                  )}
                  {img.progress === 100 && <p className="text-xs text-green-600 text-center">Uploaded</p>}
                </div>
              ))}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-semibold"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;