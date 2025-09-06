import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit2, Trash2, Package } from "lucide-react";
import { Product } from "@/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

// Mock data - replace with actual API calls
const MOCK_LISTINGS: Product[] = [
  {
    id: "1",
    userId: "currentUser",
    title: "Handmade Ceramic Mugs Set",
    description: "Set of 4 beautiful handmade ceramic mugs",
    category: "handmade",
    price: 35.00,
    images: ["/api/placeholder/300/300"],
    condition: "new",
    location: "Seattle, WA",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
    isSold: false,
  },
  {
    id: "2",
    userId: "currentUser",
    title: "Vintage Wooden Desk",
    description: "Solid oak desk from the 1960s",
    category: "furniture",
    price: 150.00,
    images: ["/api/placeholder/300/300"],
    condition: "good",
    location: "Seattle, WA",
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-08"),
    isSold: true,
  },
];

export default function MyListings() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [listings, setListings] = useState<Product[]>(MOCK_LISTINGS);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    // Navigate to edit page (to be implemented)
    toast({
      title: "Edit Feature",
      description: "Edit functionality will be available soon",
    });
  };

  const handleDelete = (id: string) => {
    setListings(listings.filter(listing => listing.id !== id));
    toast({
      title: "Listing Deleted",
      description: "Your listing has been removed",
    });
    setDeleteId(null);
  };

  const handleMarkAsSold = (id: string) => {
    setListings(listings.map(listing =>
      listing.id === id ? { ...listing, isSold: !listing.isSold } : listing
    ));
    const listing = listings.find(l => l.id === id);
    toast({
      title: listing?.isSold ? "Marked as Available" : "Marked as Sold",
      description: `${listing?.title} status updated`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Listings</h1>
          <Button
            variant="eco"
            onClick={() => navigate("/products/new")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Product
          </Button>
        </div>

        {listings.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <Card key={listing.id} className="overflow-hidden">
                <div className="aspect-square relative overflow-hidden bg-muted">
                  {listing.images[0] ? (
                    <img
                      src={listing.images[0]}
                      alt={listing.title}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="h-12 w-12 text-muted-foreground opacity-50" />
                    </div>
                  )}
                  {listing.isSold && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                      <Badge variant="secondary" className="text-lg px-4 py-2">
                        SOLD
                      </Badge>
                    </div>
                  )}
                  <Badge className="absolute top-2 right-2 bg-background/90">
                    {listing.category}
                  </Badge>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                    {listing.title}
                  </h3>
                  <p className="text-2xl font-bold text-primary mb-2">
                    ${listing.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Listed on {listing.createdAt.toLocaleDateString()}
                  </p>
                </CardContent>

                <CardFooter className="p-4 pt-0 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleEdit(listing.id)}
                  >
                    <Edit2 className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleMarkAsSold(listing.id)}
                  >
                    {listing.isSold ? "Unmark Sold" : "Mark Sold"}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setDeleteId(listing.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h2 className="text-xl font-semibold mb-2">No Listings Yet</h2>
            <p className="text-muted-foreground mb-6">
              Start selling your eco-friendly items today!
            </p>
            <Button
              variant="eco"
              onClick={() => navigate("/products/new")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Listing
            </Button>
          </Card>
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Listing</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this listing? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteId && handleDelete(deleteId)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
