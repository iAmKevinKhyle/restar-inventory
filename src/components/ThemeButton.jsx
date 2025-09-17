import { Button, theme } from 'antd'
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi'

const ThemeButton = ({ toggleTheme, darkTheme}) => {
  const {
    token: { colorBgBase, colorTextBase },
  } = theme.useToken();

  return (
    <div className='w-full flex justify-center'>
      <Button onClick={toggleTheme} className='w-[90%]' style={{ background: colorBgBase, color: colorTextBase }} >
        {darkTheme ? <HiOutlineSun className='text-xl' /> : <HiOutlineMoon className='text-xl' />}
      </Button>
    </div>
  )
}

export default ThemeButton