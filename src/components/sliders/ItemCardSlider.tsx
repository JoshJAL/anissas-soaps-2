'use client';

import type { ItemCard } from '@/types/itemCard';
import { createDollarAmount } from '@/utils/createDollarAmount';
import { Oleo_Script_Swash_Caps } from 'next/font/google';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, type TouchEvent } from 'react';
import { LuArrowBigLeft, LuArrowBigRight } from 'react-icons/lu';
import { TbCircleDot } from 'react-icons/tb';
import './itemCardSlider.css';

const oleo = Oleo_Script_Swash_Caps({ weight: '400', subsets: ['latin'] });

type Props = {
  cards: ItemCard[];
  autoScroll?: boolean;
  scrollInterval?: number;
};

export default function ItemCardSlider({ cards, autoScroll = true, scrollInterval = 10000 }: Props) {
  const [imageIndex, setImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;
  const timerRef = useRef<any | null>(null);

  const showNextImage = useCallback(() => {
    setImageIndex((index) => {
      if (index === cards.length - 1) return 0;
      return index + 1;
    });
  }, [cards.length]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      showNextImage();
    }, scrollInterval);
  }, [scrollInterval, showNextImage]);

  useEffect(() => {
    if (autoScroll) {
      resetTimer();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [autoScroll, resetTimer]);

  useEffect(() => {
    if (autoScroll) {
      resetTimer();
    }
  }, [imageIndex, autoScroll, resetTimer]);

  const onTouchStart = (e: TouchEvent<HTMLDivElement | HTMLAnchorElement>) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent<HTMLDivElement | HTMLAnchorElement>) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      showNextImage();
    }
    if (isRightSwipe) {
      showPrevImage();
    }
    resetTimer();
  };

  function showPrevImage() {
    setImageIndex((index) => {
      if (index === 0) return cards.length - 1;
      return index - 1;
    });
  }
  return (
    <section
      aria-label='Image Slider'
      style={{ width: '100%', height: '100%', position: 'relative' }}
      className='rounded-md overflow-hidden'
    >
      <Link href='#after-image-slider-controls' className='skip-link'>
        Skip Image Slider Controls
      </Link>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          overflow: 'hidden'
        }}
      >
        {cards.map((card, index) => (
          <Link
            href={card.href}
            key={index + 'card-with-link'}
            aria-hidden={imageIndex !== index}
            style={{ translate: `${-100 * imageIndex}%` }}
            onTouchStart={(e) => onTouchStart(e)}
            onTouchMove={(e) => onTouchMove(e)}
            onTouchEnd={onTouchEnd}
            className='img-slider-img group'
          >
            <div className='text-black w-full flex flex-col text-center items-center justify-center gap-3 mt-3 mb-9 mx-auto'>
              <div className=' w-full flex flex-col text-center items-center justify-center gap-3 max-w-[80%] relatiive'>
                <p className='text-red-800 group-hover:opacity-100 md:opacity-0 transition-all duration-200 ease-in-out absolute bottom-20 bg-mint hover:bg-mint/75 px-2 py-1 rounded-lg font-semibold'>
                  Shop Now
                </p>
                <p className={`text-2xl font-bold ${oleo.className}`} dangerouslySetInnerHTML={{ __html: card.name }} />
                <p className='text-xl font-bold'>{createDollarAmount(card.price)}</p>
                <img
                  loading='eager'
                  src={card.imgSrc}
                  alt={card.name}
                  className='w-full h-auto md:w-auto md:h-[600px] rounded-lg'
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
      <button
        onClick={showPrevImage}
        className='img-slider-btn group'
        style={{ left: 0, borderRadius: '6px 0 0 6px' }}
        aria-label='View Previous Image'
      >
        <LuArrowBigLeft aria-hidden className='group-hover:stroke-mint transition-all duration-200 ease-in-out' />
      </button>
      <button
        onClick={showNextImage}
        className='img-slider-btn group'
        style={{ right: 0, borderRadius: '0 6px 6px 0' }}
        aria-label='View Next Image'
      >
        <LuArrowBigRight aria-hidden className='group-hover:stroke-mint transition-all duration-200 ease-in-out' />
      </button>
      <div
        style={{
          position: 'absolute',
          bottom: '.5rem',
          left: '50%',
          translate: '-50%',
          display: 'flex',
          gap: '.25rem'
        }}
      >
        {cards.map((_, index) => (
          <button
            key={index + '-button-dot'}
            className='img-slider-dot-btn'
            aria-label={`View Image ${index + 1}`}
            onClick={() => setImageIndex(index)}
          >
            <TbCircleDot
              aria-hidden
              className={`${index == imageIndex ? 'scale-150' : ''} transition-all duration-200 ease-in-out`}
              style={{ stroke: index === imageIndex ? '#991b1b' : '' }}
            />
          </button>
        ))}
      </div>
      <div id='after-image-slider-controls' />
    </section>
  );
}
