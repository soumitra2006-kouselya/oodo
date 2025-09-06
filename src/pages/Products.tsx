import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProductCard from "@/components/products/ProductCard";
import { Product, Category, CATEGORIES } from "@/types";
import { Search, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data - replace with actual API calls
const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    userId: "user1",
    title: "Vintage Leather Backpack",
    description: "Beautiful handcrafted leather backpack in excellent condition",
    category: "clothing",
    price: 45.00,
    images: ["/api/placeholder/400/400"],
    condition: "like-new",
    location: "San Francisco, CA",
    createdAt: new Date(),
    updatedAt: new Date(),
    isSold: false,
  },
  {
    id: "2",
    userId: "user2",
    title: "Bamboo Kitchen Set",
    description: "Eco-friendly bamboo kitchen utensils, never used",
    category: "home-garden",
    price: 28.50,
    images: ["/api/placeholder/400/400"],
    condition: "new",
    location: "Portland, OR",
    createdAt: new Date(),
    updatedAt: new Date(),
    isSold: false,
  },
  {
    id: "3",
    userId: "user3",
    title: "Organic Cotton Tote Bags (Set of 5)",
    description: "Reusable organic cotton bags, perfect for shopping",
    category: "handmade",
    price: 15.00,
    images: ["/api/placeholder/400/400"],
    condition: "new",
    location: "Austin, TX",
    createdAt: new Date(),
    updatedAt: new Date(),
    isSold: false,
  },
];

export default function Products() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const search = searchParams.get("search") || "";
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  useEffect(() => {
    let filtered = products;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

  const handleAddToCart = (product: Product) => {
    toast({
      title: "Added to Cart",
      description: `${product.title} has been added to your cart`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Browse Products</h1>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select
              value={selectedCategory}
              onValueChange={(value) => setSelectedCategory(value as Category | "all")}
            >
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-muted-foreground mb-6">
          {filteredProducts.length} products found
        </p>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">
              No products found matching your criteria
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
