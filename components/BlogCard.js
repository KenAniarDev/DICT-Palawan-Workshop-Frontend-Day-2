import Link from 'next/link'
import { nanoid } from 'nanoid'

export default function BlogCard ({
  image= "https://www.denofgeek.com/wp-content/uploads/2022/04/SPY-x-FAMILY-KV.jpg?resize=768%2C432",
  title= "Spy X Fam Shopping Plan",
  description= "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam convallis at lorem quis malesuada....",
  dateCreated= "June 20, 2022",
  userPosted= nanoid(),
  _id=nanoid()
}) {
  return (
    <div className="border-2 border-gray-300 rounded-xl overflow-hidden">
      <img src={image} className="w-full h-[240px] object-cover" />
      <div className="px-6 py-8">
      <h4 className="text-primary text-2xl leading-none">{title}</h4>
        <small className="text-sm text-gray-500">Posted on {dateCreated}</small>

        <p className="mt-2 line-clamp-4">{description}</p>

        <Link href={'/blogs/' + _id}><a className="mt-3 inline-block border-b border-gray-400 font-medium">Read More</a></Link>
      </div>
    </div>
  )
}