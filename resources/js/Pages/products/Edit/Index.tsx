import React, { useCallback } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Dropzone, { useDropzone } from 'react-dropzone';
import InputLabel from '@/Components/InputLabel';


export default function EditProduct() {
    const { auth, product ,categories }: any = usePage().props;
    const { data, setData, put, errors } = useForm({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        category_id: product.category_id || '',
        status: product.status || 'draft',
        image: null as File | null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('products.update', product.id));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Product</h2>}
        >
            <Head title="Edit Product" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Product Name"
                                    />
                                    {errors.name && <div className="text-red-500 text-xs mt-2">{errors.name}</div>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Product Description"
                                    ></textarea>
                                    {errors.description && <div className="text-red-500 text-xs mt-2">{errors.description}</div>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Product Price"
                                    />
                                    {errors.price && <div className="text-red-500 text-xs mt-2">{errors.price}</div>}
                                </div>

                                { <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category_id">
                                        Category
                                    </label>
                                    <select
                                        name="category_id"
                                        value={data.category_id}
                                        onChange={(e) => setData('category_id', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((category: any) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category_id && <div className="text-red-500 text-xs mt-2">{errors.category_id}</div>}
                                </div> }

                                <div className="mb-4">
                                    <label className="block text-gray-700">Status</label>
                                    <select
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="mt-1 block w-full"
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                    {errors.status && <span className="text-red-600">{errors.status}</span>}
                                </div>

                                <div>
                                        <InputLabel value="Service Image" htmlFor="image" />
                                        <Dropzone
                                                onDrop={(acceptedFiles) => {
                                                    setData("image", acceptedFiles[0]);
                                                }}
                                            >
                                                {({ getRootProps, getInputProps }) => (
                                                    <section>
                                                        <div
                                                            {...getRootProps()}
                                                            style={{
                                                                border: "1px solid #d1d5db",
                                                                borderRadius: "5px",
                                                                padding: "20px",
                                                                width: "100%",
                                                                height: "200px",
                                                                display: "flex",
                                                                flexDirection: "column",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                            }}
                                                        >
                                                            <input {...getInputProps()} />
                                                            {data.image ? (
                                                                <div className="w-full h-full flex flex-col justify-center items-center">
                                                                    <img
                                                                        className="max-h-[150px]"
                                                                        src={URL.createObjectURL(data.image)}
                                                                        alt="Preview"
                                                                    />
                                                                </div>
                                                            ) : (
                                                                "Drag and drop an image here or click to select an image"
                                                            )}
                                                        </div>
                                                    </section>
                                                )}
                                            </Dropzone>
                                    </div>

                                <div className="flex items-center justify-between">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Update Product
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
