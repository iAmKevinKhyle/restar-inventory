import { theme } from 'antd';

const Products = () => {
  const { token: { colorBorderSecondary } } = theme.useToken();

  return (
    <div className="p-6 min-h-full" style={{ backgroundColor: colorBorderSecondary }}>
      <h1 className="text-3xl font-bold mb-6">Products</h1>
    </div>
  )
}

export default Products