import Navbar from '../components/Navbar'
import Link from 'next/link'

export default function Blog () {
  return (
    <>
    <Navbar />
    <div className='max-w-[1440px] px-5 md:px-12 lg:px-20 mx-auto py-10'>
      <img src='/blogbanner.jpg' className='w-full' />

      <h1 className="text-primary text-5xl mt-10">Card Title</h1>
        <small className="text-xl text-gray-500">Posted on January 5, 2022</small>

        <p className="mt-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lorem tortor, molestie a dapibus ut, consequat vitae purus. Etiam dignissim eu est at dictum. Praesent molestie auctor dui, quis sagittis dolor vulputate non. Mauris pellentesque, nibh nec sodales rhoncus, massa eros vestibulum risus, non posuere orci ligula eu libero. Morbi aliquet ultricies malesuada. Nunc volutpat orci augue, eu consectetur arcu faucibus molestie. Interdum et malesuada fames ac ante ipsum primis in faucibus. In eget ultrices augue. In accumsan lorem non ligula congue, sit amet bibendum lacus pharetra. In eleifend, ex id consequat lacinia, ex lorem tincidunt dolor, a commodo justo eros nec ex. Duis iaculis, nisi at vestibulum sodales, ante massa malesuada arcu, at interdum sapien sapien id urna. Sed at sem dolor. Nam in scelerisque lorem. Praesent sodales lorem sem, non aliquet lectus ornare a. Proin ex diam, bibendum ac lectus at, viverra vestibulum mi. Aenean a molestie orci.
        </p>

        <Link href='/'><a className="mt-8 inline-block bg-dark text-white px-3 py-2 rounded hover:bg-primary transition">Return to Home</a></Link>
    </div>
    </>
  )
}