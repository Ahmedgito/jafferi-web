import React from 'react';
import styled from 'styled-components';
import { Mail, Facebook, Linkedin } from 'lucide-react';

const Card = () => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="top-section">
          <div className="border" />
          <div className="icons">
            <div className="logo">
              <p className='font-sans font-bold text-white'>TITLE</p>
            </div>
            <div className="social-media">
              <Mail className="icon" fill="white" />
              <Facebook className="icon" fill="white" />
              <Linkedin className="icon" fill="white" />
            </div>
          </div>
        </div>
        <div className="bottom-section">
          <span className="title">NAME</span>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    width: 230px;
    border-radius: 20px;
    background: #003505;
    padding: 5px;
    overflow: hidden;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 20px 0px;
    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .card:hover {
    transform: scale(1.05);
  }

  .card .top-section {
    height: 150px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    background: #fff;
    position: relative;
  }

  .card .top-section .border {
    border-bottom-right-radius: 10px;
    height: 30px;
    width: 130px;
    background: white;
    background: #003505;
    position: relative;
    transform: skew(-40deg);
    box-shadow: -10px -10px 0 0 #1b233d;
  }

  .card .top-section .border::before {
    content: "";
    position: absolute;
    width: 15px;
    height: 15px;
    top: 0;
    right: -15px;
    background: rgba(255, 255, 255, 0);
    border-top-left-radius: 10px;
    box-shadow: -5px -5px 0 2px #1b233d;
  }

  .card .top-section::before {
    content: "";
    position: absolute;
    top: 30px;
    left: 0;
    background: rgba(255, 255, 255, 0);
    height: 15px;
    width: 15px;
    border-top-left-radius: 15px;
    box-shadow: -5px -5px 0 2px #1b233d;
  }

  .card .top-section .icons {
    position: absolute;
    top: 0;
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;
  }

  .card .top-section .icons .logo {
    height: 100%;
    aspect-ratio: 1;
    padding: 7px 0 7px 15px;
  }

  .card .top-section .icons .social-media {
    height: 100%;
    padding: 5px 8px;
    display: flex;
    gap: 4px;
  }

  .card .top-section .icons .social-media .icon {
    height: 20px;
    width: 20px;
    color: #1b233d;
    transition: color 0.3s ease;
  }

  .card .top-section .icons .social-media .icon:hover {
    color: white;
  }

  .card .bottom-section {
    margin-top: 15px;
    padding: 10px 5px;
  }

  .card .bottom-section .title {
    display: block;
    font-size: 17px;
    font-weight: bolder;
    color: white;
    text-align: center;
    letter-spacing: 2px;
  }
`;

export default Card;
