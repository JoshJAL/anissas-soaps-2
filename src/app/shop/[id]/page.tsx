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
  const mainImage = images?.find((image) => image.main === true);

  images = [...images!].sort((a, b) => (a.main === b.main ? 0 : a.main ? -1 : 1));

  return (
    <div className='grid w-full grid-cols-2 gap-5 text-xl'>
      {images!.length > 1 ? (
        <div className='h-full w-full max-w-[1200px]'>
          <ImageSlider images={images!} autoScroll scrollInterval={6000} />
        </div>
      ) : (
        <div className='h-full w-full max-w-[1200px]'>
          <img
            className='rounded-lg shadow-md'
            src={images![0] ? images![0].url : 'https://utfs.io/f/5949d433-c728-4f03-aeb1-c6e6ac78d848-zcqhcp.webp'}
            alt={product?.name}
          />
        </div>
      )}
      <div className='flex flex-col gap-3'>
        <h1 className={`text-3xl font-medium ${oleo.className}`}>{product.name}</h1>
        <AddToCart mainImage={mainImage!.url} product={product} />
      </div>
    </div>
  );
}
