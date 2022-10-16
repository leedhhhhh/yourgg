import styled from "styled-components";

export const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

export const Title = styled.div`
  color: #0070f3;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: bolder;
  font-size: 2.8rem;
  text-align: center;
  margin-top: 80px;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

export const PlayerName = styled.div`
  font-size: 3.8rem;
  margin-top: 113px;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: bolder;
`;

export const SelectRank = styled.div`
  margin-top: 48px;
`;

export const SelectBox = styled.select`
  width: 150px;
  height: 35px;
  padding: 5px 30px 5px 10px;
  border-radius: 4px;
  outline: 0 none;
`;
