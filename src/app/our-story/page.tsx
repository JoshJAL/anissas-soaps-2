export default function Page() {
  return (
    <article className='w-full flex flex-col gap-5 text-center text-xl'>
      <section className='w-full flex flex-col gap-3'>
        <p>
          Welcome to Anissa&apos;s Soap, where we take pride in crafting exceptional 100% organic handmade bars of soap.
          Each bar is meticulously made by Anissa herself, following the traditional Lebanese techniques passed down
          through generations in her family. Anissa&apos;s great grandma, hailing from the beautiful mountains of
          Lebanon, imparted her wisdom, ensuring that every bar carries the essence of heritage and expertise.
        </p>
        <p>
          Our soap is made exclusively from extra virgin olive oil, renowned for its nourishing properties, to provide
          you with a luxurious bathing experience. We carefully select the finest organic ingredients, avoiding any
          harsh chemicals or additives, to deliver a gentle and refreshing cleanse for your skin.
        </p>
        <p>
          Anissa pours her heart into each bar, ensuring attention to detail in every step of the process. From the
          precise blending of ingredients to the hand-cutting and packaging, every bar of soap carries the mark of
          Anissa&apos;s dedication and craftsmanship.
        </p>
      </section>
      <section className='w-full bg-mint flex flex-col p-5 rounded-lg'>
        <p className='flex gap-3'>
          <span className='text-7xl text-red-800'>&quot;</span>
          When you choose Anissa&apos;s Soap, you not only treat your skin to a natural and rejuvenating experience, but
          you also support the preservation of a rich cultural tradition. We invite you to indulge in our beautifully
          handcrafted soaps, meticulously created in the traditional Lebanese style, and discover the authentic essence
          of Anissa&apos;s Soap
          <span className='text-7xl text-red-800'>&quot;</span>
        </p>
      </section>
    </article>
  );
}
