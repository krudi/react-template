import Link from 'next/link';

export default function Navigation() {
  return (
    <>
      <nav className="w-full min-h-[5em] mb-5 flex justify-between items-center">
        <h1 className="px-4 py-2 bg-sky-800">
          <Link href="/" className="text-white font-semibold">react-template</Link>
        </h1>
        <ul className="m-0 p-0 inline-flex gap-7">
          <li>
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
          </li>
          <li>
            <Link href="/not-found" className="text-gray-500 hover:text-gray-700">Not Found</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
