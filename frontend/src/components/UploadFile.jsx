"use client";

import { useState } from "react";
import { Upload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UploadFile() {
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
  });
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Elegant Striped Flutter Sleeve Overlap Collar Fashion Mini Blouse",
      image: "/placeholder.svg",
      price: 20,
    },
    // Add more products as needed
  ]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = { ...formData, image: imagePreview, id: products.length + 1 };
    setProducts([...products, newProduct]);
    setFormData({ name: "", description: "", category: "", price: "" });
    setImagePreview(null);  // Reset image preview after submit
  };

  const handleDelete = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-orange-500">SavvyShop.</h1>
            <span className="text-sm text-gray-500">Admin panel</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
            <img
              src="/placeholder.svg"
              alt="Admin avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Upload Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6">PRODUCTS UPLOAD</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Upload Image</Label>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8">
                <div className="flex flex-col items-center justify-center gap-2">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-w-[200px] max-h-[200px] object-contain"
                    />
                  ) : (
                    <Upload className="w-12 h-12 text-gray-400" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <Label
                    htmlFor="image-upload"
                    className="text-sm text-gray-500 cursor-pointer hover:text-gray-700"
                  >
                    {imagePreview ? "Change Image" : "Upload Image"}
                  </Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Product name</Label>
              <Input
                id="name"
                placeholder="Type here..."
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Product description</Label>
              <Textarea
                id="description"
                placeholder="Write content here..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={6}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Product category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="women">Women</SelectItem>
                    <SelectItem value="men">Men</SelectItem>
                    <SelectItem value="kids">Kids</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Product price</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="$20"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700">
              Add Product
            </Button>
          </form>
        </div>

        {/* Product List */}
        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <h2 className="text-xl font-semibold mb-6">PRODUCTS LIST</h2>
          <div className="space-y-4">
            {/* Header */}
            <div className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 px-4 py-2 bg-gray-50 rounded-lg">
              <div className="font-medium text-sm text-gray-500">Products</div>
              <div className="font-medium text-sm text-gray-500">Title</div>
              <div className="font-medium text-sm text-gray-500">Price</div>
              <div className="font-medium text-sm text-gray-500">Remove</div>
            </div>

            {/* Product List */}
            {products.map((product) => (
              <div
                key={product.id}
                className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 px-4 py-2 hover:bg-gray-50 rounded-lg"
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-sm font-medium">{product.title}</div>
                <div className="text-sm">${product.price}</div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(product.id)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="sr-only">Delete product</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
