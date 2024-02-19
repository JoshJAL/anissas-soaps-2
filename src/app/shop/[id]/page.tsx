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

  const mainImage = images?.find((image) => image.main === true);

  images = [...images!].sort((a, b) => (a.main === b.main ? 0 : a.main ? -1 : 1));

  return (
    <div className='grid w-full gap-5 text-xl md:grid-cols-2'>
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
        <p className='text-xl text-gray-600'>
          <span className='font-bold underline underline-offset-4'>NOTICE:</span> All products are handmade, slight
          differences/defects between items and images is to be expected! Every item is unique and made with love!
        </p>
        <p className='text-xl text-gray-600'>
          All of Anissa&apos;s soaps are made with the same three ingredients (extra virgin olive oil, lye, and water)
          every time, the only thing that changes is the scent or herbs you choose!
        </p>
        <AddToCart mainImage={mainImage!.url} product={product} />
      </div>
    </div>
  );
}
