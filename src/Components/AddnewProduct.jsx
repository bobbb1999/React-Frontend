import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';

export default function AddNewProduct() {
    const { register, handleSubmit, control } = useForm();
    const onSubmit = data => console.log(data);

    const categoryOptions = [
        { value: 'camera', label: 'กล้องถ่ายรูป/วีดีโอ' },
        { value: 'lens', label: 'เลนส์' },
        { value: 'lighting', label: 'ไฟแฟรช/ไฟ LED' },
        { value: 'power', label: 'Power/Battery' },
        { value: 'gopro', label: 'GoPro' },
        { value: 'mic', label: 'Mic/Wireless' },
        { value: 'accessory_camera', label: 'อุปกรณ์ถ่ายรูป' },
        { value: 'accessory_video', label: 'อุปกรณ์ถ่ายวีดีโอ' },
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 mt-8 max-w-xl mx-auto bg-white shadow-md rounded">
            <h2 className="text-2xl mb-6 text-center">เพิ่มสินค้า</h2>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input {...register("name", { required: true })} type="text" placeholder="ชื่อของอุปกรณ์" className="mt-1 p-2 w-full border rounded-md"/>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input {...register("price", { required: true })} type="text" placeholder="ราคาต่อ 1 วัน (ใส่แค่ตัวเลข เช่น 300)" className="mt-1 p-2 w-full border rounded-md"/>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <Controller
                    name="category"
                    control={control}
                    defaultValue={''}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={categoryOptions}
                            placeholder="เลือกประเภทของอุปกรณ์"
                        />
                    )}
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea {...register("description")} rows={3} className="mt-1 p-2 w-full border rounded-md"></textarea>
            </div>
            
            <button type='submit' className='w-full mx-auto bg-blue-600 hover:bg-pink-dark text-black py-3 px-4 mt-8 rounded'>
              Save product
            </button> 
        </form>
    );
}
