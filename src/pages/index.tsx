import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, ShoppingBag, Users, Shield } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-earth py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Leaf className="h-16 w-16 text-primary animate-pulse" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-forest bg-clip-text text-transparent">
              Welcome to EcoFinds
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover sustainable, pre-loved treasures and give items a second life in our eco-friendly marketplace
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" variant="eco" className="min-w-[200px]">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/products">
                <Button size="lg" variant="outline" className="min-w-[200px]">
                  Browse Products
                  <ShoppingBag className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose EcoFinds?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-accent rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Leaf className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Eco-Friendly</h3>
              <p className="text-muted-foreground">
                Reduce waste and carbon footprint by buying and selling pre-loved items
              </p>
            </div>
            <div className="text-center">
              <div className="bg-accent rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community-Driven</h3>
              <p className="text-muted-foreground">
                Connect with like-minded individuals who care about sustainability
              </p>
            </div>
            <div className="text-center">
              <div className="bg-accent rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure & Simple</h3>
              <p className="text-muted-foreground">
                Easy-to-use platform with secure transactions and user protection
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Your Sustainable Journey Today
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of eco-conscious buyers and sellers
          </p>
          <Link to="/register">
            <Button size="lg" variant="earth" className="min-w-[200px]">
              Sign Up Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
