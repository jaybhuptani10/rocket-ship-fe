import { useState } from 'react';
import { upload } from '../../../../common/icons';
import axios from 'axios';
import { toast } from 'react-toastify';

const FreezeModal = ({ setShow, data }) => {
    const [weightFreezeData, setWeightFreezeData] = useState({
        product_id: data.id,
        length: data.package_details.length,
        width: data.package_details.width,
        height: data.package_details.height,
        weight: data.package_details.dead_weight,
        chargable_weight: '0',
        status_name: 'Request Raised',
        status_id: 2,
        product_category: '',
        images: {
            img_1: null,
            img_2: null,
            length_img: null,
            width_img: null,
            height_img: null,
            weight_img: null
        }
    })

    const [images, setImages] = useState({
        img_1: null,
        img_2: null,
        length_img: null,
        width_img: null,
        height_img: null,
        weight_img: null,
        label_img: null,
    });

    // const [packageDetails, setPackageDetails] = useState({
    //     length: data.package_details.length,
    //     width: data.package_details.width,
    //     height: data.package_details.height,
    //     weight: data.package_details.dead_weight,
    //     chargableWeight: '0',
    // })

    const packageData = [
        {
            label: 'Length',
            name: 'length',
            id: 'length',
            value: weightFreezeData.length,
            unit: 'CM',
        },
        {
            label: 'Width',
            name: 'width',
            id: 'width',
            value: weightFreezeData.width,
            unit: 'CM',
        }, {
            label: 'Height',
            name: 'height',
            id: 'height',
            value: weightFreezeData.height,
            unit: 'CM',
        }, {
            label: 'Weight',
            name: 'weight',
            id: 'weight',
            value: weightFreezeData.weight,
            unit: 'KG',
        }, {
            label: 'Chargable Weight',
            name: 'chargableWeight',
            id: 'chargableWeight',
            value: weightFreezeData.chargableWeight,
            unit: 'KG',
        }
    ]

    const packageImagesData = [
        {
            label: 'Length',
            name: 'length_img',
            id: 'length_image',
            value: images.length_img,
        },
        {
            label: 'Width',
            name: 'width_img',
            id: 'width_image',
            value: images.width_img,
        }, {
            label: 'Height',
            name: 'height_img',
            id: 'height_image',
            value: images.height_img,
        }, {
            label: 'Weight',
            name: 'weight_img',
            id: 'weight_image',
            value: images.weight_img,
        }, {
            label: 'with Label',
            name: 'label',
            id: 'label_image',
            value: images.label,
        }
    ]

    const handleFileChange = (e) => {
        const { name } = e.target;
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImages({ ...images, [name]: e.target.result });
            };
            reader.readAsDataURL(file);
        }
        handleUpload(name, file);
    };

    const handleUpload = (name, file) => {
        const formData = new FormData();
        formData.append('file', file);
        axios.post(`http://43.252.197.60:8050/image/upload_image?product_id=${data.id}`, { file: file }, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then((response) => {
                console.log(response.data.filepath);
                setWeightFreezeData({ ...weightFreezeData, images: { ...weightFreezeData.images, [name]: response.data.filepath } })
            }).catch((error) => {
                console.log(error);
            })
    }


    const handleWeightFreezeSubmit = () => {
        if (weightFreezeData.product_category === '' || weightFreezeData.width === 0 || weightFreezeData.height === 0 || weightFreezeData.length === 0 || weightFreezeData.dead_weight === 0) {
            return toast('Please fill all the details', { type: 'error' })
        }
        if (weightFreezeData.images.img_1 === null || weightFreezeData.images.img_2 === null || weightFreezeData.images.length_img === null || weightFreezeData.images.width_img === null || weightFreezeData.images.height_img === null || weightFreezeData.images.weight_img === null) {
            return toast('Please upload all the images', { type: 'error' })
        }
        const headers = { 'Content-Type': 'application/json' };
        axios.post('http://43.252.197.60:8050/weight_freeze/', weightFreezeData, { headers })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    toast('Request submitted successfully', { type: 'success' })
                    setShow(false);
                }
            }).catch((error) => {
                console.log(error);
            })
    }

    console.log(weightFreezeData);
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
                <div className="relative mx-0 my-6 w-full max-w-5xl">
                    {/*content*/}
                    <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                        {/*header*/}
                        <div className="border-blueGray-200 flex w-full items-center justify-center rounded-t border-b border-solid p-5">
                            <h3 className="text-2xl font-semibold">Add Product and Package Details</h3>
                            <button
                                className="border-0 bg-transparent p-1 text-2xl font-semibold leading-none text-black opacity-100 outline-none focus:outline-none"
                                onClick={() => setShow(false)}>
                                <span className="block h-6 w-6 bg-transparent text-black opacity-50 outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                            {/* To do : Active this button and move it to the right corner */}
                        </div>
                        {/*body*/}
                        <div className="relative flex-auto p-6">

                            <p className="text-lg font-semibold">Product Details</p>
                            <div className="m-1 flex flex-col rounded-md border border-gray-200">
                                {/* Product Information */}
                                <div className="gap-8 flex flex-row p-4 px-8">

                                    {/* Product Name and Category Section */}
                                    <div className="flex w-[55%] flex-col gap-4">
                                        {/* Product Name */}
                                        <div>
                                            <p className="w-full">Product Name</p>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                value={data.name}
                                                className="mt-2 h-8 w-full rounded-lg text-black text-[12px] font-normal border-gray-300 bg-[#ECF1F2] focus:border-gray-300 focus:ring-0"
                                                readOnly
                                            />
                                        </div>
                                        {/* Product Category */}
                                        <div>
                                            <p>Product Category</p>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                placeholder="Product Category"
                                                className="mt-2 h-8 w-full rounded-lg border-gray-300 text-[12px] font-normal focus:border-gray-300 focus:ring-0"
                                                value={weightFreezeData.product_category}
                                                onChange={(e) => setWeightFreezeData({ ...weightFreezeData, product_category: e.target.value })}
                                            />
                                            {/* Todo : Give auto suggestion filtered on the basis of user input */}
                                        </div>
                                    </div>

                                    {/* Product Image Section */}
                                    <div className="flex w-[45%] flex-col">
                                        <p>Product Images </p>
                                        <div className="mt-2 flex flex-row gap-8 rounded-lg">
                                            {/* Image 1 */}
                                            <div className='flex h-32 flex-col w-[40%]'>
                                                <div className="flex h-32 cursor-pointer flex-col items-center justify-evenly rounded-lg border-2 border-dashed border-blue-500">
                                                    <label htmlFor="img_1" className="w-full">
                                                        <div className="flex cursor-pointer flex-col items-center justify-center">
                                                            {images.img_1 ? (
                                                                <div className='flex justify-center w-[90%] h-[90%]'>
                                                                    <img src={images.img_1} alt="" className='object-fill h-28' />
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    <img src={upload} alt="" />
                                                                    <p>Upload Image</p>
                                                                    <input type="file" className="hidden" name="img_1" accept=".jpg,.png,.gif,.jpeg" id="img_1" onChange={handleFileChange}
                                                                    />
                                                                </>
                                                            )}
                                                        </div>
                                                    </label>
                                                </div>
                                                {images.img_1 && (
                                                    <button className='border border-blue-400 text-blue-400 mt-2 py-1 rounded-md hover:bg-blue-600 hover:text-white'>
                                                        <label htmlFor="img_1">
                                                            Change image
                                                            <input type="file" className="hidden" name="img_1" accept=".jpg,.png,.gif,.jpeg" id="img_1" onChange={handleFileChange}
                                                            />
                                                        </label>
                                                    </button>
                                                )}
                                            </div>
                                            {/* Image 2 */}
                                            <div className='flex h-32 flex-col w-[40%]'>
                                                <div className="flex h-32 cursor-pointer flex-col items-center justify-evenly rounded-lg border-2 border-dashed border-blue-500">
                                                    <label htmlFor="img_2" className="w-full">
                                                        <div className="flex cursor-pointer flex-col items-center justify-center">
                                                            {images.img_2 ? (
                                                                <div className='flex justify-center w-[90%] h-[90%]'>
                                                                    <img src={images.img_2} alt="" className='object-fill h-28' />
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    <img src={upload} alt="" />
                                                                    <p>Upload Image</p>
                                                                    <input type="file" className="hidden" name="img_2" accept=".jpg,.png,.gif,.jpeg" id="img_2" onChange={handleFileChange}
                                                                    />
                                                                </>
                                                            )}
                                                        </div>
                                                    </label>
                                                </div>
                                                {images.img_2 && (
                                                    <button className='border border-blue-400 text-blue-400 mt-2 py-1 rounded-md hover:bg-blue-600 hover:text-white'>
                                                        <label htmlFor="img_2">
                                                            Change image
                                                            <input type="file" className="hidden" name="img_2" accept=".jpg,.png,.gif,.jpeg" id="img_2" onChange={handleFileChange}
                                                            />
                                                        </label>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center items-center w-full border-0 text-[12px] border-t-2 bg-[#f8f8f892] py-2">
                                    Notes :&nbsp;<span className='font-normal'> Uploaded images should be less than 5mb</span>
                                </div>
                            </div>


                            <p className='text-lg font-semibold'>Package Details</p>
                            <div className="m-1 flex flex-col rounded-md border border-gray-200">
                                {/* Package Information */}
                                <div className="gap-8 flex flex-row p-4 px-8">
                                    {packageData.map((item, key) => {
                                        return (
                                            <div key={key} className="flex flex-col">
                                                <p>
                                                    {item.label}
                                                    {item.name !== 'chargableWeight' && <span className='text-red-500'>*</span>}
                                                </p>
                                                <div>
                                                    <input type="number" name={item.name} id={item.id}
                                                        className={`mt-2 h-8 w-3/4 rounded-l-lg border border-gray-300 text-[12px] font-normal focus:border-gray-300 focus:ring-0 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${item.name === 'chargableWeight' && 'bg-[#ECF1F2]'}`}
                                                        onChange={(e) => setWeightFreezeData({ ...weightFreezeData, [item.name]: e.target.value })}
                                                        placeholder={item.name !== 'chargableWeight' ? 'Enter ' + item.label : '0'}
                                                        readOnly={item.name === 'chargableWeight'}
                                                        required={item.name !== 'chargableWeight'}
                                                        value={item.value}
                                                    />
                                                    <button className='h-8 w-1/4 rounded-r-lg text-white bg-blue-600 focus:outline-none focus:ring-0'>
                                                        {item.unit}
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="flex justify-center items-center w-full border-0 text-[12px] border-t-2 bg-[#f8f8f892] py-2">
                                    Notes :&nbsp;
                                    <span className='font-normal'>
                                        Chargable weight is the higher between entered weight and volumetric weight
                                    </span>
                                </div>
                            </div>

                            <p className='text-lg font-semibold'>Package Images</p>
                            <div className="m-1 flex flex-col rounded-md border border-gray-200">
                                {/* Package Images */}
                                <div className="gap-8 flex flex-row p-4 h-44 px-8">
                                    {packageImagesData.map((item, key) => {
                                        return (
                                            <div className='flex h-40 flex-col w-[40%]' key={key}>
                                                <div className="flex h-32 cursor-pointer flex-col items-center justify-evenly rounded-lg border-2 border-dashed border-blue-500">
                                                    <label htmlFor={item.id} className="w-full">
                                                        <div className="flex cursor-pointer flex-col items-center justify-center">
                                                            {item.value ? (
                                                                <div className='flex justify-center w-[90%] h-[90%]'>
                                                                    <img src={item.value} alt="" className='object-fill h-28' />
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    <img src={upload} alt="" />
                                                                    <p>Upload Image</p>
                                                                    <input type="file" className="hidden" name={item.name} accept=".jpg,.png,.gif,.jpeg" id={item.id} onChange={handleFileChange}
                                                                    />
                                                                </>
                                                            )}
                                                        </div>
                                                    </label>
                                                </div>
                                                {item.value ? (
                                                    <button className='border border-blue-400 text-blue-400 py-1 mt-2 rounded-md hover:bg-blue-600 hover:text-white'>
                                                        <label htmlFor={item.id}>
                                                            Change image
                                                            <input type="file" className="hidden" name={item.name} accept=".jpg,.png,.gif,.jpeg" id={item.id} onChange={handleFileChange}
                                                            />
                                                        </label>
                                                    </button>
                                                ) : (
                                                    <p className='text-center py-1 mt-2'>Package {item.label}</p>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="flex justify-center items-center w-full border-0 text-[12px] border-t-2 bg-[#f8f8f892] py-2">
                                    Notes :&nbsp;
                                    <span className='font-normal'>
                                        Uploaded images should be less than 5mb
                                    </span>
                                </div>
                            </div>

                        </div>


                        {/*footer*/}
                        <div className="border-blueGray-200 flex items-center justify-center rounded-b border-t border-solid p-6">
                            <button
                                className="mb-1 mr-1 px-12 rounded-lg py-2 text-sm border border-blue-400 text-blue-400 outline-none transition-all duration-150 ease-linear focus:outline-none hover:shadow-lg font-semibold"
                                type="button"
                                onClick={() => setShow(false)}>
                                Cancel
                            </button>
                            <button
                                className="mb-1 mr-1 rounded-lg bg-blue-600 px-6 py-2 text-sm text-white shadow outline-none transition-all duration-150 border ease-linear hover:shadow-lg focus:outline-none font-semibold"
                                type="button"
                                onClick={() => handleWeightFreezeSubmit()}>
                                Request Weight Freeze
                            </button>
                        </div>

                    </div>
                </div >
            </div >
            <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
    );
};

export default FreezeModal;
