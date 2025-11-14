function Footer() {
  return (
    <footer className="w-full text-center py-4 bg-white dark:bg-gray-900 border-t-2 border-gray-400 text-gray-600 dark:text-gray-300 text-sm">
      © {new Date().getFullYear()} GryeTickets — Síguenos en{" "}
      <a href="#" className="text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300 ml-1">
        Instagram
      </a>
    </footer>
  );
}

export default Footer;
