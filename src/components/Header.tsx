import bell from "assets/bell.svg"
import settings from "assets/settings.svg"
import profile_photo from "assets/profile_photo.png"
import Menu from './icons/Menu'

type Props = {}

export default function Header({}: Props) {

  // const [dark, setDark] = useState(!!localStorage.getItem("dark"))

  return (
    <div className="w-full border-b-[1px] border-b-gray-200 dark:border-b-gray-700">
      <header className="flex justify-between items-center py-4 px-4 xl:px-20 w-full max-w-[1440px] mx-auto">
        <h1 className="text-2xl font-bold dark:text-gray-200">ToDo</h1>
        <div className="flex items-center gap-x-6">
          <div onClick={() => {
            const mode = localStorage.getItem("mode")
            const newValue = mode === "dark" ? "light" : "dark"
            localStorage.setItem("mode", newValue)
            window.dispatchEvent(new Event("storage"))
          }} className="w-[60px] cursor-pointer h-[30px] bg-gray-200 dark:bg-gray-600 relative flex items-center rounded-full">
            <div className={`h-[20px] w-[20px] bg-gray-400 dark:bg-gray-800 rounded-full absolute left-[5px] right-auto dark:left-auto dark:right-[5px]`}></div>
          </div>
          <img src={bell} alt="bell" className="w-5 h-5 hidden md:block" />
          <img src={settings} alt="gear" className="w-5 h-5 hidden md:block" />
          <img src={profile_photo} alt="profile photo" className="w-10 h-10 object-cover object-center rounded-full border-[1px] border-gray-900 dark:border-gray-200 dark:border-gray-700 hidden md:block" />
          <Menu className="stroke-gray-600 dark:stroke-gray-600 dark:fill-gray-400 fill-gray-200 block md:hidden" />
        </div>
      </header>
    </div>
  )
}