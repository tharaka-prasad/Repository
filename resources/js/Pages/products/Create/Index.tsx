import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import Dropzone, { useDropzone } from 'react-dropzone';
import { useState, useCallback } from 'react';
import InputLabel from '@/Components/InputLabel';

export default function CreateProduct({ auth , categories}: any) {
    const { data, setData, post, errors } = useForm({
        name: '',
        description: '',
        price: '',
        category_id: categories.name,
        status: 'draft',
        image: null as File | null,  // Default value for status
    });

    const [uploadedImage, setUploadedImage] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const formData = new FormData();
        formData.append('file', acceptedFiles[0]);

    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });


    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('products.store'),{
            forceFormData: true, // send data as FormData
        });
    }
    //console.log(categories);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Product</h2>}
        >
            <Head title="Create Product" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    {errors.name && <span className="text-red-600">{errors.name}</span>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700">Description</label>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    {errors.description && <span className="text-red-600">{errors.description}</span>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700">Price</label>
                                    <input
                                        type="number"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    {errors.price && <span className="text-red-600">{errors.price}</span>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700">Category</label>
                                    <select
                                        value={data.category_id}
                                        onChange={(e) => setData('category_id', e.target.value)}
                                        className="mt-1 block w-full"
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((category: any) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category_id && <span className="text-red-600">{errors.category_id}</span>}
                                </div>
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
                                                                    alt=""
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

                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Save Product
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
