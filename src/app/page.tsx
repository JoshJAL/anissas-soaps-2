import { getProductMainImage, getProducts } from '@/actions/prisma';
import TestimonialSlider from '@/components/sliders/ItemCardSlider';
import WhoWeAre from '@/components/WhoWeAre';
import { ItemCard } from '@/types/itemCard';

export default async function Home() {
  const itemCards: ItemCard[] = [];
  const products = await getProducts();

  for (let i = 0; i < products!.length; i++) {
    const prod = products![i];
    const mainImage = await getProductMainImage(prod.id);
    const mainImageObj = mainImage![0];
    const itemCardObj = {
      name: prod.name,
      price: prod.price,
      imgSrc: mainImageObj.url,
      href: `/shop/${prod.id}`
    };
    itemCards.push(itemCardObj);
  }

  return (
    <article className='flex flex-col w-full gap-5'>
      <TestimonialSlider cards={itemCards} />
      <WhoWeAre />
    </article>
  );
}
