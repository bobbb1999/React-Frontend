import { React , useState,useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { BsFillSunFill, BsMoonFill, BsCheck } from 'react-icons/bs';


const navigation = [
    { name: 'Home', to: '/' },
    { name: 'Photograhphy', to: '/Photograhphy' },
    { name: 'Rent Equiment', to: '/' },
    { name: 'Contact', to: '/' },
  ]
  

  

function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [theme, setTheme] = useState('light');

    // if local storage is empty save theme as light
    useEffect(() => {
      if (localStorage.getItem('theme') === null) {
        localStorage.setItem('theme', 'light');
      }
    }, []);
  
    useEffect(() => {
      // select html elem
      const html = document.querySelector('html');
      if (localStorage.getItem('theme') === 'dark') {
        html.classList.add('dark');
        setTheme('dark');
      } else {
        html.classList.remove('dark');
        setTheme('light');
      }
    }, [theme]);
  
    // handle switch theme
    const handleThemeSwitch = () => {
      if (localStorage.getItem('theme') === 'light') {
        setTheme('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        setTheme('light');
        localStorage.setItem('theme', 'light');
      }
    };


  return (
    <div className="bg-white dark:bg-black">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8 dark:text-white " aria-label="Global">
          <div className="flex lg:flex-1">
            <Link to="/" className="py-4 sm:py-0 transition duration-300 hover:scale-105">
              <span className="sr-only">Your Company</span>
                  <span className="text-2xl tracking-tighter font-black text-red-500">Easy</span>
                  <span className="text-2xl tracking-tighter font-black text-white">Photo</span>
            </Link>
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <div>
          <button
            onClick={handleThemeSwitch}
            className='p-3  text-black dark:text-white rounded-full w-12 h-6 flex justify-center items-center'
          >
            {theme === 'light' ? <BsMoonFill /> : <BsFillSunFill />}
          </button>
          </div>
            <Link to="/" className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200">
              Home 
            </Link>
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
            <Link to="/" className="py-4 sm:py-0 transition duration-300 hover:scale-105">
              <span className="sr-only">Your Company</span>
                  <span className="text-2xl tracking-tighter font-black text-red-500">Easy</span>
                  <span className="text-2xl tracking-tighter font-black text-white">Photo</span>
            </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link to={item.to}
                      key={item.name}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <Link to="/Login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </div>
  )
}

export default Navbar