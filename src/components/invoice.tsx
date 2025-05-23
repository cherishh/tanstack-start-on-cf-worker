import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Printer } from 'lucide-react';

export default function Invoice() {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: 'INV-2023-001',
    date: '2023-05-05',
    dueDate: '2023-06-05',
    company: {
      name: '您的公司名称',
      address: '公司地址行1',
      address2: '公司地址行2',
      city: '城市, 省份 邮编',
      phone: '+86 123 4567 8910',
      email: 'contact@yourcompany.com',
    },
    client: {
      name: '客户名称',
      address: '客户地址行1',
      address2: '客户地址行2',
      city: '城市, 省份 邮编',
    },
    items: [
      {
        id: 1,
        description: '产品或服务描述 1',
        quantity: 2,
        unitPrice: 100.0,
      },
      {
        id: 2,
        description: '产品或服务描述 2',
        quantity: 1,
        unitPrice: 200.0,
      },
      {
        id: 3,
        description: '产品或服务描述 3',
        quantity: 3,
        unitPrice: 50.0,
      },
    ],
    taxRate: 0.13, // 13% 增值税
    notes: '感谢您的惠顾。请在到期日前付款。',
    paymentInfo: '银行转账: 中国银行 | 账号: 1234 5678 9012 3456 | 户名: 您的公司名称',
  });

  // 计算小计
  const subtotal = invoiceData.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

  // 计算税额
  const tax = subtotal * invoiceData.taxRate;

  // 计算总计
  const total = subtotal + tax;

  // 打印功能
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className='w-full max-w-4xl mx-auto'>
      <div className='print:hidden mb-4 flex justify-end'>
        <Button onClick={handlePrint} className='flex items-center gap-2'>
          <Printer className='h-4 w-4' />
          打印发票
        </Button>
      </div>

      <Card className='p-8 shadow-lg bg-white'>
        <div className='flex flex-col md:flex-row justify-between mb-8'>
          <div>
            <h1 className='text-3xl font-bold text-gray-800'>发票</h1>
            <div className='mt-4'>
              <p className='font-semibold'>{invoiceData.company.name}</p>
              <p>{invoiceData.company.address}</p>
              <p>{invoiceData.company.address2}</p>
              <p>{invoiceData.company.city}</p>
              <p>{invoiceData.company.phone}</p>
              <p>{invoiceData.company.email}</p>
            </div>
          </div>

          <div className='mt-6 md:mt-0 md:text-right'>
            <div className='bg-gray-100 p-4 rounded-lg'>
              <p>
                <span className='font-semibold'>发票编号:</span> {invoiceData.invoiceNumber}
              </p>
              <p>
                <span className='font-semibold'>发票日期:</span> {invoiceData.date}
              </p>
              <p>
                <span className='font-semibold'>付款截止日:</span> {invoiceData.dueDate}
              </p>
            </div>
          </div>
        </div>

        <div className='mb-8'>
          <h2 className='text-xl font-semibold mb-2 text-gray-700'>客户信息</h2>
          <div className='border-t border-gray-200 pt-2'>
            <p className='font-semibold'>{invoiceData.client.name}</p>
            <p>{invoiceData.client.address}</p>
            <p>{invoiceData.client.address2}</p>
            <p>{invoiceData.client.city}</p>
          </div>
        </div>

        <div className='mb-8'>
          <h2 className='text-xl font-semibold mb-4 text-gray-700'>发票明细</h2>
          <div className='overflow-x-auto'>
            <table className='w-full border-collapse'>
              <thead>
                <tr className='bg-gray-100'>
                  <th className='py-2 px-4 text-left border-b'>描述</th>
                  <th className='py-2 px-4 text-right border-b'>数量</th>
                  <th className='py-2 px-4 text-right border-b'>单价 (¥)</th>
                  <th className='py-2 px-4 text-right border-b'>金额 (¥)</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map(item => (
                  <tr key={item.id} className='border-b border-gray-200'>
                    <td className='py-3 px-4'>{item.description}</td>
                    <td className='py-3 px-4 text-right'>{item.quantity}</td>
                    <td className='py-3 px-4 text-right'>{item.unitPrice.toFixed(2)}</td>
                    <td className='py-3 px-4 text-right'>{(item.quantity * item.unitPrice).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className='flex justify-end mb-8'>
          <div className='w-full md:w-1/2'>
            <div className='flex justify-between py-2'>
              <span className='font-semibold'>小计:</span>
              <span>¥ {subtotal.toFixed(2)}</span>
            </div>
            <div className='flex justify-between py-2'>
              <span className='font-semibold'>增值税 ({(invoiceData.taxRate * 100).toFixed(0)}%):</span>
              <span>¥ {tax.toFixed(2)}</span>
            </div>
            <div className='flex justify-between py-2 border-t border-gray-200 text-xl font-bold'>
              <span>总计:</span>
              <span>¥ {total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className='mb-8'>
          <h2 className='text-xl font-semibold mb-2 text-gray-700'>付款信息</h2>
          <p className='border-t border-gray-200 pt-2'>{invoiceData.paymentInfo}</p>
        </div>

        <div>
          <h2 className='text-xl font-semibold mb-2 text-gray-700'>备注</h2>
          <p className='border-t border-gray-200 pt-2'>{invoiceData.notes}</p>
        </div>
      </Card>
    </div>
  );
}
