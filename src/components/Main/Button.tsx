import styled from "@emotion/styled";

export const Button = styled.button`
  background-color: #fff;
  border: 0 solid #e2e8f0;
  border-radius: 15px;
  box-sizing: border-box;
  color: #0d172a;
  cursor: pointer;
  display: inline-block;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1;
  padding: 0.9rem 1.6rem;
  text-align: center;
  text-decoration: none #0d172a solid;
  text-decoration-thickness: auto;
  transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0px 1px 2px rgba(166, 175, 195, 0.25);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  &:hover {
    background-color: rgb(250 204 21);
    color: #1e293b;
  }
  margin-bottom: 10px;
`;
