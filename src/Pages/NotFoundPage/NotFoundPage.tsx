import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="bg-white p-6">
      <h1 className="text-xl font-semibold">Page not found</h1>
      <p className="text-slate-600">The page you requested doesn't exist.</p>
      <div className="flex gap-4">
        <Link className="inline-block text-indigo-600 hover:underline" to="/signin">
          Sign in
        </Link>
        <Link className="inline-block text-indigo-600 hover:underline" to="/categories">
          Կատեգորիաներ
        </Link>
        <Link className="inline-block text-indigo-600 hover:underline" to="/users">
          Օգտատերեր
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage


