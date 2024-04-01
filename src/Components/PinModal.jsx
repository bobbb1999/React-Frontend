import React, { useState , useEffect } from "react";
import { Modal , Button  } from "antd";
import PinField from "react-pin-field";
import "../App.css";
const PinModal = ({ pinModalVisible, handleCancel, handlePinSubmit }) => {
  const [pinCode, setPinCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    if (pinModalVisible) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 0) {
            clearInterval(timer);
            handleCancel(); // Close modal when time is up
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [pinModalVisible, handleCancel]);

  const handleChange = (value) => {
    setPinCode(value);
    // if (value.length === 6) {
    //   // Auto submit when all 6 digits are entered
    //   handlePinSubmit(value);
    // }
  };


  const handleSubmit = () => {
    if (pinCode.length === 6) {
      handlePinSubmit(pinCode);
    }
  };

  return (
    <Modal
      title="ใส่รหัส PIN ที่ส่งไปยังอีเมล"
      visible={pinModalVisible}
      onCancel={handleCancel}
      footer={null}
      //   className="flex justify-center items-center"
    >
      <div>
        <p>กรุณาใส่ PIN ที่ได้รับภายใน {timeLeft} วินาที</p>
        <div className="flex justify-center items-center">
          <PinField
            length={6}
            onChange={handleChange}
            autoFocus={true}
            inputMode="numeric"
            className="pin-field"
          />
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={handleSubmit} disabled={pinCode.length !== 6}>
            ยืนยัน
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PinModal;
