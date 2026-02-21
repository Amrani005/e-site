import { db } from "@/lib/db";
import ProductsList from "@/components/ProductsList"; // Import the client component

export default async function ProductsPage() {
  // 1. Fetch data on the server
  const products = await db.product.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="relative min-h-screen w-full p-8 overflow-hidden bg-[#0f172a]">
       
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10">
        <ProductsList products={products} />
      </div>
      
    </div>
  );
}