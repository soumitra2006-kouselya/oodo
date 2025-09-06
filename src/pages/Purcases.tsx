import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Calendar, Package, ArrowRight } from "lucide-react";
import { Purchase } from "@/types";

// Mock purchase data - replace with actual API calls
const MOCK_PURCHASES: Purchase[] = [
  {
    id: "1",
    userId: "currentUser",
    products: [
      {
        id: "p1",
        userId: "seller1",
        title: "Recycled Paper Notebooks Set",
        description: "Set of 5 eco-friendly notebooks",
        category: "books",
        price: 25.00,
        images: ["/api/placeholder/100/100"],
        condition: "new",
        location: "Boston, MA",
        createdAt: new Date(),
        updatedAt: new Date(),
        isSold: true,
      },
      {
        id: "p2",
        userId: "seller2",
        title: "Organic Cotton T-Shirt",
        description: "100% organic cotton t-shirt",
        category: "clothing",
        price: 18.00,
        images: ["/api/placeholder/100/100"],
        condition: "new",
        location: "Denver, CO",
        createdAt: new Date(),
        updatedAt: new Date(),
        isSold: true,
      },
    ],
    totalAmount: 43.00,
    purchaseDate: new Date("2024-01-20"),
    status: "completed",
  },
  {
    id: "2",
    userId: "currentUser",
    products: [
      {
        id: "p3",
        userId: "seller3",
        title: "Bamboo Cutlery Set",
        description: "Reusable bamboo cutlery",
        category: "home-garden",
        price: 15.00,
        images: ["/api/placeholder/100/100"],
        condition: "new",
        location: "Portland, OR",
        createdAt: new Date(),
        updatedAt: new Date(),
        isSold: true,
      },
    ],
    totalAmount: 15.00,
    purchaseDate: new Date("2024-01-15"),
    status: "completed",
  },
];

export default function Purchases() {
  const navigate = useNavigate();
  const [purchases] = useState<Purchase[]>(MOCK_PURCHASES);

  const getStatusColor = (status: Purchase["status"]) => {
    switch (status) {
      case "completed":
        return "default";
      case "pending":
        return "secondary";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Purchase History</h1>

        {purchases.length > 0 ? (
          <div className="space-y-6">
            {purchases.map((purchase) => (
              <Card key={purchase.id}>
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        Order #{purchase.id}
                      </CardTitle>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {purchase.purchaseDate.toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Package className="h-4 w-4" />
                          {purchase.products.length} item{purchase.products.length > 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                    <Badge variant={getStatusColor(purchase.status)}>
                      {purchase.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {purchase.products.map((product) => (
                    <div
                      key={product.id}
                      className="flex gap-4 p-3 rounded-lg bg-muted/50"
                    >
                      {/* Product Image */}
                      <div className="w-20 h-20 rounded-md overflow-hidden bg-background flex-shrink-0">
                        {product.images[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="h-6 w-6 text-muted-foreground opacity-50" />
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h4 className="font-semibold">{product.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {product.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {product.category}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {product.condition}
                          </span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="font-semibold text-lg">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Order Total */}
                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="font-semibold">Order Total</span>
                    <span className="text-xl font-bold text-primary">
                      ${purchase.totalAmount.toFixed(2)}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <Button variant="outline" className="flex-1">
                      View Details
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Track Order
                    </Button>
                    {purchase.status === "completed" && (
                      <Button variant="outline" className="flex-1">
                        Leave Review
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h2 className="text-xl font-semibold mb-2">No Purchases Yet</h2>
            <p className="text-muted-foreground mb-6">
              Start shopping for eco-friendly products!
            </p>
            <Button
              variant="eco"
              onClick={() => navigate("/products")}
            >
              Browse Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
