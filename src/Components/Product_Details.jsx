import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function Product_Details() {
  const [product, setProduct] = useState(null);
  const [profile, setProfile] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProductAndProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:3001/api/getRentEquipmentProfileByProductId/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProduct(response.data.rentEquipmentProfile.product);
        setProfile(response.data.rentEquipmentProfile);
      } catch (error) {
        console.error("Error fetching product and profile details:", error);
      }
    };

    fetchProductAndProfile();
  }, [id]);

  if (!product || !profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="lg:flex">
        <div className="lg:w-1/2">
          <Carousel>
            {product.imageUrls.map((url, index) => (
              <div key={index} className="flex items-center justify-center">
                <img src={url} className="object-contain max-h-96 w-full" alt={`product image ${index + 1}`} />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="lg:w-1/2 lg:pl-8 mt-8 lg:mt-0">
          <h2 className="text-3xl font-semibold mb-4">{product.product_name}</h2>
          <p className="text-xl mb-2">ราคาเช่า : {product.price} บาท/วัน</p>
          <p className='text-xl mb-2'>รายละเอียดสินค้า </p>
          {product.description && product.description.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}

          <div className="mt-8">
            <div className="border rounded p-4">
              <h3 className="text-lg font-semibold mb-2">สอบถามข้อมูลกับผู้ให้เช่าได้ที่</h3>
              <p>Line ID : {profile.lineId}</p>
              <p>Facebook : {profile.Facebook}</p>
              <p>Instagram : {profile.Instagram}</p>
              <p>Tel : {profile.Tel}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product_Details;
