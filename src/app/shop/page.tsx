export const dynamic = 'force-dynamic';
import { getProductMainImage, getProducts } from '@/actions/prisma';
import ProductCard from '@/components/ProductCard';

export default async function Page() {
  const products = await getProducts();
  const items = [];

  for (let i = 0; i < products!.length; i++) {
    const prod = products![i];
    const mainImage = await getProductMainImage(prod.id);
    const mainImageObj = mainImage![0];
    const itemObj = {
      id: prod.id,
      name: prod.name,
      price: prod.price,
      imgSrc: mainImageObj.url,
      href: `/shop/${prod.id}`
    };
    items.push(itemObj);
  }

  return (
    <div className='grid md:grid-cols-2 gap-5'>
      {items.map((item) => {
        return <ProductCard price={item.price} href={item.href} key={item.id} name={item.name} imgSrc={item.imgSrc} />;
      })}
    </div>
  );
}
