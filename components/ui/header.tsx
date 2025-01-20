import Link from "next/link"

export default function Header() {
  return (
    <div className=" flex items-center justify-end bg-white px-6 py-3 border-b">
      <div className="flex items-center space-x-4 mr-4">
        <Link href ="/auth/login"  >
        <button className="border border-red-400 text-red-400 px-2 py-1 rounded-lg text-sm">
          Signin
          </button>
        </Link>
        <button className="border border-red-400 text-red-400 px-2 py-1 rounded-lg text-sm">
            Singup
        </button>
      </div>
    </div>
  )
}