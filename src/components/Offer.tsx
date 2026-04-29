import React from 'react';
import OfferCard from './OfferCard';
import Reveal, { RevealStagger } from './Reveal';

export default function Offer({
  sectionTitle,
  card1Title,
  card1Content,
  card2Title,
  card2Content,
  card3Title,
  card3Content,
  back1Title,
  back1Content,
  back2Title,
  back2Content,
  back3Title,
  back3Content,
  readMore,
}: {
  sectionTitle: string;
  card1Title: string;
  card1Content: string;
  card2Title: string;
  card2Content: string;
  card3Title: string;
  card3Content: string;
  back1Title: string;
  back1Content: string;
  back2Title: string;
  back2Content: string;
  back3Title: string;
  back3Content: string;
  readMore: string;
}) {
  return (
    <section className='py-16 md:py-24 4xl:py-32 flex flex-center justify-center'>
      <div className='max-w-[1200px] 4xl:max-w-[1700px] flex flex-col items-center'>
        <Reveal variant='up' delay={100}>
          <h2 className='text-3xl md:text-[56px] 4xl:text-[88px] mb-12 md:mb-16 4xl:mb-24 tracking-wide leading-[1] text-center'>
            {sectionTitle}
          </h2>
        </Reveal>

        <RevealStagger
          gap={80}
          startDelay={100}
          className='flex flex-col md:flex-row 4xl:gap-4'
        >
          <OfferCard
            title={card1Title}
            content={card1Content}
            backTitle={back1Title}
            backContent={back1Content}
            bgColor='bg-[#ffe6bc]'
            bgColor2='https://res.cloudinary.com/dbssbnuph/image/upload/v1721209043/blog3_vkvdz0.png'
            readMore={readMore}
            link='/services/coaching'
          />
          <OfferCard
            title={card2Title}
            content={card2Content}
            backTitle={back2Title}
            backContent={back2Content}
            bgColor='bg-[#f99d5b]'
            bgColor2='https://res.cloudinary.com/dbssbnuph/image/upload/v1725907784/194_2_bykph6.jpg'
            readMore={readMore}
            link='/services/mediation'
          />
          <OfferCard
            title={card3Title}
            content={card3Content}
            backTitle={back3Title}
            backContent={back3Content}
            bgColor='bg-[#df650e]'
            bgColor2='https://res.cloudinary.com/dbssbnuph/image/upload/v1725906339/26.5.2017_Nova_Gorica2_o_bb8lvo.jpg'
            readMore={readMore}
            link='/services/workshop'
          />
        </RevealStagger>
      </div>
    </section>
  );
}
