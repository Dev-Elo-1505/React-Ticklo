const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-8">
      <div className="mx-auto w-full max-w-[1440px] px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm">© {new Date().getFullYear()} Ticklo — Simple ticketing made easy.</div>
        <nav className="flex items-center gap-4 text-sm">
          <a href="/" className="hover:text-white">Home</a>
          <a href="/dashboard" className="hover:text-white">Dashboard</a>
          <a href="/tickets" className="hover:text-white">Tickets</a>
          <a href="/auth/login" className="hover:text-white">Login</a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer