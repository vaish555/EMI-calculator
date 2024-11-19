import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [loanAmount, setLoanAmount] = useState(10000000); 
  const [interestRate, setInterestRate] = useState(8.75); 
  const [loanTenure, setLoanTenure] = useState(20); 
  const [emi, setEmi] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [interestAmount, setInterestAmount] = useState(0);
  const maxEmi = 500000; 
  useEffect(() => {
    const calculateEMI = () => {
      const monthlyInterestRate = (interestRate / 100) / 12;
      const loanTenureMonths = loanTenure * 12;


      const calculatedEMI = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTenureMonths)) / (Math.pow(1 + monthlyInterestRate, loanTenureMonths) - 1);


      const totalPayable = calculatedEMI * loanTenureMonths;
      const totalInterest = totalPayable - loanAmount;

      setEmi(calculatedEMI.toFixed(2));
      setTotalAmount(totalPayable.toFixed(2));
      setInterestAmount(totalInterest.toFixed(2));
    };

    calculateEMI();
  }, [loanAmount, interestRate, loanTenure]);

  const progressPercentage = Math.min((emi / maxEmi) * 100, 100);

  return (
    <div className="container">
      <div className="main-content">
       
        <div className="sliders">
          {/* Loan Amount Slider */}
          <div className="input-group">
            <label>Loan Amount: ₹{loanAmount.toLocaleString()}</label>
            <input
              type="range"
              min="0"
              max="100000000"
              step="100000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
            />
            <div className="range-labels loan-amount-labels">
              <span>₹0L</span>
              <span>₹20L</span>
              <span>₹40L</span>
              <span>₹60L</span>
              <span>₹80L</span>
              <span>₹1Cr</span>
            </div>
          </div>

          {/* Interest Rate Slider */}
          <div className="input-group">
            <label>Interest Rate: {interestRate}% p.a.</label>
            <input
              type="range"
              min="1"
              max="20"
              step="0.25"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
            />
            <div className="range-labels interest-rate-labels">
              <span>1%</span>
              <span>5%</span>
              <span>10%</span>
              <span>15%</span>
              <span>20%</span>
            </div>
          </div>

          {/* Tenure Slider */}
          <div className="input-group">
            <label>Loan Tenure: {loanTenure} years</label>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={loanTenure}
              onChange={(e) => setLoanTenure(Number(e.target.value))}
            />
            <div className="range-labels tenure-labels">
              <span>1 year</span>
              <span>30 years</span>
            </div>
          </div>
        </div>

        <div className="circle-container">
          <div className="progress-circle">
            <div className="emiText">
              <p style={{fontSize:"10px",fontStyle:"bold"}}>Principal amount: <strong style={{fontSize:"20px"}}>₹{loanAmount.toLocaleString()}</strong></p>
              <p style={{fontSize:"10px",fontStyle:"bold"}}>Interest amount: <strong style={{fontSize:"20px"}}>₹{interestAmount.toLocaleString()}</strong></p>
              <p style={{fontSize:"10px",fontStyle:"bold"}}>Total amount payable: <strong style={{fontSize:"20px"}}>₹{totalAmount.toLocaleString()}</strong></p>

            </div>
            <svg width="150" height="150"> 
              <circle
                cx="75"
                cy="90"
                r="45"
                stroke="#ad1e23"
                strokeWidth="30"
                fill="none"
              />
              <circle
                cx="60"
                cy="75"
                r="45"
                stroke="#f07d20"
                strokeWidth="28"
                fill="none"
                strokeDasharray="400"
                strokeDashoffset={408 - (progressPercentage / 100) * 408}
                strokeLinecap="round"
                transform="rotate(-90 75 75)"
              />
            </svg>
          </div>


          {/* EMI Details */}
          <div className="emi-details">
            <p>Your Monthly EMI: <strong style={{fontSize:"25px"}}>₹{emi.toLocaleString()}</strong></p>
          </div>
          <div style={{marginTop:"15px"}}>
            <button style={{backgroundColor:"#f5821f",height:"35px",borderRadius:"15px",width:"200px",color:"white",border:"none"}}>APPLY FOR HOME LOAN</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;




