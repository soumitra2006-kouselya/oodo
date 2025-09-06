import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Upload, Plus } from "lucide-react";
import { CATEGORIES, Category } from "@/types";
import { useToast } from "@/hooks/use-toast";

export default function NewProduct() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("other");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState<string>("good");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock submission - replace with actual API call
    setTimeout(() => {
      toast({
        title: "Product Listed!",
        description: "Your product has been successfully listed",
      });
      navigate("/my-listings");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Add New Product</CardTitle>
            <CardDescription>
              List your eco-friendly item for sale
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Product Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Product Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Vintage Leather Backpack"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={category}
                  onValueChange={(value) => setCategory(value as Category)}
                  required
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your item in detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  required
                />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price">Price ($) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              {/* Condition */}
              <div className="space-y-2">
                <Label htmlFor="condition">Condition *</Label>
                <Select
                  value={condition}
                  onValueChange={setCondition}
                  required
                >
                  <SelectTrigger id="condition">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="like-new">Like New</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., San Francisco, CA"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              {/* Image Upload Placeholder */}
              <div className="space-y-2">
                <Label>Product Images</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-accent transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm font-medium mb-1">
                    <Plus className="inline h-4 w-4 mr-1" />
                    Add Image (Placeholder)
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Image upload will be available after backend setup
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                variant="eco"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Listing Product..." : "Submit Listing"}
              </Button>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
}
