import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { CartItem } from "@/types";
import { useToast } from "@/hooks/use-toast";

// Mock cart data - replace with actual state management
const MOCK_CART_ITEMS: CartItem[] = [
  {
    id: "1",
    productId: "1",
    product: {
      id: "1",
      userId: "user1",
      title: "Vintage Leather Backpack",
      description: "Beautiful handcrafted leather backpack",
      category: "clothing",
      price: 45.00,
      images: ["/api/placeholder/100/100"],
      condition: "like-new",
      location: "San Francisco, CA",
      createdAt: new Date(),
      updatedAt: new Date(),
      isSold: false,
    },
    quantity: 1,
    addedAt: new Date(),
  },
  {
    id: "2",
    productId: "2",
    product: {
      id: "2",
      userId: "user2",
      title: "Bamboo Kitchen Set",
      description: "Eco-friendly bamboo kitchen utensils",
      category: "home-garden",
      price: 28.50,
      images: ["/api/placeholder/100/100"],
      condition: "new",
      location: "Portland, OR",
      createdAt: new Date(),
      updatedAt: new Date(),
      isSold: false,
    },
    quantity: 2,
    addedAt: new Date(),
  },
];

export default function Cart() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>(MOCK_CART_ITEMS);

  const updateQuantity = (id: string, change: number) => {
    setCartItems(items =>
      items.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart",
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    toast({
      title: "Checkout",
      description: "Checkout functionality requires backend setup",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {cartItems.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-24 h-24 rounded-md overflow-hidden bg-muted flex-shrink-0">
                        {item.product.images[0] ? (
                          <img
                            src={item.product.images[0]}
                            alt={item.product.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingCart className="h-8 w-8 text-muted-foreground opacity-50" />
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between">
                          <h3 className="font-semibold text-lg">
                            {item.product.title}
                          </h3>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{item.product.category}</Badge>
                          <span className="text-sm text-muted-foreground">
                            {item.product.condition}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-12 text-center font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="text-xl font-bold text-primary">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.product.title} x {item.quantity}
                        </span>
                        <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between mb-6">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold text-primary">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>

                  <Button
                    size="lg"
                    variant="eco"
                    className="w-full"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full mt-3"
                    onClick={() => navigate("/products")}
                  >
                    Continue Shopping
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <Card className="p-12 text-center">
            <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h2 className="text-xl font-semibold mb-2">Your Cart is Empty</h2>
            <p className="text-muted-foreground mb-6">
              Start adding eco-friendly products to your cart!
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
