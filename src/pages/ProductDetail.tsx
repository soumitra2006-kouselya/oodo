import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Heart, MapPin, Calendar, Package, ArrowLeft } from "lucide-react";
import { Product } from "@/types";
import { useToast } from "@/hooks/use-toast";

// Mock data - replace with actual API call
const MOCK_PRODUCT: Product = {
  id: "1",
  userId: "user1",
  title: "Vintage Leather Backpack",
  description: "This beautiful handcrafted leather backpack is in excellent condition. Perfect for daily use or weekend adventures. Features multiple compartments, padded laptop sleeve, and adjustable straps. Made from genuine leather that ages beautifully over time. Smoke-free home.",
  category: "clothing",
  price: 45.00,
  images: ["/api/placeholder/600/600"],
  condition: "like-new",
  location: "San Francisco, CA",
  createdAt: new Date("2024-01-15"),
  updatedAt: new Date("2024-01-15"),
  isSold: false,
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);

  // In a real app, fetch product by id
  const product = MOCK_PRODUCT;

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${product.title} has been added to your cart`,
    });
  };

  const handleContactSeller = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Messaging feature will be available soon",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
              {product.images[selectedImage] ? (
                <img
                  src={product.images[selectedImage]}
                  alt={product.title}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Package className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>No image available</p>
                  </div>
                </div>
              )}
              {product.isSold && (
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                  <Badge variant="secondary" className="text-2xl px-6 py-3">
                    SOLD
                  </Badge>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                      selectedImage === index ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-3">{product.category}</Badge>
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              <p className="text-4xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </p>
            </div>

            {/* Condition & Location */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Condition:</span>
                <Badge variant="outline">{product.condition}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Location:</span>
                <span>{product.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Listed:</span>
                <span>{product.createdAt.toLocaleDateString()}</span>
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="font-semibold mb-3">Description</h2>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {product.description}
                </p>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                size="lg"
                variant="eco"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={product.isSold}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleContactSeller}
                disabled={product.isSold}
              >
                Contact Seller
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Seller Information */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="font-semibold mb-3">Seller Information</h2>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-lg font-semibold">JD</span>
                    </div>
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-muted-foreground">Member since 2023</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
