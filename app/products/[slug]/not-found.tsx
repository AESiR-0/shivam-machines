import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { ArrowLeft } from "lucide-react";

export default function ProductNotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-brand-lightGray">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="bg-white rounded-lg shadow-lg p-8 lg:p-12">
          <h1 className="text-6xl font-bold text-brand-darkBlue mb-4 font-candara">404</h1>
          <h2 className="text-3xl font-bold text-brand-darkBlue mb-4 font-candara">
            Product Not Found
          </h2>
          <p className="text-brand-gray mb-8 font-nunito text-lg">
            Sorry, we couldn't find the product you're looking for. It may have been removed or the
            URL might be incorrect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" className="flex items-center gap-2" asChild>
              <Link href="/products">
                <ArrowLeft className="w-5 h-5" />
                Browse All Products
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/">Go to Homepage</Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

