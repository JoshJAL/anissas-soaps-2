import { getProductById, getProductImages } from '@/actions/prisma';
import AddToCart from '@/components/AddToCart';
import ImageSlider from '@/components/sliders/ImageSlider';
import { Oleo_Script_Swash_Caps } from 'next/font/google';

const oleo = Oleo_Script_Swash_Caps({ weight: '400', subsets: ['latin'] });

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const product = await getProductById(id);
  let images = await getProductImages(id);

  if (!product) return <h1 className='w-full text-center text-3xl font-medium'>Product Not Found</h1>;

  console.log(product);
  console.log('images: ', images);

  images = [...images!].sort((a, b) => (a.main === b.main ? 0 : a.main ? -1 : 1));

  return (
    <div className='w-full grid grid-cols-2 gap-5 text-xl'>
      {images!.length > 1 ? (
        <div className='max-w-[1200px] w-full h-full'>
          <ImageSlider images={images!} autoScroll scrollInterval={6000} />
        </div>
      ) : (
        <div className='max-w-[1200px] w-full h-full'>
          <img
            className='rounded-lg shadow-md'
            src={images![0] ? images![0].url : 'https://utfs.io/f/5949d433-c728-4f03-aeb1-c6e6ac78d848-zcqhcp.webp'}
            alt={product?.name}
          />
        </div>
      )}
      <div className='flex flex-col gap-3'>
        <h1 className={`font-medium text-3xl ${oleo.className}`}>{product.name}</h1>
        <AddToCart product={product} />
      </div>
    </div>
  );
}
