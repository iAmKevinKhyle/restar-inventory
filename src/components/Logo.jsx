import { FireFilled } from '@ant-design/icons'

const Logo = ({collapsed}) => {
  return (
    <div className='flex items-center justify-center text-white p-2.5'>
        <div className='w-full h-12 flex items-center justify-center text-2xl rounded-full bg-gray-900'>
            <FireFilled /> <span className={collapsed ? 'hidden' : 'ml-2 uppercase text-sm whitespace-nowrap'}>Restar Store</span>
        </div>
    </div>
  )
}

export default Logo