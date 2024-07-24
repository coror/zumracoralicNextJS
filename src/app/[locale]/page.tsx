import AboutMe from '@/components/AboutMe';
import ActionSection from '@/components/ActionSection';
import Citat from '@/components/Quote';
import Header from '@/components/Header';
import Offer from '@/components/Offer';
import Testimonials from '@/components/Testimonials';
import LatestEvents from '@/components/LatestEvents';
import LatestBlogs from '@/components/LatestBlogs';

export default function Home() {
  return (
    <div>
      <Header />
      <AboutMe />
      <Citat />
      <Offer />
      <Testimonials />
      <LatestEvents />
      <ActionSection />
      <LatestBlogs />
    </div>
  );
}
