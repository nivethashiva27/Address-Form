import React, { useState, useEffect } from "react";

export default function AddressForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const id = "address-form-styles";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

        /* Background setup */
        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
          background: radial-gradient(circle at top left, #16222a, #3a6073);
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #222;
        }

        /* Main container */
        .address-wrapper {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 18px;
          padding: 35px 45px;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
          width: 420px;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .address-wrapper::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(120deg, rgba(15, 185, 177, 0.1), rgba(255,255,255,0.2), rgba(15,185,177,0.1));
          transition: 0.8s;
        }

        .address-wrapper:hover::before {
          left: 100%;
        }

        .address-wrapper:hover {
          transform: scale(1.02);
        }

        h2 {
          text-align: center;
          color: #083b4e;
          margin-bottom: 25px;
          letter-spacing: 1px;
        }

        form {
          display: flex;
          flex-direction: column;
        }

        label {
          font-weight: 600;
          color: #083b4e;
          margin-bottom: 5px;
          font-size: 14px;
        }

        input {
          padding: 12px 14px;
          margin-bottom: 18px;
          border: 2px solid #e3e3e3;
          border-radius: 10px;
          outline: none;
          font-size: 15px;
          transition: all 0.3s ease;
          background-color: #f8fafc;
        }

        input:focus {
          border-color: #0fb9b1;
          box-shadow: 0 0 10px rgba(15,185,177,0.4);
          background: #fff;
        }

        input::placeholder {
          color: #9ca3af;
        }

        button {
          padding: 14px;
          background: linear-gradient(135deg, #0fb9b1, #083b4e);
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          letter-spacing: 0.5px;
          font-size: 16px;
          transition: all 0.3s ease;
        }

        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(15,185,177,0.4);
          background: linear-gradient(135deg, #083b4e, #0fb9b1);
        }

        .error {
          color: #e74c3c;
          background: #fdecea;
          padding: 10px;
          border-radius: 10px;
          font-weight: 600;
          text-align: center;
          margin-bottom: 10px;
          animation: fadeIn 0.4s ease;
        }

        .success {
          color: #2ecc71;
          background: #eafaf1;
          padding: 12px;
          border-radius: 10px;
          text-align: center;
          font-weight: 600;
          margin-top: 10px;
          animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, phone, street, city, state, pincode } = formData;

    if (!fullName || !phone || !street || !city || !state || !pincode) {
      setError("⚠ Please fill out all fields!");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      setError("⚠ Phone number must be 10 digits!");
      return;
    }

    if (!/^[0-9]{6}$/.test(pincode)) {
      setError("⚠ Pincode must be 6 digits!");
      return;
    }

    localStorage.setItem("shippingAddress", JSON.stringify(formData));
    setSuccess("✅ Address saved successfully!");
    setError("");
    setFormData({
      fullName: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
    });
  };

  return (
    <div className="address-wrapper">
      <h2>📦 Shipping Address</h2>
      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
        />

        <label>Phone Number</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="10-digit phone number"
        />

        <label>Street Address</label>
        <input
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
          placeholder="123 Main Street"
        />

        <label>City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Enter your city"
        />

        <label>State</label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          placeholder="Enter your state"
        />

        <label>Pincode</label>
        <input
          type="text"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          placeholder="6-digit pincode"
        />

        {error && <div className="error">{error}</div>}

        <button type="submit">Save Address</button>
      </form>

      {success && <div className="success">{success}</div>}
    </div>
  );
}
