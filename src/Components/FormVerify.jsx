import React, { useState } from 'react';

const Step1 = ({ data, onChange, onNext }) => {
  return (
    <div>
      <h2>Step 1: ข้อมูลทั่วไป</h2>
      <label>รูปโปรไฟล์: </label>
      <input
        type="text"
        value={data.profileImage}
        onChange={(e) => onChange('profileImage', e.target.value)}
      />
      <label>ประเภทงานที่รับ: </label>
      <input
        type="text"
        value={data.jobType}
        onChange={(e) => onChange('jobType', e.target.value)}
      />
      <label>ชื่อนามสกุล: </label>
      <input
        type="text"
        value={data.name}
        onChange={(e) => onChange('name', e.target.value)}
      />
      <label>วันเกิด: </label>
      <input
        type="text"
        value={data.birthDate}
        onChange={(e) => onChange('birthDate', e.target.value)}
      />
      <label>เพศ: </label>
      <input
        type="text"
        value={data.gender}
        onChange={(e) => onChange('gender', e.target.value)}
      />
      <label>Line ID: </label>
      <input
        type="text"
        value={data.lineId}
        onChange={(e) => onChange('lineId', e.target.value)}
      />
      <label>URL เว็บไซต์: </label>
      <input
        type="text"
        value={data.websiteUrl}
        onChange={(e) => onChange('websiteUrl', e.target.value)}
      />
      <button onClick={onNext}>Next</button>
    </div>
  );
};

const Step2 = ({ data, onChange, onPrev, onNext }) => {
  return (
    <div>
      <h2>Step 2: ยืนยัน Email</h2>
      <label>ยืนยัน Email: </label>
      <input
        type="text"
        value={data.confirmEmail}
        onChange={(e) => onChange('confirmEmail', e.target.value)}
      />
      <button onClick={onPrev}>Previous</button>
      <button onClick={onNext}>Next</button>
    </div>
  );
};

const Step3 = ({ data, onChange, onPrev, onNext }) => {
  return (
    <div>
      <h2>Step 3: ยืนยันข้อมูลส่วนตัว</h2>
      <label>ชื่อนามสกุล: </label>
      <input
        type="text"
        value={data.fullName}
        onChange={(e) => onChange('fullName', e.target.value)}
      />
      <label>รหัสบัตรประชาชน: </label>
      <input
        type="text"
        value={data.idCard}
        onChange={(e) => onChange('idCard', e.target.value)}
      />
      <label>ที่อยู่: </label>
      <input
        type="text"
        value={data.address}
        onChange={(e) => onChange('address', e.target.value)}
      />
      <label>ภาพบัตรประชาชน: </label>
      <input
        type="text"
        value={data.idCardImage}
        onChange={(e) => onChange('idCardImage', e.target.value)}
      />
      <label>ภาพหน้าจริง: </label>
      <input
        type="text"
        value={data.realImage}
        onChange={(e) => onChange('realImage', e.target.value)}
      />
      <button onClick={onPrev}>Previous</button>
      <button onClick={onNext}>Next</button>
    </div>
  );
};

const Step4 = ({ data, onPrev }) => {
  return (
    <div>
      <h2>Step 4: ตรวจสอบข้อมูล</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={onPrev}>Previous</button>
    </div>
  );
};

const FormVerify = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    generalInfo: {
      profileImage: '',
      jobType: '',
      name: '',
      birthDate: '',
      gender: '',
      lineId: '',
      websiteUrl: '',
    },
    emailConfirmation: {
      confirmEmail: '',
    },
    personalInfo: {
      fullName: '',
      idCard: '',
      address: '',
      idCardImage: '',
      realImage: '',
    },
  });

  const handleChange = (stepName, fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [stepName]: {
        ...prevData[stepName],
        [fieldName]: value,
      },
    }));
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="container mx-auto my-8">
      <div className="flex">
        <ul >
          <li className={step === 1 ? 'active' : ''}>Step 1</li>
          <li className={step === 2 ? 'active' : ''}>Step 2</li>
          <li className={step === 3 ? 'active' : ''}>Step 3</li>
          <li className={step === 4 ? 'active' : ''}>Step 4</li>
        </ul>
      </div>
      <div>
        {step === 1 && (
          <Step1
            data={formData.generalInfo}
            onChange={(fieldName, value) =>
              handleChange('generalInfo', fieldName, value)
            }
            onNext={handleNext}
          />
        )}
        {step === 2 && (
          <Step2
            data={formData.emailConfirmation}
            onChange={(fieldName, value) =>
              handleChange('emailConfirmation', fieldName, value)
            }
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
        {step === 3 && (
          <Step3
            data={formData.personalInfo}
            onChange={(fieldName, value) =>
              handleChange('personalInfo', fieldName, value)
            }
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
        {step === 4 && (
          <Step4 data={formData} onPrev={handlePrev} />
        )}
      </div>
    </div>
  );
};

export default FormVerify;
